import { prisma } from "@/prisma/prisma";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const comment = await req.json();

  const createComment = await prisma.comment.create({
    data: comment,
  });

  if (!createComment) {
    return false;
  }

  const updateThread = await prisma.thread.update({
    where: {
      id: comment.threadId,
    },
    data: {
      comments: {
        connect: {
          id: createComment.id,
        },
      },
    },
  });

  if (!updateThread) {
    return false;
  }

  const updateUser = await prisma.user.update({
    where: {
      id: comment.authorId,
    },
    data: {
      comments: {
        connect: {
          id: createComment.id,
        },
      },
    },
  });
  
  const createdComment = await prisma.comment.findFirst({
    where: {
      id: createComment.id,
    },
  });

  return NextResponse.json({ success: true });
};
