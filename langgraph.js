import { createAgent, tool } from "langchain";
import { ChatOpenAI } from "@langchain/openai";

import { z } from "zod";

const search = tool(
  async ({ query }) => {
    if (
      query.toLowerCase().includes("sf") ||
      query.toLowerCase().includes("san francisco")
    ) {
      return "It's 60 degrees and foggy.";
    }
    return "It's 90 degrees and sunny.";
  },
  {
    name: "search",
    description: "Call to surf the web.",
    schema: z.object({
      query: z.string().describe("The query to use in your search."),
    }),
  }
);

const model = new ChatOpenAI({
  model: "gpt-4.1-mini",
  apiKey: process.env.OPENAI_API_KEY,
}); 

const agent = createAgent({
  llm: model,
  tools: [search],
});

const result = await agent.invoke({
  messages: [
    {
      role: "user",
      content: "what is the weather in sf",
    },
  ],
});

console.log(result);