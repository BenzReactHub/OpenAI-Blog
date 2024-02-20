import OpenAI from "openai";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import clientPromise from "../../lib/mongodb";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default withApiAuthRequired(async function handler(req, res) {
  const { user } = await getSession(req, res);
  const client = await clientPromise;
  const db = client.db('OpenAIBlog');
  const userProfile = await db.collection('users').findOne({
    auth0Id: user.sub,
  });

  if (!userProfile?.availableToken) {
    res.status(403);
    return;
  }
  
  const { topic, keywords } = req.body;
  if (!topic || !keywords) {
    res.status(422);
    return;
  }
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
  await db.collection("users").updateOne({
    auth0Id: user.sub,
  }, {
    $inc: {
      availableToken: -1
    }
  });
  const parsed = JSON.parse(response.choices[0]?.message.content)
  // console.log(parsed)
  const post = await db.collection('posts').insertOne({
    postContent: parsed?.postContent,
    postTitle: parsed?.title,
    metaDescription: parsed?.metaDescription,
    topic,
    keywords,
    userId: userProfile._id,
    created: new Date()
  })
  console.log(post.insertedId)
  res
    .status(200)
    // .json({ post: JSON.parse(response.choices[0]?.message.content) });
    .json({ postId: post.insertedId });
});
