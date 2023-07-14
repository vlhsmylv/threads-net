import { prisma } from "@/prisma/prisma";
import { Thread as ThreadComp } from "@/components/Threads";
import { UserCard } from "./User";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const Thread = async ({ threadId }: any) => {
  const thread = await prisma.thread.findFirst({
    where: {
      id: threadId,
    },
    include: {
      author: true,
      comments: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          author: true,
        },
      },
    },
  });

  if (!thread) {
    redirect("/");
  }

  const { author }: any = thread;

  const serverSession: any = await getServerSession(authOptions);

  const thisIsCurrentUser = serverSession
    ? author.id === serverSession.user.id
    : false;

  return (
    <>
      <UserCard user={author} currentUser={thisIsCurrentUser} />

      <section className="my-12">
        <ThreadComp
          thread={thread}
          mode="single"
          currentUser={thisIsCurrentUser}
        />
      </section>
    </>
  );
};

export default Thread;
