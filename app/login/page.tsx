"use client";

import Login from "@/components/Login";
import { SessionProvider } from "next-auth/react";

const Page = () => {
  return (
    <SessionProvider>
      <Login />
    </SessionProvider>
  );
};

export default Page;
