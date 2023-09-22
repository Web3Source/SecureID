"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import contractabi from "../ABI/abi.json";
import Header from "../Components/Header";
import { ethers } from "ethers";

export default function page() {
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
      const add = await contract.add(number, signature, messageHash);
      console.log(add);
      const resolver = await contract.resolver(number);
      console.log("Address of that number", resolver);
    }
  }
  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      document.getElementById('submitButton').click();
    }
  };

  return (
    <div className="bg-cover bg-no-repeat bg-[url('https://blogger.googleusercontent.com/img/a/AVvXsEhtEcBj_pGeOzjkPqy0jh6yzd_6mfDR92cFPkDry0P8j7YKPfHDLU7B5hxm6NQF0hZT9jYMudcoB44mH4Al0iZ0mA3_dErQyJiOxKJ39YNjQKK-9g9uaH-zr5FcjY2ptfg4s2tFUrnVYKwfGdRB3fJ6714oDoQv3w7gcBdybVzTOLhwjp0wxg2LSn0kLOI')]">
      <div className=" bg-[url('https://blogger.googleusercontent.com/img/a/AVvXsEhL3CqP8Ky4rtiyVk2oCFDarmY0BfwG3N_-S-HT_lDh7npzWQ7y6yz387R7P5-x2Vb_4MbSTnZSJkPFuspvZuuqDv3wUTMjRX2yEtoDc9eEsDGprY-tJ_NqhhgPMjcz98ZrKFtjy09BM9ZQjX2GLFFNhHXlEyCyziDJz7r7Brbali7004oLQU9U44L3cwU')]">
      <Header />
     <div className="py-[60px]">
      <div className="flex justify-center items-center my-1 layout mx-80">
  <div className="flex flex-col space-y-11">
    <p className="text-3xl font-bold text-gray-300 font-serif text-center ">Enter your <br/> Mobile Number</p>
    <input
     className="border w-96 h-12  vg font-semibold outline-none hover:bg-[#3c3b4f] bg-[#635ffa] px-7 rounded-tl-3xl rounded-br-3xl border-white border-b border-t py-2 font-serif text-xl text-gray-200"
     type="number"
      placeholder="Enter your Number"
      onChange={handleInputChange}
      value={number}
      onKeyPress={handleInputKeyPress}
    />
  </div>
</div>

      <div className="flex justify-center pt-4">
        <button
        id="submitButton"
          onClick={init}
          className="font-semibold hover:bg-[#3c3b4f] bg-[#635ffa] px-7 rounded-tl-3xl rounded-br-3xl border-white border-b border-t py-2 font-serif text-xl text-gray-200 "
         >
          Get Address
        </button>
      
      </div>
      </div>
    </div>
    </div>
  );
}
