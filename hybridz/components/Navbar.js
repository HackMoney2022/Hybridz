import { useEffect, useState } from "react";
// import Link from "next/link";
// import Web3Modal from "web3modal";
// import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
// import WalletConnect from "@walletconnect/web3-provider";
// import { ethers } from 'ethers';

function Navbar({ connectWallet, connectedAddress }) {
  const [hideNav, setHideNav] = useState(true);
  const [screenWidth, setScreenWidth] = useState();
  //   const [provider, setProvider] = useState();
  //   const [library, setLibrary] = useState();
  //   const [account, setAccount] = useState('');
  //   const [network, setNetwork] = useState();
  //   const [chainId, setChainId] = useState();
  //   console.log('props', props);
  //   const providerOptions = {
  //       binancechainwallet: {
  //         package: true
  //       },
  //       coinbasewallet: {
  //         package: CoinbaseWalletSDK,
  //         options: {
  //           appName: "fingers-crossed",
  //           infuraId: process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
  //         }
  //       },
  //       walletconnect: {
  //         package: WalletConnect,
  //         options: {
  //           infuraId: process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
  //         }
  //       }
  //   };

  const openNav = () => {
    setHideNav(!hideNav);
  };

  useEffect(() => {
    if (window) {
      setScreenWidth(window.innerWidth);
      window.addEventListener("resize", (e) => {
        setScreenWidth(e.target.innerWidth);
      });
    }
    const navContainer = document.querySelector("header");
    const navHeight = navContainer.clientHeight;
    window.addEventListener("scroll", () => {
      window.pageYOffset > navHeight
        ? (navContainer.style.background = "rgba(0, 0, 0, .3)")
        : (navContainer.style.background = "transparent");
    });
  }, []);

  //   const connectWallet = async () => {
  //     const web3Modal = new Web3Modal({
  //       providerOptions
  //     });
  //     // web3Modal.clearCachedProvider();
  //     try {
  //       console.log('waiting for provider');
  //       const provider = await web3Modal.connect();
  //       console.log('provider', provider);
  //       const library = new ethers.providers.Web3Provider(provider);
  //       const accounts = await library.listAccounts();
  //       console.log('account', account[0]);
  //       console.log('library', library);
  //       const network = await library.getNetwork();
  //       setProvider(provider);
  //       setLibrary(library);
  //       if (accounts) setAccount(accounts[0]);
  //       setNetwork(network);
  //       setChainId(network.chainId);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  console.log(connectedAddress);

  return (
    <header className="flex flex-wrap justify-center items-center sticky top-0 bg-transparent backdrop-blur-lg z-[99] transition duration-200 py-0.5 px-16">
      <div className="flex mr-auto py-2 pl-6">
        {/* <Link href="/"> */}
        <a className="flex mr-auto hover:bg-[#dbd5d533] ease-in transition duration-700 px-2 py-1 border-0 rounded-xl">
          <div className="font-inter font-semibold text-[26px] text-black">
            Hybridz
          </div>
        </a>
        {/* </Link> */}
      </div>

      <div className="absolute space-x-8">
        {/* <div className=" left-auto flex items-center"> */}
        {/* <Link href="/about"> */}
        {/* <a className="nav-link">Stake</a> */}
        {/* </Link> */}
        {/* <Link href="/events"> */}
        {/* <a className="nav-link">Wrap</a> */}
        {/* </Link> */}
        {/* // <Link href="/contact"> */}
        {/* <a className="nav-link">Reward</a> */}
        {/* </Link> */}
      </div>
      <div className="items-end flex flex-row space-x-3">
        <button onClick={connectWallet} className="tetiary-1">
          {connectedAddress ? connectedAddress : "Connect Wallet"}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
