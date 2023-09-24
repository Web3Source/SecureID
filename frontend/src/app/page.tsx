"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import contractabi from "./ABI/abi.json";
import Header from "./Components/Header";
import { ethers } from "ethers";
import Link from "next/link";
import Web3 from 'web3';

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
      if (typeof window.ethereum !== 'undefined') {
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
    <div className="bg-cover bg-no-repeat bg-[url('https://blogger.googleusercontent.com/img/a/AVvXsEhtEcBj_pGeOzjkPqy0jh6yzd_6mfDR92cFPkDry0P8j7YKPfHDLU7B5hxm6NQF0hZT9jYMudcoB44mH4Al0iZ0mA3_dErQyJiOxKJ39YNjQKK-9g9uaH-zr5FcjY2ptfg4s2tFUrnVYKwfGdRB3fJ6714oDoQv3w7gcBdybVzTOLhwjp0wxg2LSn0kLOI')]">
      <div className=" bg-[url('https://blogger.googleusercontent.com/img/a/AVvXsEhL3CqP8Ky4rtiyVk2oCFDarmY0BfwG3N_-S-HT_lDh7npzWQ7y6yz387R7P5-x2Vb_4MbSTnZSJkPFuspvZuuqDv3wUTMjRX2yEtoDc9eEsDGprY-tJ_NqhhgPMjcz98ZrKFtjy09BM9ZQjX2GLFFNhHXlEyCyziDJz7r7Brbali7004oLQU9U44L3cwU')]">
      <Header />
      <div className="flex py-[23.5px] space-x-2 justify-center">
      <div className=" w-[700px] space-y-10 flex-col justify-start">
  <p className="text-5xl text-gray-200 font-serif pt-10 font-semibold">Seamlessly Send And Receive SOL with Just a Mobile Number!</p>
  <p className="text-xl font-thin pb-7 text-gray-200 font-sans">Simplify Solana transactions with Smart ID. Use your mobile number for secure, hassle-free transfers. Enjoy peace of mind with biometric authentication. Join us for a modern Solana experience!</p>
 <Link href="/Register">
  <button className="font-semibold hover:bg-[#3c3b4f] bg-[#635ffa] px-7 rounded-tl-3xl rounded-br-3xl border-white border-b border-t py-2 font-serif text-xl text-gray-200 ">Secure Now</button>
  </Link>
</div>

        <div>
          <img src="https://blogger.googleusercontent.com/img/a/AVvXsEj3gG9iqBUot9YycHB1lbVzfaozzFLGMpN2_MBu-XYiacRAZJRt7TgqAfFZt-y2qy-QVs3shy78mW4_uObnej4gd8VA2jrsnRVugCmA9QQvfQ5l0yH6k3PWTCmXhtWr6OczUkxffJWl1KKIccrHHsR5qhwy9ijVeiOoXKHyni740QiaqWXsqslYNkkdFeU" />
        </div>
      </div>
      </div>
    </div>
  );
}
