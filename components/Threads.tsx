"use client";

import { FaRegComment } from "react-icons/fa";
import { BsBoxArrowUpRight, BsShare, BsTrash } from "react-icons/bs";
import Comments from "./Comments";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { SessionProvider, useSession } from "next-auth/react";
import RemoveThread from "./thread/RemoveThread";
import { months } from "@/data/months";
import LikeThread from "./thread/LikeThread";
import { toastConfig } from "@/toast/toast";

export const Thread = ({ thread, currentUserId, mode }: any) => {
  const [showComments, setShowComments] = useState(false);

  const currentUser = thread.author.id === currentUserId ? true : false;

  const toggleShowComments = () => {
    setShowComments(showComments ? false : true);
  };

  const threadCreatedAt = new Date(thread.createdAt);
  const threadCreatedAtString = `${threadCreatedAt.getDate()} ${
    months[threadCreatedAt.getMonth()]
  } ${threadCreatedAt.getFullYear()} ${threadCreatedAt
    .getHours()
    .toString()
    .padStart(2, "0")}:${threadCreatedAt
    .getMinutes()
    .toString()
    .padEnd(2, "0")}`;

  const { author } = thread;
  return (
    <SessionProvider>
      <div className="bg-white p-5 rounded-2xl">
        <div className="flex justify-between items-center lg:flex-nowrap flex-wrap">
          <div className="flex flex-row gap-5 items-center">
            <Link href={`/${author.username}`}>
              <img src={author.picture} className="w-16 h-16 rounded-full" />
            </Link>
            <div className="flex flex-col gap-1">
              <div className={`lg:text-lg text-sm cursor-default`}>
                {author.name} {author.surname}
              </div>
              <Link
                title={currentUser ? "Your account" : ""}
                href={`/${author.username}`}
                className={`text-gray-500 text-sm ${
                  currentUser
                    ? "text-center bg-gray-200 p-3 py-1 rounded-full"
                    : ""
                }`}
              >
                @{author.username}
              </Link>
            </div>
          </div>
          <div className="lg:text-lg lg:text-black lg:mt-0 text-sm text-gray-500 mt-3">
            {threadCreatedAtString}
          </div>
        </div>
        <div className="lg:px-[calc(64px+1.25rem)] lg:mt-2 mt-3">
          {thread.content}
        </div>
        <div className="mt-3 text-base text-gray-500">
          {thread.likes ? thread.likes.length : 0}{" "}
          {thread.likes ? (
            thread.likes.length > 1 ? (
              <>likes</>
            ) : (
              <>like</>
            )
          ) : (
            <>like</>
          )}{" "}
          / {thread.comments.length}{" "}
          {thread.comments.length > 1 ? <>comments</> : <>comment</>}
        </div>
        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-4">
            {currentUserId ? (
              <LikeThread threadId={thread.id} likerId={currentUserId} />
            ) : (
              <></>
            )}
            <button
              className="cursor-pointer text-lg"
              onClick={toggleShowComments}
            >
              <FaRegComment />
            </button>
            <button
              className="cursor-pointer text-lg"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${process.env.NEXT_PUBLIC_DOMAIN}/${author.username}/${thread.id}`
                );
                toast.success("Thread link copied to clipboard!", toastConfig);
              }}
            >
              <BsShare />
            </button>
            {mode === "single" ? (
              <></>
            ) : (
              <Link
                target="_blank"
                href={`${process.env.NEXT_PUBLIC_DOMAIN}/${author.username}/${thread.id}`}
                className="text-lg"
              >
                <BsBoxArrowUpRight />
              </Link>
            )}
          </div>
          {currentUser ? (
            <RemoveThread threadId={thread.id} authorId={author.id} />
          ) : (
            <></>
          )}
        </div>
        <Comments
          comments={thread.comments}
          show={showComments}
          threadId={thread.id}
        />
      </div>
    </SessionProvider>
  );
};

const Threads = ({ threads, currentUserId }: any) => {
  return (
    <SessionProvider>
      <section
        className=" flex flex-col gap-10 overflow-auto" /* max-h-[calc(100vh-255px)] */
      >
        {threads.length !== 0 ? (
          <>
            {threads.map((thread: any, i: any) => (
              <Thread key={i} thread={thread} currentUserId={currentUserId} />
            ))}
          </>
        ) : (
          <div className="text-xl text-center">
            There are no threads.{" "}
            <Link href={"/create"} className="underline">
              Create now!
            </Link>
          </div>
        )}
      </section>
    </SessionProvider>
  );
};

export default Threads;
