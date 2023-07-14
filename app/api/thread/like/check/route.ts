import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { threadId, likerId }: any = await req.json();

  const userAlreadyLiked = await prisma.like.findFirst({
    where: {
      likerId: likerId,
      threadId: threadId,
    },
  });

  if (userAlreadyLiked) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false });
};
