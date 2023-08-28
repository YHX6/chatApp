
const { Configuration, OpenAIApi } = require("openai");
const apiKey = process.env.REACT_APP_APIKEY;

const configuration = new Configuration({
  apiKey: apiKey,
});
const chatgpt = new OpenAIApi(configuration);


export const chatWithAI = async (prompt) => {
    const response = await chatgpt.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: prompt,
    });  
    return response.data.choices[0].message.content;
  };
