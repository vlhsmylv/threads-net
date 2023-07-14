"use client";

import { toastConfig } from "@/toast/toast";
import { toast } from "react-toastify";

const CopyUserCard = ({username}: any) => {
    return (
        <button
          className="hover:scale-110 ease-in-out duration-200 bg-gray-200 rounded-full lg:p-3 px-3 py-2 lg:text-base text-sm"
          onClick={() => {
            navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_DOMAIN}/${username}`
            );
            toast.success("Account link copied to clipboard!", toastConfig);
          }}
        >
          @{username}
        </button>
    )
}

export default CopyUserCard;