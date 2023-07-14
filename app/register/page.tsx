"use client";

import Register from "@/components/Register";
import { SessionProvider } from "next-auth/react";

const Page = () => {
  return (
    <SessionProvider>
      <Register />
    </SessionProvider>
  );
};

export default Page;
