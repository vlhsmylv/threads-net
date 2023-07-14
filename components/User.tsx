import { prisma } from "@/prisma/prisma";
import Threads from "./Threads";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import SignOut from "./SignOut";
import { FiLink } from "react-icons/fi";
import { toast } from "react-toastify";
import { toastConfig } from "@/toast/toast";
import CopyUserCard from "./CopyUserCard";

export const UserCard = ({ user, currentUser }: any) => (
  <div className="flex lg:gap-0 gap-5 lg:justify-around items-center lg:flex-nowrap flex-wrap justify-center">
    <img
      src={user.picture}
      className="rounded-full lg:w-52 lg:h-52 w-48 h-48"
    />
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="text-xl cursor-default">
          {user.name} {user.surname}
        </div>
        <CopyUserCard username={user.username} />
      </div>
      <div className="max-w-[300px] font-light">
        {user.bio.length === 0 ? (
          <>{user.name} does not like to tell us about himself 😥</>
        ) : (
          user.bio
        )}
      </div>
      <div className="flex gap-5 items-center lg:justify-start justify-center">
        {currentUser ? (
          <>
            <Link
              href={`/editProfile`}
              className="text-sm p-3 border border-black ease-in-out duration-200 hover:scale-110 rounded-2xl"
            >
              Edit profile
            </Link>
            <SignOut />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  </div>
);

const User = async ({ username }: any) => {
  const user: any = await prisma.user.findUnique({
    where: {
      username: username,
    },
    include: {
      threads: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          likes: {
            include: {
              liker: true,
            },
          },
          author: true,
          comments: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              author: true,
              likes: true,
            },
          },
        },
      },
    },
  });

  const serverSession: any = await getServerSession(authOptions);

  const thisIsCurrentUser = serverSession
    ? (user ? user.id : null) === serverSession.user.id
    : false;

  if (!user) {
    redirect("/");
  }

  const { threads } = user;

  return (
    <>
      <UserCard user={user} currentUser={thisIsCurrentUser} />

      <section className="my-12">
        <Threads
          threads={threads}
          currentUserId={serverSession ? serverSession.user.id : false}
        />
      </section>
    </>
  );
};

export default User;
