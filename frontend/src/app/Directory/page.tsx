"use client"
import React, { useState, ChangeEvent, useEffect } from "react";
import contractabi from "../ABI/abi.json";
import Header from "../Components/Header";
import { ethers } from "ethers";

export default function Page() {
  const [contract, setContract] = useState<ethers.Contract | undefined>();
  const [number, setNumber] = useState<string>("");
  const [Signer, setSigner] = useState<ethers.Signer | null>(null);
  const [returnadd, setReturnadd] = useState<string>("");
  const [sortedData, setSortedData] = useState<string>("");
  
  const contractAddress = "0x3Cc0848e43e6944f536F45e41f8B1418d5CF4919";
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
  };
  
  useEffect(() => {
    async function initialize() {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
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
    const currentTimestamp = new Date().toISOString();
    const message = `The message is signed by ${PhNo}, nonce: ${randomNumber}, timestamp: ${currentTimestamp}`;
    return message;
  };

  const init = async () => {
    if (contract && Signer) {
      const resolver = await contract.resolver(number);
      console.log("Address of that number", resolver);
      setReturnadd(resolver);
    }
  };

  const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      document.getElementById('submitButton')?.click();
    }
  };

  const fetchSortedData = async () => {
    try {
      const vmData = await contract?.getAllNumbersAndTimestamps();
      setSortedData(vmData || []);
    } catch (error) {
      console.error("Error fetching sorted data:", error);
    }
  };

  useEffect(() => {
    if (contract) {
      fetchSortedData();
    }
  }, [contract]);

  return (
    <div className="bg-cover bg-no-repeat bg-[url('https://blogger.googleusercontent.com/img/a/AVvXsEhtEcBj_pGeOzjkPqy0jh6yzd_6mfDR92cFPkDry0P8j7YKPfHDLU7B5hxm6NQF0hZT9jYMudcoB44mH4Al0iZ0mA3_dErQyJiOxKJ39YNjQKK-9g9uaH-zr5FcjY2ptfg4s2tFUrnVYKwfGdRB3fJ6714oDoQv3w7gcBdybVzTOLhwjp0wxg2LSn0kLOI')]">
      <div className="bg-[url('https://blogger.googleusercontent.com/img/a/AVvXsEhL3CqP8Ky4rtiyVk2oCFDarmY0BfwG3N_-S-HT_lDh7npzWQ7y6yz387R7P5-x2Vb_4MbSTnZSJkPFuspvZuuqDv3wUTMjRX2yEtoDc9eEsDGprY-tJ_NqhhgPMjcz98ZrKFtjy09BM9ZQjX2GLFFNhHXlEyCyziDJz7r7Brbali7004oLQU9U44L3cwU')]">
        <Header />
        <div className="ml-40 mt-2">
          <div className="border w-80 h-12 vg flex space-x-16  font-semibold   bg-[#635ffa] px-4 rounded-tr-3xl rounded-bl-3xl border-white border-b border-t py-2 font-serif text-xl text-gray-200">
            <input
              className="outline-none bg-transparent"
              type="number"
              placeholder="Search Now"
              onChange={handleInputChange}
              value={number}
              onKeyPress={handleInputKeyPress}
            />
            <button id="submitButton" onClick={init} className="search-icon">
              🔍
            </button>
          </div>
        </div>
        <div className="py-28">
          <div className="flex justify-center text-xl space-x-80">
            <p className="text-gray-300">Address</p>
            <p className="text-gray-300">Time Stamp</p>
          </div>
          {sortedData.map((item, index) => (
            <div className="flex justify-center text-xl space-x-80" key={index}>
              <p className="text-gray-300">{item.number}</p>
              <p>{item.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
