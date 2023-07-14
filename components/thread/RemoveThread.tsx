import { toastConfig } from "@/toast/toast";
import axios from "axios";
import { redirect } from "next/navigation";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";

const RemoveThread = ({ threadId, authorId }: any) => {
  const handleRemoveThread = async () => {
    const confirmRemove = window ? window.confirm("Do you want to remove this thread?") : null;

    if(!confirmRemove) {
      return false;
    }

    const {data: res} = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}/api/thread/remove`, {
        threadId: threadId,
        authorId: authorId
    });

    if(res.success) {
      toast.success("Thread removed successfully!", toastConfig); 
    }
  };

  return (
    <button className="flex cursor-pointer text-lg" onClick={handleRemoveThread}>
      <BsTrash />
    </button>
  );
};

export default RemoveThread;
