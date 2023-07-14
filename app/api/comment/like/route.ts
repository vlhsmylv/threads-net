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
      commentId: commentId,
    },
  });

  if (!createLike) {
    return NextResponse.json({ success: false });
  }

  return NextResponse.json({ success: true });
};
