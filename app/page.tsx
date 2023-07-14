import Threads from "@/components/Threads";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";

const Page = async () => {
  const threads = await prisma.thread.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
      comments: {
        orderBy: {
          createdAt: "desc"
        },
        include: {
          author: true
        }
      }
    },
  });

  const serverSession: any = await getServerSession(authOptions);

  return (
    <>
      <Threads threads={threads} currentUserId={serverSession ? serverSession.user.id : ""} />
    </>
  );
};

export default Page;
