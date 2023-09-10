
// const { Configuration, OpenAIApi } = require("openai");
import OpenAI from "openai";
// const apiKey = process.env.REACT_APP_APIKEY;

const openai = new OpenAI({
  apiKey: apiKey,
});


export const chatWithAI = async (prompt) => {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: prompt,
    });  
    return response.data.choices[0].message.content;
  };
