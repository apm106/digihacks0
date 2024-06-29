require('dotenv').config();

const express = require('express');
const fs = require('fs');
const cors = require('cors'); 
const { OpenAI } = require('openai');
const bodyParser = require('body-parser');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3001;

const fileString = fs.readFileSync("database.json", "utf-8");
const data = JSON.parse(fileString);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors()); 
app.use(bodyParser.json());

// Scrapping function
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

// Generate article review
const getArticleReview = async (articleText) => {
  try {
    const prompt = "You are an article reviewer that determines whether the following health-related article is a valid source. This has to be a very strict marking system.\n" +
                    "Here are your 4 tasks:\n" + 
                    "(1) Rate the content accuracy out of 10 with 2 sentences explaining why. This judges the content of the article based on scientific concensus and methods. For example, 10/10 means that it is the most scientific article.\n" + 
                    "(2) Rate the author credibility quality out of 10 with 2 sentences explaining why. This judges if the author has qualifications in the field that the article is in. For example, 10/10 means that the author is highly qualified in that specific field and have completed numerous research papers about the topic.\n" + 
                    "(3) Rate the bias of the article out of 10 with 2 sentences explaining why. This judges if the organisation and author could be bias, including if they were sponsored by an external company to promote a product. For example, 10/10 means that means that the author/organisation is not biased at all.\n" + 
                    "(4) Find the year that is was published.\n" +
                    "Now, you must form in a very specific. Here is an example, which x is the rating you will give the resective category, y is the 2 sentence explanation and z is the year that it was published:\n" +
                    "Content Accuracy: x. y.\n" +
                    "Author Credibility: x. y.\n" +
                    "Bias: x. y.\n" +
                    "Year: z.\n" +
                    "Here is the content of the article:";
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

// Function to extract the score and explanation
function extractInfo(pattern, text) {
  if (pattern == "Year") {
    const regex = new RegExp(`${pattern}: (\\d{4})`);
    const match = regex.exec(text);
    if (match) {
        return parseInt(match[1], 10);
    }
  } else {
    const regex = new RegExp(`${pattern}: (\\d+). (.*?)\\n`, 's');
    const match = regex.exec(text);
    if (match) {
        return {
            score: parseInt(match[1], 10),
            explanation: match[2].trim()
        };
    }
  }
  return null;
}

// Preprocessing for the data
function processData(response, articleUrl) {

  // Valid URL
  url = null
  if (isURL(articleUrl)) {
    url = articleUrl
  }

  // Extract information
  const contentAccuracy = extractInfo("Content Accuracy", response);
  const authorCredibility = extractInfo("Author Credibility", response);
  const bias = extractInfo("Bias", response);
  const year = extractInfo("Year", response);

  // Calculate geometric mean
  const geometricMean = (contentAccuracy.score * authorCredibility.score * bias.score) ** (1/3)

  // Calculate reliability of time formula (using the law of 9s)
  const yearDiff = new Date().getFullYear() - year;
  const timeReliability = Math.sqrt(0.5 + 0.5 * Math.exp(-yearDiff / 9))

  // Calculate reliabilityScore score
  const reliabilityScore = geometricMean * timeReliability

  // Combine results
  const combinedResult = {
    "author": null,
    "url": url,
    "summary": null,
    "organization": null,
    "date": null,
    "scores": {
      "reliabilityScore": reliabilityScore,
      contentAccuracy,
      authorCredibility,
      bias,
      year
    }
  };

  return combinedResult;
}

function isURL(str) {
  // Regular expression to match a URL pattern
  const urlRegex = /^(?:https?|ftp):\/\/(?:www\.)?[^\s/$.?#].[^\s]*$/i;

  try {
      // Use the URL object to parse and validate the string as a URL
      new URL(str);
      // If no error is thrown and it matches the regex, return true
      return urlRegex.test(str);
  } catch (error) {
      // If the URL parsing throws an error, return false
      return false;
  }
}

// Review the article
app.post('/article-review', async (req, res) => {

  try {
    let articleText = "";
    let result = null;
    const { articleUrl } = req.body;

    // Check cache
    let foundInCache = false;
    for (const entry of data) {
      if (entry.url === articleUrl) {
        console.log("Found in cache:");
        res.json(entry);
        foundInCache = true;
        break;
      }
    }

    // If not found in cache
    if (!foundInCache) {
      // If URL, then scrape
      if (isURL(articleUrl)) {
        console.log("Scrapping:")
        articleText = await fetchArticleText(articleUrl);
      } else {
        console.log("Not scrapping:")
        articleText = articleUrl;
      }

      // Get review
      const response = await getArticleReview(articleText);

      // Process the data
      result = processData(response, articleUrl);

      // Add to database
      data.push(result);
      fs.writeFileSync("database.json", JSON.stringify(data, null, 2));

      res.json({ result });
    }
    
  } catch (error) {
    console.error('CHATGPT Error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

// app.post('/checkarticle', (req, res) => {
//   const url = req.body.url.toString();

//   let output = "nothing";
//   for (const entry of data) {
//     if (entry.url === url) {
//       output = entry;
//     }
//   }

//   res.json(output);
// });

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