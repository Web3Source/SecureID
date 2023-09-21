"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import Header from "./Components/Header";

export default function Home() {
  const [number, setNumber] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
  };
  useEffect(() => {
    async function initialize() {}
    initialize();
  }, []);
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
        <button className="flex bg-blue-500 text-lg text-white px-4 py-2 rounded-lg justify-center">
          Submit
        </button>
      </div>
    </>
  );
}
