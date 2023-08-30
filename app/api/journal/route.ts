// import { update } from "@/utils/actions";
import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = true;

export const POST = async (request: NextRequest) => {
  const tag = request.nextUrl.searchParams.get("tag");
  const user = await getUserByClerkId();

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: "Write about your day!",
    },
  });

  const analysis = await analyze(entry.content);
  await prisma.analysis.create({
    data: {
      entryId: entry.id,
      userId: user.id,
      mood: analysis?.mood as string,
      subject: analysis?.subject as string,
      negative: analysis?.negative as boolean,
      summary: analysis?.summary as string,
      color: analysis?.color as string,
      sentimentScore: analysis?.sentimentScore as number,
    },
  });

  revalidateTag(tag as string);
  revalidatePath("/journal");

  return NextResponse.json({ revalidated: true, data: entry });
};
