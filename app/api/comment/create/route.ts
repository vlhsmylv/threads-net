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

  
  const createdComment = await prisma.comment.findFirst({
    where: {
      id: createComment.id,
    },
  });

  return NextResponse.json({ success: true });
};
