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
    // remove like

    const removeLike = await prisma.like.delete({
      where: {
        id: userAlreadyLiked.id,
      },
    });

    return NextResponse.json({ success: true });
  }

  const createLike = await prisma.like.create({
    data: {
      likerId: likerId,
      threadId: threadId,
    },
  });

  if (!createLike) {
    return NextResponse.json({ success: false });
  }

  return NextResponse.json({ success: true });
};
