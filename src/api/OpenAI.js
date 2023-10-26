import axios from 'axios';
const { API_KEY } = require('../constants/Dummy');

const client = axios.create({
  headers: {
    Authorization: 'Bearer ' + API_KEY,
    'Content-Type': 'application/json',
  },
});

const chatGPTEndPoint = 'https://api.openai.com/v1/chat/completions';
const dalleEndPoint = 'https://api.openai.com/v1/images/generations';

export const apiCall = async (prompt, messages) => {
  try {
    const res = await client.post(chatGPTEndPoint, {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Does this message want to generate an AI picture, image, art, or anything similar? ${prompt}. Simply answer with a yes or no.`,
        },
      ],
    });

    let isArt = res.data?.choices[0]?.message?.content;
    if (isArt && isArt.toLowerCase().includes('yes')) {
      console.log('dalle api call');
      return await dalleApiCall(prompt, messages || []);
    } else {
      console.log('chatgpt api call');
      return await chatgptApiCall(messages || []);
    }
  } catch (err) {
    console.error(err);
    return { success: false, msg: err.message };
  }
};

const chatgptApiCall = async (messages) => {
  console.log('Function Called');
  const res = await client.post(chatGPTEndPoint, {
    model: 'gpt-3.5-turbo',
    messages,
  });
  let answer = res.data?.choices[0]?.message?.content;
  console.log('got chat response', answer);
  messages.push({ role: 'assistant', content: answer.trim() });
  return { success: true, data: messages };
};

const dalleApiCall = async (prompt, messages) => {
  console.log('Dalle API');
  try {
    const res = await client.post(dalleEndPoint, {
      prompt,
      n: 1,
      size: '512x512',
    });
    let url = res?.data?.data[0]?.url;
    console.log('Got url', url);
    messages.push({ role: 'assistant', content: url });
    return { success: true, data: messages };
  } catch (err) {
    console.error('error', err);
    return { success: false, msg: err.message };
  }
};
