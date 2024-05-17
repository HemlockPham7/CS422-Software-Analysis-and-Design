import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import web3 from "./web3";
import {getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";

declare let window: any;

import { getDatabase ,  ref as ref_database, set, update, child, get, push } from "firebase/database";
import { db } from "../config";

const Navigation = () => {
  const [openNav, setOpenNav] = useState(false);
  const [defaultAccount, setDefaultAccount] = useState("");
  const [popupInstall ,  setPopupInstall] =  useState(false)
  const [defaultUsername, setDefaultUsername] = useState("");

  const toggleNav = () => {
    if (openNav) {
      setOpenNav(false);
    } else {
      setOpenNav(true);
    }
  };

  useEffect(() => {
    //localStorage.removeItem("account");
    if(localStorage.getItem("account") != null)
    {
      const userID = localStorage.getItem("account")!;
      setDefaultAccount(userID);
      get(ref_database(db, `users/`+ userID))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setDefaultUsername(snapshot.val().name);
        } else {
          console.log("No data available");
        }
      } ) 
    }
    
  }, []);
  

  const ConnectToMetamask = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result: any[]) => {
          localStorage.setItem("account", result[0]);
          setDefaultAccount(result[0]);
          accountChangeHandler(result);
        });
    } else {
      console.log("Install Metamask");
      setPopupInstall(true)
    }
  };


  const accountChangeHandler = async (newAccount: any) => {
    setDefaultAccount(newAccount);
    localStorage.setItem("account", newAccount);
    console.log(localStorage.getItem("account"));
  };

  return (
    <div>
    <nav className="bg-gray-900 fixed top-0 right-0 left-0 border-b border-gray-200 px-4 py-3 z-50">
        <div className="container mx-auto flex items-center justify-between">
            <Link href="https://cs-422-diffusion-web.vercel.app/">
                <div className="font-bold text-textVang text-3xl">CS422</div>
            </Link>
            <button
                onClick={toggleNav}
                className="inline-flex items-center p-2 ml-3 text-sm text-black rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 bg-textXanh"
                aria-label="Toggle navigation"
            >
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </button>
            <div className="hidden md:flex flex-row space-x-12 md:text-sm md:font-medium">
                <Link href="/" className="text-white hover:text-textVang font-semibold">
                    Home
                </Link>
                <Link href={{ pathname: "../AI" }} className="text-white hover:text-textVang font-semibold">
                    Stable Diffusion
                </Link>
                <Link href={{ pathname: "../collection" }} className="text-white hover:text-textVang font-semibold">
                    My Collections
                </Link>
                <Link href={{ pathname: "../account" }} className="text-white hover:text-textVang font-semibold">
                    Edit Profile
                </Link>
            </div>
            <div className="flex space-x-4">
                {defaultAccount ? (
                    <div className="text-black bg-textVang font-semibold rounded-lg text-sm px-5 py-2.5">
                        {defaultUsername}
                    </div>
                ) : (
                    <button
                        onClick={ConnectToMetamask}
                        className="text-black bg-textVang font-semibold rounded-lg text-sm px-5 py-2.5"
                    >
                        Connect Blockchain
                    </button>
                )}
            </div>
        </div>
    </nav>
    {popupInstall && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-neutral-700 bg-opacity-40">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start">
                    <img
                        src="https://cdn0.iconfinder.com/data/icons/shift-interfaces/32/Error-512.png"
                        className="p-1 rounded h-11 w-11"
                        alt="Error Icon"
                    />
                </div>
                <div className="mt-4 space-y-6">
                    <p className="font-medium text-base leading-relaxed">PLEASE INSTALL METAMASK WALLET</p>
                </div>
                <div className="flex items-center space-x-2 mt-6">
                    <button
                        onClick={() => {setPopupInstall(false)}}
                        className="hover:bg-textVang text-black border-black border font-medium text-sm px-5 py-2.5"
                    >
                        Skip
                    </button>
                    <Link href="https://metamask.io/download/" className="hover:bg-textVang text-black border-black border font-medium text-sm px-5 py-2.5">
                        Install
                    </Link>
                </div>
            </div>
        </div>
    )}
</div>

  );
};

export default Navigation;
