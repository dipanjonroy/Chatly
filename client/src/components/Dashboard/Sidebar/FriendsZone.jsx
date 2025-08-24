import { useEffect, useMemo, useState } from "react";
import profileImg from "../../../assets/5.jpg";
import IconButton from "../../ui/IconButton";
import ProfileImage from "../../ui/ProfileImage";
import { SlOptions } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessageSeen,
  getChatRooms,
  openRoom,
} from "../../../features/chat/chatRoomSlice";
import {
  addFriendInfo,
  getMessages,
  markMessageAsRead,
} from "../../../features/chat/messageSlice";
import socket from "../../../libs/socket";

function FriendZone() {
  const [optionHover, setOptionHover] = useState(false);
  const [showOption, setShowOption] = useState(null);
  const [msgSeen, setMsgSeen] = useState(false);
  const [selection, setSelection] = useState(null);

  const dispatch = useDispatch();

  const { chatRoomsList } = useSelector((store) => store.chatRoom);
  const { user } = useSelector((store) => store.checkAuth);

  const handleSelectedChat = (friend, index) => {
    setSelection(index);
    dispatch(openRoom(friend._id))
      .unwrap()
      .then((res) => {
        dispatch(getMessages(res._id));
        dispatch(addFriendInfo(friend));
        dispatch(markMessageAsRead({ senderId: user._id }));
        dispatch(addMessageSeen({ chatRoomId: res._id, userId: user._id }));
        socket.emit("join-room", { chatRoomId: res._id, userId: user._id });
      });
  };

  const friendReadMsg = useMemo(
    () =>
      chatRoomsList.some((room) =>
        room.lastMessage.readBy.some((r) => r.userId === room.friend._id)
      ),
    [chatRoomsList]
  );

  return (
    <>
      {chatRoomsList.map((room, index) => (
        <div
          key={room._id}
          className={`${
            selection === index && "bg-[#434343]"
          } flex items-center justify-between px-2 py-[10px] cursor-pointer ${
            !optionHover && "hover:bg-secondary"
          } rounded-lg`}
          onMouseEnter={() => setShowOption(index)}
          onMouseLeave={() => setShowOption(null)}
          onClick={() => handleSelectedChat(room?.friend, index)}
        >
          <div className="flex items-center gap-4">
            <ProfileImage
              src={room?.friend?.profileImage}
              alt="Profile Image"
              width="w-12"
              height="h-12"
            />
            <div className="leading-5">
              <h5 className="font-semibold text-[15px] ">
                {room?.friend?.name}
              </h5>
              <p
                className={`text-[14px]  ${
                  room?.lastMessage?.readBy?.some((r) => r.userId === user._id)
                    ? "font-normal opacity-50"
                    : "font-bold opacity-100"
                }`}
              >
                {room?.lastMessage?.content}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div
              className={`${showOption === index ? "visible" : "invisible"}`}
            >
              <IconButton
                type="option"
                onMouseEnter={() => setOptionHover(true)}
                onMouseLeave={() => setOptionHover(false)}
              >
                <SlOptions size={20} />
              </IconButton>
            </div>
            <div
              className={`${
                friendReadMsg && room.lastMessage.sender === user._id
                  ? "visible"
                  : "invisible"
              }`}
            >
              <ProfileImage
                src={room?.friend?.profileImage}
                alt="Profile Image"
                width="w-4"
                height="h-4"
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default FriendZone;
