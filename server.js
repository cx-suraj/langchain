import * as z from "zod";
import dotenv from "dotenv";
dotenv.config();
// npm install @langchain/anthropic to call the model
import { createAgent, tool } from "langchain";

const getWeather = tool(
  ({ city }) => `It's always sunny in ${city}!`,
  {
    name: "get_weather",
    description: "Get the weather for a given city",
    schema: z.object({
      city: z.string(),
    }),
  },
);

const agent = createAgent({
  model: "gpt-4.1-mini",
  tools: [getWeather],
  apiKey: process.env.OPENAI_API_KEY,
});

console.log(
  await agent.invoke({
    messages: [{ role: "user", content: "What's the weather in Tokyo?" }],
  })
);