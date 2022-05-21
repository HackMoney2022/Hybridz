import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";
import { CONTRACT_ADDRESS, abi } from "../constants";
import { useState } from "react";
import Web3Modal from "web3modal";
import { providers } from "ethers";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState();
  const [loading, setLoading] = useState(false);
  // const web3ModalRef = useRef();

  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const web3Modal = new Web3Modal({
      network: "ropsten",
      providerOptions: {},
      disableInjectedProvider: false,
    });
    const provider = await web3Modal.connect();
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the Ropston network, let them know and throw an error
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
    } catch (err) {
      console.error(err);
    }
  };

  const getConnectedWallet = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      if (signer) {
        const addr = await signer.getAddress();
        setConnectedAddress(addr);
        console.log(addr);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar connectWallet={connectWallet} />
    </>
  );
}
