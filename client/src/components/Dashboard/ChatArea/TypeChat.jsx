import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdSend } from "react-icons/io";
import socket from "../../../libs/socket";
import { addMessage } from "../../../features/chat/messageSlice";
import {
  addLastMessage,
  getChatRooms,
} from "../../../features/chat/chatRoomSlice";

function TypeChat() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.checkAuth);
  const { chatRoom } = useSelector((store) => store.chatRoom);
  const [message, setMessage] = useState("");

  const textareaRef = useRef(null);

  const handleInput = (e) => {
    setMessage(e.target.value);
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Reset
    textarea.style.height = `${textarea.scrollHeight}px`; // Auto-grow
  };

  const handleSendMessage = () => {
    if (!message) return;
    const tempId = Date.now();

    const tempMessage = {
      _id: tempId,
      tempId,
      chatRoom: chatRoom._id,
      sender: {
        name: user.name,
        profileImage: user.profileImage,
        _id: user._id,
      },
      message,
      readBy: [
        {
          userId: user._id,
          readAt: Date.now(),
        },
      ],
      timestamp: Date.now(),
    };

    const tempLastMessage = {
      content: message,
      sender: user._id,
      readBy: [
        {
          userId: user._id,
          readAt: Date.now(),
        },
      ],
      timestamp: Date.now(),
    };

    dispatch(addMessage(tempMessage));

    dispatch(
      addLastMessage({ chatRoomId: chatRoom._id, lastMessage: tempLastMessage })
    );

    socket.emit("send-message", {
      chatRoomId: chatRoom?._id,
      senderId: user._id,
      message,
      tempId
    });

    setMessage("");
    dispatch(getChatRooms());
  };

  return (
    <div className="px-2 py-3 flex items-center justify-between">
      <textarea
        ref={textareaRef}
        placeholder="Type message here..."
        className="bg-[#333334] w-full rounded-full ps-4 pe-6 py-2 focus:outline-none text-white resize-none overflow-hidden max-h-32"
        rows={1}
        value={message}
        onChange={handleInput}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.ctrlKey) {
            e.preventDefault();
            handleSendMessage();
          } else if (e.key === "Enter" && e.ctrlKey) {
            setMessage((prev) => prev + "\n");
          }
        }}
      />

      {message && (
        <button className="ms-3" onClick={handleSendMessage}>
          <IoMdSend size={25} className="text-white" />
        </button>
      )}
    </div>
  );
}

export default TypeChat;
