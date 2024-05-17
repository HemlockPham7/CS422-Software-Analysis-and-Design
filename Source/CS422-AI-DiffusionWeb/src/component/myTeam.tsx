import Image from "next/image";

export default function MyTeam() {
  return (
    <div   className="w-full min-h-screen bg-cover bg-center pb-56 bg-no-repeat bg-mybg">
        <div className=" hidden md:flex flex-col justify-evenly h-screen">
                <div className = "flex flex-col pt-36 items-center">
                    <div className ="flex flex-row space-x-2 mb-4">
                        <img  alt="" src="https://arbmarvel.ai/icons/ic-collection.svg"></img>
                        <p className="text-white 2xl:text-lg md:text-base font-semibold">Stable Diffusion</p>
                    </div>
                    <p className="text-textVang mb-8 text-6xl font-bold" >
                        WELCOME TO MY TEAM CS422
                    </p>
                    <p className="text-[color:white] text-base mr-5 mb-8 " >
                        This is our project about AI Stable Diffusion using Replicate
                    </p>
                </div>        
                <div className="flex flex-row justify-between mx-20  ">
                        <div className="flex flex-col items-center">
                            <div className="text-textVang font-bold text-lg">Bui Nguyen Hoang</div>
                            <div className="text-textVang mb-8 text-base">21125161</div>
                            {/* <Image className="w-64 h-96 rounded-xl border-4 border-yellow-300" src={luong} alt={'aaa'} /> */}
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-textVang font-bold text-lg">Nguyen Trong Nghia</div>
                            <div className="text-textVang mb-8 text-base">21125154</div>
                            {/* <Image className="w-64 h-96 rounded-xl border-4 border-yellow-300" src={minh} alt={'aaa'} /> */}
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-textVang font-bold text-lg">Pham Viet Hoang</div>
                            <div className="text-textVang mb-8 text-base">20125031</div>
                            {/* <Image className="w-64 h-72 rounded-xl border-4 border-yellow-300" src={bao} alt={'aaa'} /> */}
                        </div>
                    </div>
            </div>
    </div>
  );
}
