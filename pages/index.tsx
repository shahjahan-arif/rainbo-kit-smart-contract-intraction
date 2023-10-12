import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { useAccount, useConnect, useEnsName } from "wagmi";

import { useEffect, useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { ContractAbi } from "./Contract";

const Home: NextPage = () => {
  const { isConnected } = useAccount();
  const [num, setNum] = useState(0);
  const { write } = useContractWrite({
    address: "0x1a5D0b1175C55Aa5932A5ec259f007e9A5Ec46dA",
    abi: ContractAbi,
    functionName: "store",
    args: [BigInt(num)],
  });

  return (
    <>
      <h1 style={{ textAlign: "center", margin: "100px auto" }}></h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: "200px",
        }}
      >
        <ConnectButton></ConnectButton>
      </div>

      <div className="flex justify-center my-12 ">
        <div className="border p-5 flex flex-col shadow-2xl rounded-2xl ">
          <input
            onChange={(e: any) => setNum(e.target.value)}
            type="number"
            className="outline-none border-2 border-gray-300 p-2 rounded-lg"
            name=""
            id=""
          />
          <button
            className="border w-full  mt-6 py-2 rounded-xl duration-300 hover:bg-green-500 hover:text-white"
            disabled={!write}
            onClick={() => write?.()}
          >
            mint
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
