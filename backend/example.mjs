import 'dotenv/config';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const response = await openai.responses.create({
    model: "gpt-4.1",
    input: "Write a one-sentence bedtime story about a unicorn."
});

console.log(response.output_text);