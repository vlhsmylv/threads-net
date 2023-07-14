import { authOptions } from "@/lib/auth";
import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { threadId, authorId } = await req.json();

  const serverSession: any = await getServerSession(authOptions);

  if(!serverSession) {
    return false
  } else if(serverSession.user.id !== authorId) {
    return false;
  }

  const removeThread = await prisma.thread.delete({
    where: {
      id: threadId,
    },
  });

  if (!removeThread) {
    return false;
  }

  return NextResponse.json({ success: true });
};
