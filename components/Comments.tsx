import { useSession } from "next-auth/react";
import WriteComment from "./comment/WriteComment";
import Link from "next/link";
import { months } from "@/data/months";
import RemoveComment from "./comment/RemoveComment";
import LikeComment from "./comment/LikeComment";

const Comment = ({ comment, threadId, currentUserId }: any) => {
  const { author } = comment;

  const commentCreatedAt = new Date(comment.createdAt);
  const commentCreatedAtString = `${commentCreatedAt.getDate()} ${
    months[commentCreatedAt.getMonth()]
  } ${commentCreatedAt.getFullYear()} ${commentCreatedAt
    .getHours()
    .toString()
    .padStart(2, "0")}:${commentCreatedAt
    .getMinutes()
    .toString()
    .padEnd(2, "0")}`;

  const currentUser = author ? author.id === currentUserId : false;

  return (
    <div className="bg-white p-5 rounded-2xl">
      <div className="flex justify-between items-center lg:flex-nowrap flex-wrap">
        <div className="flex flex-row gap-5 items-center">
          <Link href={`/${author.username}`}>
            <img src={author.picture} className="w-10 h-10 rounded-full" />
          </Link>
          <div className="flex flex-col gap-1/2">
            <div className="text-base cursor-default">
              {author.name} {author.surname}
            </div>
            <Link
              href={`/${author.username}`}
              className="text-gray-500 text-[14px]"
            >
              @{author.username}
            </Link>
          </div>
        </div>
        <div className="lg:text-sm lg:black lg:mt-0 text-[15px] text-gray-500 mt-3">
          {commentCreatedAtString}
        </div>
      </div>
      <div className="lg:px-[calc(40px+1.25rem)] lg:mt-2 mt-3 lg:text-base text-sm">
        {comment.content}
      </div>
      <div className="lg:mt-2 mt-3 lg:text-sm text-[15px] text-gray-500 lg:pl-[calc(40px+1.25rem)]">
        {comment.likes ? comment.likes.length : 0}{" "}
        {comment.likes ? (
          comment.likes.length > 1 ? (
            <>likes</>
          ) : (
            <>like</>
          )
        ) : (
          <>like</>
        )}
      </div>
      <div className="flex justify-between items-center lg:px-[calc(40px+1.25rem)] lg:mt-2 mt-3">
        <div>
          {currentUserId ? (
            <LikeComment commentId={comment.id} likerId={currentUserId} />
          ) : (
            <></>
          )}
        </div>

        {currentUser ? (
          <RemoveComment commentId={comment.id} authorId={author.id} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const Comments = ({ threadId, comments, show }: any) => {
  const { data: clientSession }: any = useSession();

  return (
    <div
      className={`${
        show ? "block" : "hidden"
      } mt-3 rounded-2xl bg-gray-100 p-5`}
    >
      <div className="text-lg">Comments</div>
      {comments.length !== 0 ? (
        <div className="max-h-[400px] overflow-auto flex flex-col gap-3 mt-3">
          {comments.map((comment: any, i: any) => (
            <Comment
              key={i}
              comment={comment}
              threadId={threadId}
              currentUserId={clientSession ? clientSession.user.id : false}
            />
          ))}
        </div>
      ) : (
        <div className="mt-3">
          There are no comments.{" "}
          <Link href="/create" className="hover:underline cursor-pointer">
            Be the first!
          </Link>
        </div>
      )}
      {clientSession ? (
        <WriteComment threadId={threadId} authorId={clientSession.user.id} />
      ) : (
        <div className="mt-3">
          <Link href="/login" className="underline">
            Login
          </Link>{" "}
          to write comment
        </div>
      )}
    </div>
  );
};

export default Comments;
