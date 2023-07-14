import { toastConfig } from "@/toast/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-toastify";

const LikeComment = ({ commentId, likerId }: any) => {
  const [likedByUser, setLikedByUser] = useState(false);

  useEffect(() => {
    const checkIfAlreadyLiked = async () => {
      const { data: res } = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/comment/like/check`,
        {
          commentId: commentId,
          likerId: likerId,
        }
      );

      if (res.success) {
        setLikedByUser(true);
      }
    };

    checkIfAlreadyLiked();
  }, [commentId, likerId]);

  const handleLikeComment = async () => {
    const { data: res } = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/comment/like`,
      {
        commentId: commentId,
        likerId: likerId,
      }
    );

    if (!res.success) {
      toast.error("An error occured", toastConfig);
    } else {
      // find more useful way to refresh data
      return typeof window !== "undefined" ? window.location.reload() : null;
    }
  };

  return (
    <button
      className={`cursor-pointer text-xl ${likedByUser ? "text-red-500" : ""}`}
      onClick={handleLikeComment}
    >
    {likedByUser ? <AiFillHeart /> : <AiOutlineHeart />}
    </button>
  );
};

export default LikeComment;
