import { toastConfig } from "@/toast/toast";
import axios from "axios";
import { redirect } from "next/navigation";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";

const RemoveComment = ({ commentId, authorId }: any) => {
  const handleRemoveComment = async () => {
    const confirmRemove = window ? window.confirm("Do you want to remove this comment?") : null;

    if(!confirmRemove) {
      return false;
    }
   
    const { data: res } = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/comment/remove`,
      {
        commentId: commentId,
        authorId: authorId
      }
    );

    if (res.success) {
      toast.success("Comment removed successfully!", toastConfig);
    }
  };

  return (
    <button className="cursor-pointer text-lg" onClick={handleRemoveComment}>
      <BsTrash />
    </button>
  );
};

export default RemoveComment;
