import React from "react";

const ShimmerMenu = () => {
  return (
    <div className="bg-slate-50 w-full">
      <div className="font-poppins flex gap-10 flex-wrap justify-center bg-[#171a29] text-white my-8 p-4 ">
        <div className="rounded-lg bg-gray-300 h-52 w-80 animate-pulse"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
          </div>
          <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
        </div>
      </div>

      <div className=" new-menu xl:pxx-[23rem] pl-10">
        <div className="header text-[26px] font-semibold border-b-gray-800 text-gray-800 w-full border-b pb-2 pl-7 font-poppins animate-pulse">
          Menu
        </div>
      </div>

      <div className="flex ">
        <div className="bg-white w-2/3 m-auto font-poppins flex p-3 ">
          <h1>
            <span className="text-2xl ml-36 pt-4 font-bold animate-pulse">Recommended </span>
            <p className="text-xs font-thin ml-36 animate-pulse">0 ITEMS</p>
            <ul>
              {[1, 2, 3].map((index) => (
                <div className="flex justify-between ml-96 m-5 p-5 border-b" key={index}>
                  <div className="flex gap-2 flex-col max-w-md pr-5">
                    <div className="h-5 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/3 animate-pulse"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3 animate-pulse"></div>
                  </div>
                  <div className="w-28 flex flex-col ml-64 justify-between items-center gap-3">
                    <div className="h-28 bg-gray-300 animate-pulse"></div>
                    <div className="flex justify-between font-poppins w-20 border bg-slate-50 text-black py-[2px] px-2 cursor-pointer">
                      <div className="h-5 bg-gray-300 w-6 animate-pulse"></div>
                      <div className="h-5 bg-gray-300 w-4 animate-pulse"></div>
                      <div className="h-5 bg-gray-300 w-6 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </h1>
        </div>
        <div className="xl:block flex w-[508px] flex-col gap-4 justify-center items-center m-4 p-4 bg-white shadow-md">
          <div className="h-96 bg-gray-300 w-96 animate-pulse"></div>
          <span className="font-poppins font-bold animate-pulse">Your cart is empty</span>
        </div>
      </div>
    </div>
  );
};

export default ShimmerMenu;
