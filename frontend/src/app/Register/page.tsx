"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import contractabi from "../ABI/abi.json";
import Header from "../Components/Header";
import { ethers } from "ethers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function page() {
  const [contract, setContract] = useState<ethers.Contract | undefined>();
  const [number, setNumber] = useState<string>("");
  const [Signer, setSigner] = useState<ethers.Signer | null>(null);
  const [otp, setOTP] = useState<string>("");
  const [OTPhash, setOTPhash] = useState<string>("");
  
  const [initCalled, setInitCalled] = useState(false); 
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
  };
  const handleOTPChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOTP(e.target.value);
  };
  const contractaddress = "0x7F2136b20D1A02f6e55d01105EF5E0a84A562d8E";
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
    const currentTimestamp = new Date().toISOString(); 

    const message = `The message is signed by ${PhNo}, nonce: ${randomNumber}, timestamp: ${currentTimestamp}`;

    return message;
  };
  

  async function init() {
    if (contract && Signer) {
      const message = generateUniqueMessage(number);
      const messageHash = ethers.utils.hashMessage(message);
      const signature = await Signer.signMessage(message);
      try {
        
        const add = await contract.add( number, signature, messageHash,OTPhash ,otp);
        console.log(add);
        // Show a success toast
        toast.success("User generated successfully!", {
          position: toast.POSITION.TOP_CENTER,
        })
     }catch (error) {
      console.error("Transaction failed:", error);
      // Show an error toast
      toast.error("Transaction failed. Please try again later.", {
        position: toast.POSITION.TOP_CENTER,
      });
  }
}
  }
  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      document.getElementById('submitButton').click();
    }
  };
  async function handleInputKey (event) {
    if (event.key === 'Enter') {
      setInitCalled(true)
  contract.on("GenerateOtp", (phone,otp,hash) => {
    setOTPhash(hash)
  });
    const createhash = contract.createHash(number);
    console.log(createhash);
   }
  };
  return (
    <div className="bg-cover bg-no-repeat bg-[url('https://blogger.googleusercontent.com/img/a/AVvXsEhtEcBj_pGeOzjkPqy0jh6yzd_6mfDR92cFPkDry0P8j7YKPfHDLU7B5hxm6NQF0hZT9jYMudcoB44mH4Al0iZ0mA3_dErQyJiOxKJ39YNjQKK-9g9uaH-zr5FcjY2ptfg4s2tFUrnVYKwfGdRB3fJ6714oDoQv3w7gcBdybVzTOLhwjp0wxg2LSn0kLOI')]">
      <div className=" bg-[url('https://blogger.googleusercontent.com/img/a/AVvXsEhYK5CFO6my1-kN-nmMGhdpq72Oe82OTux36t-TNcBEQoUnUo8UZHd3VhHy5TJH28uewDFfAzkIM-1CLgNCzCgwjaE7IBNOdn5zQAWqMZRNfrFgjZdcunLLCiIHYG_V987jdiX__TbozSUA2XKD5QJOXK3MGBN1cLkgGV_yHjmDPKR6s6B59-TlPXrQVyk')]">
      <Header /> 
     
         
              {!initCalled ?(
                <>
                   <div className="py-[91px]">
                 <div className="flex justify-center items-center my-1 layout mx-80">
            <div className="flex flex-col space-y-11">
                <p className="text-3xl font-bold text-gray-300 font-serif text-center ">Enter your <br/> Mobile Number</p>
                <input
              className="border w-96 h-12  vg font-semibold outline-none hover:bg-[#3c3b4f] bg-[#635ffa] px-7 rounded-tl-3xl rounded-br-3xl border-white border-b border-t py-2 font-serif text-xl text-gray-200"
              type="number"
                placeholder="Enter your Number"
                onChange={handleInputChange}
                value={number}
                onKeyPress={handleInputKey}
              />
                </div>
        </div>
        </div>
                </>

              ):(
                <>
                   <div className="py-[60px]">
                  <div className="flex justify-center items-center my-1 layout mx-80">
            <div className="flex flex-col space-y-11">
                <p className="text-3xl font-bold text-gray-300 font-serif text-center ">Please verify your <br/> OTP</p>
                <input
                className="border w-96 h-12  vg font-semibold outline-none hover:bg-[#3c3b4f] bg-[#635ffa] px-7 rounded-tl-3xl rounded-br-3xl border-white border-b border-t py-2 font-serif text-xl text-gray-200"
                type="number"
                placeholder="Verify OTP"
                onChange={handleOTPChange}
                value={otp}
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
        <ToastContainer />
      </div>
      </div>
              </>
              ) }
         
    </div>
    </div>
  );
}