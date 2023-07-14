import { authOptions } from "@/lib/auth";
import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { Router } from "next/router";
import { FiRefreshCcw, FiUser } from "react-icons/fi";

const Navbar = async () => {
  const serverSession: any = await getServerSession(authOptions);
  const user = serverSession
    ? await prisma.user.findFirst({
        where: {
          id: serverSession.user.id,
        },
      })
    : null;

  const UserIsAuthenticated = () => {
    if (user) {
      return (
        <div className="text-gray-600 flex gap-5 items-center">
          <Link href={`/${user.username}`}>@{user.username}</Link>
          <Link href="/create">New Thread</Link>
        </div>
      );
    }
  };

  const UserIsNotAuthenticated = () => {
    return (
      <Link href="/login" className="text-2xl">
        <FiUser />
      </Link>
    );
  };

  return (
    <nav className="flex flex-row items-center justify-between">
      <Link href="/">
        <Image src="/logo.svg" width={40} height={90} alt="Threads" />
      </Link>
      <div className="flex flex-row gap-5 items-center">
        {user ? <UserIsAuthenticated /> : <UserIsNotAuthenticated />}
        <Link href={"."} className="text-2xl">
          <FiRefreshCcw />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
