// Invoke
import { HumanMessage } from "@langchain/core/messages";
import {agent } from "./agent.js";

import dotenv from "dotenv";
dotenv.config();


const result = await agent.invoke({
  messages: [new HumanMessage("Add 3 and 4.")],
});

for (const message of result.messages) {
  console.log(`[${message.type}]: ${message.text}`);
}