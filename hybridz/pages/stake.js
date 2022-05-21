import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Input } from "@chakra-ui/react";

function About(props) {
  useEffect(() => {
    document.querySelector("body").classList.add("about");
  });

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center  mt-[69px] mb-[273px]">
        <h1>Stake Ether</h1>
        <h4>Stake ETH and receive stETH while staking.</h4>
        <div className="box-border border-solid border-gradient-1 border-2 rounded-[20px] px-10 pt-12 fill-slate-700">
          <div className="flex flex-col justify-center items-center">
            <Input placeholder="Amount" />
            <button
              type="button"
              className="w-[242px] h-[44px] bg-[#FF8D4D] sub-heading-2 behind py-1 px-1 rounded-[6px] mt-5"
            >
              Connect Wallet
            </button>
          </div>

        <div className="grid grid-cols-2 gap-14 mt-5 mb-5">
          <div className="">You will receive</div>
          <div className="">0 stETH</div>
          <div className="">Exchange rate</div>
          <div className="">1 ETH = 1 stETH</div>
          <div className="">Transaction cost</div>
          <div className="">You will receive</div>
          <div className="">Reward fee</div>
          <div className="">$4.41</div>
        </div>
        </div>
      </div>
    </>
  );
}

export default About;
