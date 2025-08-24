import ProfileImage from "../../ui/ProfileImage";
import profileImg from "../../../assets/avatar.png";
import IconButton from "../../ui/IconButton";
import { FaCheck } from "react-icons/fa6";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import socket from "../../../libs/socket";
import { useDispatch, useSelector } from "react-redux";
import { getFriendRequests } from "../../../features/users/friendRequestSlice";
import { hideNotification } from "../../../features/Notification/toastSlice";
import { getFriends } from "../../../features/users/friendsSlice";

function NotificationBox({ person, index }) {
  const [isIconHover, setIsIconHover] = useState(false);
  const [isHover, setIsHover] = useState(null);

  const { user } = useSelector((store) => store.checkAuth);

  const dispatch = useDispatch();

  const handleRejectFriendRequest = () => {
    socket.emit("reject-friend-request", {
      fromId: user._id,
      toId: person._id,
    });
    dispatch(getFriendRequests());
    dispatch(hideNotification());
  };

  const handleAcceptFriendRequest = () => {
    socket.emit("accept-friend-request", {
      fromId: user._id,
      toId: person._id,
    });

    dispatch(getFriendRequests());
    dispatch(getFriends());
    dispatch(hideNotification());
  };

  return (
    <div
      className={`flex items-center gap-4 px-4 py-3 cursor-pointer ${
        !isIconHover && "hover:bg-hover"
      }`}
      onMouseEnter={() => setIsHover(index)}
      onMouseLeave={() => setIsHover(null)}
    >
      <ProfileImage
        src={person?.profileImage?.url}
        width="w-12"
        height="h-12"
      />
      <div className="leading-4">
        <h5 className="font-semibold text-[15px] ">
          {person?.name?.firstName + " " + person?.name?.lastName}
        </h5>
        <p className="text-sm opacity-50">wants to connect with you</p>
      </div>

      <div
        className={`flex gap-3 ${isHover === index ? "visible" : "invisible"}`}
        onMouseEnter={() => setIsIconHover(true)}
        onMouseLeave={() => setIsIconHover(false)}
      >
        <IconButton onClick={handleAcceptFriendRequest}>
          <FaCheck />
        </IconButton>

        <IconButton onClick={handleRejectFriendRequest}>
          <RxCross2 />
        </IconButton>
      </div>
    </div>
  );
}

export default NotificationBox;
