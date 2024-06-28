require('dotenv').config();

const express = require('express');
const cors = require('cors'); 
const { OpenAI } = require('openai');

const app = express();
const port = 3001;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors()); 

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
    const { articleText } = req.body;
    const response = await getArticleReview(articleText);
    res.json({ response });
  } catch (error) {
    console.error('Error:', error);
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