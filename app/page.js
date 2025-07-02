'use client'
import Example from "./home/page";
import Head from "next/head";
import Header from "./components/Header";
import { Footer } from "./components/Footer";
import { Sigmar } from 'next/font/google'
const sigmar = Sigmar({ subsets: ['latin'], weight: ['400'] })
export default function Home() {
  return (
    <>
      <Head>
        <title>Sportwave</title>
        <meta name="description" content="Sportwave is a platform for sports enthusiasts to connect and share their passion for sports." />
      </Head>
    <div className={`flex flex-col ${sigmar.className}`}>
    <Example />
    </div></>
    
    
  );
}
