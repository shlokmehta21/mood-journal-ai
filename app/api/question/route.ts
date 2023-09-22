import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { CallbackManager } from "langchain/callbacks";
import { loadQARefineChain } from "langchain/chains";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";

import {
  StructuredOutputParser,
  OutputFixingParser,
} from "langchain/output_parsers";
import { Document } from "langchain/document";
import { z } from "zod";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { question } = await request.json();
  const user = await getUserByClerkId();
  const streaming = request.headers.get("accept") === "text/event-stream";

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  });

  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  const docs = entries.map(
    (entry: any) =>
      new Document({
        pageContent: entry.content,
        metadata: { source: entry.id, date: entry.createdAt },
      })
  );
  const model = new ChatOpenAI({
    streaming: true,
    temperature: 0,
    modelName: "gpt-3.5-turbo",
    callbackManager: CallbackManager.fromHandlers({
      handleLLMNewToken: async (token: string) => {
        console.log(token, "route token");

        await writer.ready;
        await writer.write(encoder.encode(`${token}`));
      },
      handleLLMEnd: async () => {
        await writer.ready;
        await writer.close();
      },
      handleLLMError: async (e: Error) => {
        await writer.ready;
        await writer.abort(e);
      },
    }),
  });
  const chain = loadQARefineChain(model);
  const embeddings = new OpenAIEmbeddings();
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
  const relevantDocs = await store.similaritySearch(question);

  chain
    .call({ input_documents: relevantDocs, question })
    .catch((e) => console.log(e));

  return new NextResponse(stream.readable, {
    headers: { "Content-Type": "text/event-stream" },
  });
};
