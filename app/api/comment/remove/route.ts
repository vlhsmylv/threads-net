import { authOptions } from "@/lib/auth";
import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { commentId, authorId } = await req.json();

  const serverSession: any = await getServerSession(authOptions);

  if (!serverSession) {
    return false;
  } else if (serverSession.user.id !== authorId) {
    return false;
  }

  const removeComment = await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  if (!removeComment) {
    return false;
  }

  return NextResponse.json({ success: true });
};
