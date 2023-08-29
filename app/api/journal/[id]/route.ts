import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { Analysis } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (request: NextRequest, { params }: any) => {
  const { content } = await request.json();
  const user = await getUserByClerkId();
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  });

  const analysis = await analyze(updatedEntry.content);

  const updated = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    // @ts-ignore
    create: {
      entryId: updatedEntry.id,
      ...analysis,
    },
    // @ts-ignore
    update: analysis,
  });

  return NextResponse.json({ data: { ...updatedEntry, analysis: updated } });
};
