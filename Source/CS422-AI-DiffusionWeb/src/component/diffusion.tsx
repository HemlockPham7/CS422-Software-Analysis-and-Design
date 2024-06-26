'use client';
import React, { useState } from "react"
import Head from "next/head";
import Image from "next/image";

const sleep = (ms: any) => new Promise((r) => setTimeout(r, ms));
import { ClipLoader } from "react-spinners";

import { getDatabase, ref, child, push, update, set } from "firebase/database";
import Link from "next/link";
import { db } from "../config";




interface DataType {
  output: string,
  status: string
}
export default function Diffusion() {

  const [prediction, setPrediction] = useState<DataType>();
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [anh, setAnh] = useState(false)
  const [doneSave, setDoneSave] = useState(false)
  const [popupInstall, setPopupInstall] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { prompt, seed, guidanceScale } = Object.fromEntries(formData.entries()) as { prompt: string; seed: string; guidanceScale: string };
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        seed: parseInt(seed),
        guidanceScale: parseInt(guidanceScale)
      }),
    });
    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      setLoading(true)
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      console.log(prediction)
      setPrediction(prediction);
    }
    if (prediction.status == "succeeded") {
      console.log("succeeded")
      console.log(prediction)
      setLoading(false)
      setAnh(true)
    }
  };

  function getRandomInt(min: any, max: any) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  const SaveImage = () => {
    if (localStorage.getItem("account") == null) {
      setPopupInstall(true)
      setAnh(false)
    }
    else {
      if (prediction == null) return
      var id = getRandomInt(1, 10000)
      set(ref(db, 'users/' + localStorage.getItem("account") + '/images' + '/' + id), {
        image: prediction.output[0]
      })
        .then(() => {
          setDoneSave(true)
          setAnh(false)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <div className="w-full min-h-screen bg-cover bg-center pb-20 bg-no-repeat bg-mybg">
      <div className="flex min-h-screen flex-col items-center py-2">
        <p className="text-textVang mb-8 text-5xl mt-36 font-bold" >
          INPUT YOUR PROMPT TO GENERATE AI IMAGE
        </p>
        <main className="flex w-full flex-col justify-center px-20 text-center">
          <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-row justify-between w-full">
              <div className="flex flex-col items-start w-1/2">
                <label className="text-textVang font-bold text-2xl mb-2" htmlFor="prompt">Prompt</label>
                <textarea name="prompt" className="border border-gray-600 w-full rounded-lg caret-black outline-none"></textarea>
              </div>
              <div className="flex items-center">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9GxI85fbtp4LwMm3BGQHc8CaIHm98rQe7NNIA5ZVh8Q&s" alt="Robot image" className="w-84 h-48" />
              </div>
            </div>
            <div className="flex flex-col items-start mt-4">
              <label className="text-textVang font-bold text-2xl mb-2" htmlFor="seed">Seed (recommend: 123123)</label>
              <input name="seed" type="number" className="border border-gray-600 rounded-lg p-2 outline-none" />
            </div>

            <div className="flex flex-col items-start mt-4">
              <label className="text-textVang font-bold text-2xl mb-2" htmlFor="guidanceScale">Guidance Scale (recommend: 6)</label>
              <input name="guidanceScale" type="number" className="border border-gray-600  rounded-lg p-2 outline-none" />
            </div>
            <button className="items-center bg-textVang text-black font-semibold w-36 mt-4 rounded-lg p-2">Generate</button>
          </form>


          {prediction && (
            <div className="mt-5">
              {prediction.output && (
                <div>
                  {anh && (
                    <div>
                      <div className="grid place-items-center bg-neutral-700 bg-opacity-60 fixed top-0 left-0 right-0 z-50 w-full p-4 overflw-x-hidden overflow-y-auto md:inset-0 h-modal min-h-screen">
                        <div className="relative bg-pink-100 rounded-lg shadow dark:bg-gray-700 md:w-bg w-1/2 grid place-items-center">
                          <div className="flex items-start  border-b rounded-t dark:border-gray-600">
                            <img
                              className=" md:h-[20rem] mt-12 w-[20rem] object-center rounded "
                              src={prediction.output[0]}
                              alt=""
                            />
                          </div>
                          <div className="flex items-center p-6 space-x-2  rounded-b dark:border-gray-600">
                            <button
                              onClick={() => { setAnh(false) }}
                              data-modal-toggle="defaultModal"
                              type="button"
                              className="text-black  hover:bg-textVang border-black border font-medium  text-sm px-5 py-2.5 text-center"
                            >
                              Retry
                            </button>
                            <button
                              onClick={SaveImage}
                              data-modal-toggle="defaultModal"
                              type="button"
                              className="text-black  hover:bg-textVang border-black border font-medium  text-sm px-5 py-2.5 text-center"
                            >
                              Save Image
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              )}
              <p className="text-white">Status: {prediction.status}</p>
            </div>
          )}
        </main>

        {loading && (
          <div className="grid place-items-center bg-neutral-700 bg-opacity-40 fixed top-0 left-0 right-0 z-50 w-full p-4 overflw-x-hidden overflow-y-auto md:inset-0 h-modal min-h-screen">
            <div className="relative bg-white rounded-lg shadow w-72 md:w-96 grid place-items-center">
              <div className="flex items-start p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold pt-2 pl-4 text-gray-900 ">
                  Waiting for generating image
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <ClipLoader color={"#000"} size={35} />
              </div>
            </div>
          </div>
        )}

        {doneSave &&
          <div className="grid place-items-center bg-neutral-700 bg-opacity-40 fixed top-0 left-0 right-0 z-50 w-full p-4 overflw-x-hidden overflow-y-auto md:inset-0 h-modal min-h-screen">
            <div className="relative bg-white rounded-lg shadow w-72 md:w-96 grid place-items-center">
              <div className="flex items-start p-4 border-b rounded-t dark:border-gray-600">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/148/148767.png"
                  className="p-1 rounded h-11 w-11"
                  alt="..."
                />
                <h3 className="text-xl font-semibold pt-2 pl-4 text-gray-900 ">
                  Upload
                </h3>
              </div>
              <div className="mt-4 space-y-6">
                <p className="font-medium text-base leading-relaxed">
                  SUCCESSFUL
                </p>
              </div>
              <div className="flex items-center p-6 space-x-2  rounded-b dark:border-gray-600">
                <button onClick={() => { setDoneSave(false) }}
                  data-modal-toggle="defaultModal"
                  type="button"
                  className="text-black  hover:bg-textVang  border-black border font-medium  text-sm px-5 py-2.5 text-center"
                >
                  Thank you
                </button>
              </div>
            </div>
          </div>
        }
        {
          popupInstall &&
          <div className="grid place-items-center bg-neutral-700 bg-opacity-40 fixed top-0 left-0 right-0 z-50 w-full p-4 overflw-x-hidden overflow-y-auto md:inset-0 h-modal min-h-screen">
            <div className="relative bg-white rounded-lg shadow w-72 md:w-96 grid place-items-center">
              <div className="flex items-start p-4 border-b rounded-t dark:border-gray-600">
                <img
                  src="https://cdn0.iconfinder.com/data/icons/shift-interfaces/32/Error-512.png"
                  className="p-1 rounded h-11 w-11"
                  alt="..."
                />
              </div>
              <div className=" space-y-6">
                <p className="font-medium text-base leading-relaxed">
                  PLEASE INSTALL METAMASK WALLET
                </p>
              </div>
              <div className="flex flex-row items-center p-6 space-x-2  rounded-b dark:border-gray-600">
                <button onClick={() => { setPopupInstall(false) }}
                  data-modal-toggle="defaultModal"
                  type="button"
                  className="text-black  hover:bg-textVang border-black border font-medium  text-sm px-5 py-2.5 text-center"
                >
                  Skip
                </button>
                <Link
                  href="https://metamask.io/download/"
                  data-modal-toggle="defaultModal"
                  className="text-black  hover:bg-textVang border-black border font-medium  text-sm px-5 py-2.5 text-center"
                >
                  Install
                </Link>
              </div>
            </div>
          </div>
        }



      </div>
    </div>

  );
}