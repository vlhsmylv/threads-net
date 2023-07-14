"use client";

import { toastConfig } from "@/toast/toast";
import axios from "axios";
import { useState } from "react";
import { BsSend } from "react-icons/bs";
import { toast } from "react-toastify";

const WriteComment = ({ threadId, authorId }: any) => {
  const [content, setContent] = useState("");

  const handleWriteComment = async (e: any) => {
    // * client side operation

    e.preventDefault();

    const comment: any = {
      content: content,
      threadId: threadId,
      authorId: authorId,
    };

    if (comment.content.length === 0 || comment.content.length > 200) {
      toast.error(
        "Content cannot be empty or more than 200 characters",
        toastConfig
      );
      return false;
    }

    const { status }: any = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/comment/create`,
      comment
    );

    if (status === 200) {
      setContent("");
      toast.success("Comment created successfully!", toastConfig);
    } else {
      toast.error("An error occured", toastConfig);
    }
  };

  return (
    <form onSubmit={handleWriteComment} className="flex mt-3">
      <textarea
        required
        name="content"
        rows={1}
        className="lg:text-base tex-sm resize-none border border-black w-full bg-white rounded-l-2xl outline-black px-2 py-2 placeholder-black"
        placeholder="Write comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="rounded-r-2xl outline-black border border-black p-3 bg-black text-white border border-black"
      >
        <BsSend />
      </button>
    </form>
  );
};

export default WriteComment;
