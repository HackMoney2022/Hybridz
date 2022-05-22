import React from "react";
import { useState, useEffect } from "react";
import { Input } from "@chakra-ui/react";

const Form = ({ sentiment, connectedAddress, connectWallet, balance }) => {
  return (
    <div>
      {" "}
      <div className="flex flex-col justify-center items-center  mt-[69px] mb-[273px]">
        <h1>Short Ether</h1>
        <h4>Stake ETH and receive hETH while shorting.</h4>
        <h4>Connected Address: {connectedAddress}</h4>
        <div className="box-border border-solid border-gradient-1 border-2 rounded-[20px] px-10 pt-12 fill-slate-700">
          <div className="flex flex-col justify-center items-center">
            <Input placeholder="Amount (in ETH)" />
            <button
              type="button"
              onClick={connectWallet}
              className="w-[242px] h-[44px] bg-[#6969ff] sub-heading-2 behind py-1 px-1 rounded-[6px] mt-5"
            >
              Deposit
            </button>
          </div>

          <div className="grid grid-cols-2 gap-5 mt-5 mb-5">
            <div className="">Wallet Balance</div>
            <div className="">{Math.round(balance * 100) / 100} ETH</div>
            <div className="">Sentiment (ETH)</div>
            <div className="">{sentiment}</div>
            <div className="">You will receive</div>
            <div className="">0 hETH</div>
            <div className="">Reward fee</div>
            <div className="">$4.41</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
