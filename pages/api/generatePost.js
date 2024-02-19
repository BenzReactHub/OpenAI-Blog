import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: "Generate a blog post about dogs" }],
    model: "gpt-3.5-turbo",
    max_tokens: 3000,
  });
  console.log(response);
  res.status(200).json({ post: response });
}
