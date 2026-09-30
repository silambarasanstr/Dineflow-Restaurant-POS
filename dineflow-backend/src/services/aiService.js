import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const askAI = async (message) => {
  const response = await openai.responses.create({
    model: "gpt-5-mini",
    input: message,
  });

  return response.output_text;
};
