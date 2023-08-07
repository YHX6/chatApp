
const { Configuration, OpenAIApi } = require("openai");
const apiKey = "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";

const configuration = new Configuration({
  apiKey: apiKey,
});
const chatgpt = new OpenAIApi(configuration);


export const chatWithAI = async (prompt) => {
    console.log(prompt);
    const response = await chatgpt.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: prompt,
    });

    console.log(response.data.choices[0].message.content);
  
    return response.data.choices[0].message.content;
  };