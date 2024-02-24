import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { NextHead } from "@/components/common/next-head";
import { TopTemplate } from "@/features/top";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <NextHead title="My US Stock Portfolio | Admin" />
      <TopTemplate />
    </>
  );
}
