import Head from "next/head";
import Image from "next/image";
import { useState, useContext } from "react";
import Header from "../components/Header";

export default function Home({ res }) {
  const [Message, setMSG] = useState(
    <p className="sm:text-xl text-lg text-black">Paste Your Address</p>
  );

  const HandleCheck = (addr) => {
    let loweracc = res.map((acc) => {
      return acc.toLowerCase();
    });
    let useradd = addr.toLowerCase();
    if (loweracc.includes(useradd)) {
      setMSG(<p className="sm:text-xl text-lg text-green-600">Whitelisted</p>);
    } else {
      setMSG(
        <p className="sm:text-xl text-lg text-red-500">Not Whitelisted</p>
      );
    }
    if (String(addr).length < 42) {
      setMSG(
        <p className="sm:text-xl text-lg text-blue-500">Not a valid address</p>
      );
    }

    if (String(addr).length == 0) {
      setMSG(
        <p className="sm:text-xl text-lg text-black">Paste Your Address</p>
      );
    }
  };

  return (
    <div className='flex flex-col min-h-screen justify-center items-center bg-[url("/assets/bg.png")] bg-center bg-cover'>
      <Head>
        <title>Whitelist Checker</title>
        <meta name="description" content="Whitelist Checker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <div className="w-full flex flex-col justify-center items-center space-y-5">
        <div className="sm:w-[40%] w-[95%] flex flex-col space-y-5 justify-center items-center">
          <input
            className="w-full text-black p-3 focus:outline-2 focus:outline-slate-400 caret-slate-500 rounded-md"
            type={"text"}
            placeholder={"Paste Your Address to check"}
            onChange={(e) => {
              e.preventDefault();
              HandleCheck(e.target.value);
            }}
          />
          {Message}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  let URL = context.req.headers.host;

  const getwl = await fetch(`http://${URL}/Whitelist/Accounts.json`);
  const res = await getwl.json();

  return {
    props: {
      res,
    },
  };
}
