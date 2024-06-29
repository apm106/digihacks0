require('dotenv').config();

const express = require('express');
const cors = require('cors'); 
const { OpenAI } = require('openai');
const bodyParser = require('body-parser');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3001;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors()); 
app.use(bodyParser.json());

async function fetchArticleText(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;

    // Load the HTML into cheerio
    const $ = cheerio.load(html);

    // Function to recursively extract text from specific tags
    function extractTextFromTags(node) {
      let text = '';

      // Traverse through each child node
      node.contents().each((index, child) => {
        // If it's a text node, extract its text
        if (child.type === 'text') {
          text += $(child).text().trim() + ' ';
        } else if (child.type === 'tag') {
          // If it's a specific tag, handle accordingly
          const tagName = child.name.toLowerCase();
          switch (tagName) {
            case 'p':
            case 'h1':
            case 'h2':
            case 'h3':
            case 'h4':
            case 'h5':
            case 'h6':
            case 'a':
            case 'ul':
            case 'ol':
            case 'li':
            case 'div':
            case 'span':
            case 'section':
            case 'header':
            case 'footer':
              text += extractTextFromTags($(child));
              break;
            // Add more cases as needed for other tags
            default:
              // Ignore other tags
              break;
          }
        }
      });

      return text;
    }

    // Extract text from specific tags within the body
    const articleText = extractTextFromTags($('body'));

    return articleText.trim(); // Trim whitespace from start and end
  } catch (error) {
    console.error('Error fetching article:', error);
    throw new Error('An error occurred while fetching the article.');
  }
}

const getArticleReview = async (articleText) => {
  try {
    const prompt = "You are an article reviewer that determines whether the following health-related article is a valid source. You need to do the following (1) Assess the quality of the author, e.g. are they a medical professional in the relevant article field. (2) Assess the quality of the organisation e.g. is it a reputable medical organisation that is publishing the article. (3) Assess the currency/recency of the article. (4) Assess whether there is any financial bias in the article e.g. they are sponsored or looking to sell their own product. (5) Assess how well supported the article is e.g. are there references and is it appropriately cited. (6) Assess the scientific validity of the article. (7) Give a final grading of the article on a scale from A - F.";
    const openaiModel = "gpt-3.5-turbo-0125";

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "user", content: prompt + articleText },
      ],
      model: openaiModel,
    });

    const response = completion.choices[0].message.content;
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('An error occurred while processing the OpenAI request.');
  }
};

app.post('/article-review', async (req, res) => {
  try {
    console.log(req.body)
    const { articleUrl } = req.body;
    const articleText = await fetchArticleText(articleUrl);
    const response = await getArticleReview(articleText);
    res.json({ response });
  } catch (error) {
    console.error('CHATGPT Error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// async function testGetArticleReview() {
//   try {
//     const articleText = "";
//     const response = await getArticleReview(articleText);
//     console.log('Article review response:', response); // Log the final response
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// testGetArticleReview();

// const articleUrl = "https://www.healthline.com/health/staying-healthy";
// fetchArticleText(articleUrl)
//   .then(articleText => {
//     console.log('Fetched article text:', articleText);
//   })
//   .catch(error => console.error('Error:', error));