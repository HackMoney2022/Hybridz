import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";
import { CONTRACT_ADDRESS, abi } from "../constants";
import { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers, providers, utils } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import Form from "../components/Form";
import { Box } from "@chakra-ui/react";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState();
  const [loading, setLoading] = useState(false);
  const [sentiment, setSentiment] = useState(0);
  const [balance, setBalance] = useState(0);

  const getSentiment = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/sentiment/eth");
      const data = await response.json();
      setSentiment(data);
      console.log(sentiment);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSentiment();
  }, [walletConnected]);

  const getProviderOrSigner = async (needSigner = false) => {
    const providerOptions = {
      coinbasewallet: {
        package: CoinbaseWalletSDK,
        options: {
          appName: "Hybridz",
          infuraId: "INFURA_ID", // Will add later
          rpc: "",
          chainId: 1,
          darkMode: false,
        },
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "INFURA_ID",
        },
      },
    };
    const web3Modal = new Web3Modal({
      network: "ropsten",
      providerOptions,
      disableInjectedProvider: false,
    });
    const provider = await web3Modal.connect();
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the Ropsten network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 3) {
      window.alert("Change the network to Ropsten");
      throw new Error("Change network to Ropsten");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const deposit = async (amount) => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(CONTRACT_ADDRESS, abi, signer);
      const tx = await contract.deposit(amount);
      setLoading(true);
      await tx.wait();
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const withdraw = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(CONTRACT_ADDRESS, abi, signer);
      const tx = await contract.withdraw(amount);
      setLoading(true);
      await tx.wait();
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
      console.log(walletConnected);
      await getConnectedWallet();
      await getSentiment();
    } catch (err) {
      console.error(err);
    }
  };

  const getConnectedWallet = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      if (signer) {
        const addr = await signer.getAddress();
        const bal = await signer.getBalance();
        const ethbal = ethers.utils.formatEther(bal);
        setConnectedAddress(addr);
        setBalance(ethbal);
        console.log(addr, balance);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar connectWallet={connectWallet} />
      <Form
        sentiment={sentiment}
        connectWallet={connectWallet}
        connectedAddress={connectedAddress}
        balance={balance}
      />
    </>
  );
}
