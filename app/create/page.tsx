import { authOptions } from "@/lib/auth";
import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const createThread = async (data: FormData) => {
  "use server";

  const thread: any = {
    content: data.get("content"),
    authorId: data.get("authorId"),
  };

  if (thread.content.length === 0 || thread.content.length > 500) {
    return false;
  }

  const createThread = await prisma.thread.create({
    data: {
      content: thread.content,
      authorId: thread.authorId,
    },
  });

  const updateUser = await prisma.user.update({
    where: {
      id: thread.authorId,
    },
    data: {
      threads: {
        connect: {
          id: createThread.id,
        },
      },
    },
  });

  if (updateUser) {
    redirect("/");
  }
};

const Page = async () => {
  const serverSession: any = await getServerSession(authOptions);
  const user = serverSession
    ? await prisma.user.findFirst({
        where: {
          id: serverSession.user.id,
        },
      })
    : null;

  if (user) {
    return (
      <form action={createThread} className="flex flex-col gap-10">
        <div className="text-2xl font-semibold">New Thread</div>
        <div>
          <textarea
            required
            className="w-full placeholder-black outline-black border border-black rounded-lg p-3 resize-none"
            placeholder="Create and share your new thread with community!"
            rows={11}
            name="content"
            id="content"
          ></textarea>
          <input
            type="text"
            name="authorId"
            defaultValue={user.id}
            className="hidden"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="border border-black ease-in-out duration-200 hover:bg-black hover:text-white p-3 rounded-lg"
          >
            Create
          </button>
        </div>
      </form>
    );
  } else {
    redirect("/login");
  }
};

export default Page;
