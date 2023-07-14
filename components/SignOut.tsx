"use client";

import { signOut } from "next-auth/react";

const SignOut = () => {
    const handleSignOut = async () => {
        const res = await signOut();
    }

    return (
        <button onClick={handleSignOut} className="text-sm p-3 border bg-black text-white border-black ease-in-out duration-200 hover:scale-110 rounded-2xl">
            Sign out
        </button>
    )
}

export default SignOut;