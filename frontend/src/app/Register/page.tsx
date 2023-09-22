"use client"

import React, { useState, ChangeEvent, useEffect } from "react";
import contractabi from "../ABI/abi.json";
import Header from "../Components/Header";
import { ethers } from "ethers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Page() {
  const contractAddress = "0x7F2136b20D1A02f6e55d01105EF5E0a84A562d8E";

  const [contract, setContract] = useState<ethers.Contract | undefined>();
  const [number, setNumber] = useState<string>("");
  const [otp, setOTP] = useState<string>("");
  const [OTPhash, setOTPhash] = useState<string>("");
  const [initCalled, setInitCalled] = useState(false); 

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
      }
    }
    initialize();
  }, []);

  const generateUniqueMessage = (PhNo: string) => {
    const randomNumber = Math.floor(Math.random() * 1000000);
    const currentTimestamp = new Date().toISOString(); 

    return `The message is signed by ${PhNo}, nonce: ${randomNumber}, timestamp: ${currentTimestamp}`;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
  };

  const handleOTPChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOTP(e.target.value);
  };

  const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (initCalled) {
        init();
      } else {
        setInitCalled(true);
        createHash();
      }
    }
  };

  const createHash = async () => {
    if (contract) {
      const createhash = await contract.createHash(number); 
      setOTPhash(createhash.hash);
    }
  };

  const init = async () => {
    if (contract) {
      const message = generateUniqueMessage(number);
      const messageHash = ethers.utils.hashMessage(message);

      try {
        const signature = await contract.signer.signMessage(message);
        console.log("Signature:", signature);

        const add = await contract.add(number, signature, messageHash, OTPhash, otp);
        console.log(add);

        // Show a success toast
        toast.success("User generated successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
      } catch (error) {
        console.error("Transaction failed:", error);
        // Show an error toast
        toast.error("Transaction failed. Please try again later.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  return (
    <div className="bg-cover bg-no-repeat bg-[url('...')]">
      <div className="bg-[url('...')]">
        <Header />
        <div className="py-[60px]">
          <div className="flex justify-center items-center my-1 layout mx-80">
            <div className="flex flex-col space-y-11">
              {!initCalled ? (
                <>
                  <p className="text-3xl font-bold text-gray-300 font-serif text-center ">Enter your <br/> Mobile Number</p>
                  <input
                    className="border w-96 h-12 vg font-semibold outline-none hover:bg-[#3c3b4f] bg-[#635ffa] px-7 rounded-tl-3xl rounded-br-3xl border-white border-b border-t py-2 font-serif text-xl text-gray-200"
                    type="number"
                    placeholder="Enter your Number"
                    onChange={handleInputChange}
                    value={number}
                    onKeyPress={handleInputKeyPress}
                  />
                </>
              ) : (
                <>
                  <p className="text-3xl font-bold text-gray-300 font-serif text-center ">Please verify your <br/> OTP</p>
                  <input
                    className="border w-96 h-12 vg font-semibold outline-none hover:bg-[#3c3b4f] bg-[#635ffa] px-7 rounded-tl-3xl rounded-br-3xl border-white border-b border-t py-2 font-serif text-xl text-gray-200"
                    type="number"
                    placeholder="Verify OTP"
                    onChange={handleOTPChange}
                    value={otp}
                    onKeyPress={handleInputKeyPress}
                  />
                </>
              )}
            </div>
          </div>

          {initCalled ? (
            <div className="flex justify-center pt-4">
              <button
                id="submitButton"
                onClick={init}
                className="font-semibold hover:bg-[#3c3b4f] bg-[#635ffa] px-7 rounded-tl-3xl rounded-br-3xl border-white border-b border-t py-2 font-serif text-xl text-gray-200"
              >
                Get Address
              </button>
              <ToastContainer />
            </div>
          ) : <></>}
        </div>
      </div>
    </div>
  );
}
