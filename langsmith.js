import { traceable } from 'langsmith/traceable';
import { wrapOpenAI } from 'langsmith/wrappers';
import { OpenAI } from 'openai';
import dotenv from "dotenv";
dotenv.config()

const client = wrapOpenAI(new OpenAI());

const tool = traceable(
  (question) => {
    return "During this morning's meeting, we solved all world conflict.";
  },
  { run_type: 'tool', name: 'Retrieve Context' }
);

const chatPipeline = traceable(
  async (question) => {
    const context = await tool(question);
    const messages = [
      {
        role: 'system',
        content:
          "You are a helpful assistant. Please respond to the user's request only based on the given context.",
      },
      {
        role: 'user',
        content: `Question: ${question}\nContext: ${context}`,
      },
    ];
    const chatCompletion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
    });
    return chatCompletion.choices[0].message.content;
  },
  { name: 'Chat Pipeline' }
);

await chatPipeline("Can you summarize this morning's meetings?");