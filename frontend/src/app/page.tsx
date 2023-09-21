"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import contractabi from "./ABI/abi.json";
import Header from "./Components/Header";
import { ethers } from "ethers";

export default function Home() {
  const [contract, setContract] = useState<ethers.Contract | undefined>();
  const [number, setNumber] = useState<string>("");
  const [Signer, setSigner] = useState<ethers.Signer | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
  };
  const contractaddress = "0x3Cc0848e43e6944f536F45e41f8B1418d5CF4919";
  useEffect(() => {
    async function initialize() {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractaddress,
          contractabi,
          signer
        );
        setContract(contract);
        setSigner(signer);
      }
    }
    initialize();
  }, []);

  const generateUniqueMessage = (PhNo: string) => {
    const randomNumber = Math.floor(Math.random() * 1000000);
    const currentTimestamp = new Date().toISOString(); // Get the current timestamp in ISO format

    const message = `The message is signed by ${PhNo}, nonce: ${randomNumber}, timestamp: ${currentTimestamp}`;

    return message;
  };

  async function init() {
    if (contract && Signer) {
      const message = generateUniqueMessage(number);
      const messageHash = ethers.utils.hashMessage(message);

      console.log("Number:", number);
      console.log("Message Hash:", messageHash);
      console.log("Signer:", Signer);
      const privatekey =
        "e3010e8c38ad447f77a8cec2c5506d1260d9ddbb82dcd4489582fd1d7b82825c";
      const wallet = new ethers.Wallet(privatekey);
      const signature = await wallet.signMessage(message);
      console.log("Signature:", signature);
      //const add = await contract.add(number, signature, messageHash);
      //console.log(add);
      const resolver = await contract.resolver(number);
      console.log("Address of that number", resolver);
    }
  }

  return (
    <>
      <Header />
      <div className="flex justify-center pt-10">
        <input
          className="border rounded-md px-2 text-center lg:text-left hover:outline-none border-black"
          type="number"
          placeholder="Enter your Number"
          onChange={handleInputChange}
          value={number}
        />
      </div>
      <div className="flex justify-center pt-4">
        <button
          onClick={init}
          className="flex bg-blue-500 text-lg text-white px-4 py-2 rounded-lg justify-center"
        >
          Submit
        </button>
      </div>
    </>
  );
}
