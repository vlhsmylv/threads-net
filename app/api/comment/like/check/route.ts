import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { commentId, likerId }: any = await req.json();

  const userAlreadyLiked = await prisma.like.findFirst({
    where: {
      likerId: likerId,
      commentId: commentId,
    },
  });

  if (userAlreadyLiked) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false });
};
