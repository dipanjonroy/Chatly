import { useRef, useState } from "react";
import userImage from "../../assets/5.jpg";
import { IoMdLogOut } from "react-icons/io";
import { IoMdSend } from "react-icons/io";

function ChatBox() {
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState("");
 

  const textareaRef = useRef(null);

  const handleInput = (e) => {
    setMessage(e.target.value);
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`; // Auto-grow
  };

  return (
    <div className="flex-1 bg-[#252728] h-full px-2 rounded-md">
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-center justify-between py-2 pe-2">
          <div className="flex items-center gap-3 font-poppins cursor-pointer p-2 rounded-md hover:bg-[#3B3D3E]  transition duration-200">
            <div className="w-10 h-10">
              <img src={userImage} alt="User image" className="rounded-full" />
            </div>
            <div className="leading-[16px]">
              <h4 className="font-semibold text-sm">Dipanjon Roy Chowdhury</h4>
              {isActive && (
                <span className="text-xs opacity-75">Active now</span>
              )}
            </div>
          </div>
          <button className="p-2 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer hover:bg-[#3B3D3E] shadow-xl transition duration-200">
            <IoMdLogOut size={22} />
          </button>
        </div>

        <div className="flex-1">

        </div>

        <div className="px-2 py-3 flex items-center justify-between">
          <textarea
            ref={textareaRef}
            placeholder="Type message here..."
            className="bg-[#333334] w-full rounded-full ps-4 pe-6 py-2 focus:outline-none text-white resize-none overflow-hidden max-h-32"
            value={message}
            onChange={handleInput}
            rows={1}
          />

          {message && (
            <button className="ms-3">
              <IoMdSend size={25} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
