import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  const { topic, keywords } = req.body;
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a blog post generator.",
      },
      {
        role: "user",
        content: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}.
        The content should be formatted in SEO-friendly HTML.
        The response must also include appropriate HTML title and meta description content.
        The return format must be stringified JSON in the following format:
        {
          "postContent": post content here
          "title": title goes here
          "metaDescription": meta description goes here
        }`,
      },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 3000,
    temperature: 0,
  });
  // console.log(response.choices[0]?.message.content);
  res
    .status(200)
    .json({ post: JSON.parse(response.choices[0]?.message.content) });
}
