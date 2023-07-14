import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads | An Instagram App",
  description: "Threads, an Instagram app",
};

const RootLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 lg:max-w-[628px] w-full lg:px-0 px-10 max-w-[500px] m-auto py-12`}>
        <Navbar />
        <main className="my-12">{children}</main>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}

export default RootLayout;