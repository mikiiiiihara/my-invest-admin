import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { NextHead } from "@/components/common/next-head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <NextHead title="My US Stock Portfolio | Admin" />
      <h2>Admin</h2>
    </>
  );
}
