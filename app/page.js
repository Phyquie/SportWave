'use client'
import Example from "./home/page";
import Head from "next/head";


export default function Home() {
  return (
    <>
      <Head>
        <title>Sportwave</title>
        <meta name="description" content="Sportwave is a platform for sports enthusiasts to connect and share their passion for sports." />
      </Head>
    <div className="flex">
    <Example />
    </div></>
    
    
  );
}
