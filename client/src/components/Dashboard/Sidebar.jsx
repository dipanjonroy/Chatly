import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import image from "../../assets/5.jpg";
import { SlOptions } from "react-icons/sl";
import { GoDotFill } from "react-icons/go";

function Sidebar() {
  const [search, setSearch] = useState("");
  const [showOption, setShowOption] = useState(null);
  const [unseenMsg, setUnseenMsg] = useState(null);

  const [optionHover, setOptionHover] = useState(true);
  return (
    <div className="bg-[#252728] rounded-md px-2 py-4 h-full w-[400px] flex flex-col">
      <div className="flex items-center justify-between px-3">
        <h1 className="font-roboto text-2xl font-bold">Chats</h1>
        <button className="bg-gray-600 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-[#3B3D3E] transition duration-300">
          <BiEdit size={20} />
        </button>
      </div>

      <div className="mt-4 px-3">
        <div className="relative">
          <BiSearch
            size={20}
            className="absolute left-6 top-1/2 transform -translate-1/2"
          />

          <input
            type="text"
            placeholder="Search messenger"
            className="bg-[#333334] w-full rounded-full pl-11 pr-6 py-2 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              className="absolute right-0 top-1/2 transform -translate-1/2 cursor-pointer w-5 h-5 border border-white flex items-center justify-center rounded-full p-1"
              onClick={() => setSearch("")}
            >
              <RxCross2 size={20} />
            </button>
          )}
        </div>
      </div>

      {!search && (
        <div className="mt-4 flex-1 overflow-y-auto scrollBar">
          {[...Array(30)].map((_, index) => (
            <div
              className={`px-3 py-2 cursor-pointer ${
                !optionHover && "hover:bg-[#3B3D3E]"
              }  transition duration-200 `}
              key={index}
              onMouseEnter={() => setShowOption(index)}
              onMouseLeave={() => setShowOption(null)}
            >
              <div className="flex flex-row items-center gap-3 justify-between">
                <div className="flex flex-row items-center gap-3">
                  <img
                    src={image}
                    alt="User profile image"
                    className="block w-13 h-13 rounded-full object-cover"
                  />
                  <div className="font-poppins ">
                    <h3 className="font-semibold text-sm">
                      Dipanjon Roy Chowdhury
                    </h3>
                    <p className="text-xs font-light opacity-50 mt-1">
                      The last message
                    </p>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-center gap-3">
                  {showOption === index && (
                    <button
                      className="bg-[#252728] w-9 h-9 flex items-center justify-center rounded-full p-2 cursor-pointer hover:bg-[#3B3D3E] box-shadow-sm transition duration-200"
                      onMouseEnter={() => setOptionHover(true)}
                      onMouseLeave={() => setOptionHover(false)}
                    >
                      <SlOptions />
                    </button>
                  )}
                  <span
                    className={`${
                      unseenMsg === index ? "opacity-1" : "opacity-0"
                    }`}
                  >
                    <GoDotFill color="#6BB0FF" size={20} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
