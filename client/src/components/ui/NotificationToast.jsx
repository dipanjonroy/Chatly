import ProfileImage from "./ProfileImage";
import image from "../../assets/avatar.png";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hideNotification,
  showNotification,
} from "../../features/Notification/toastSlice";
import socket from "../../libs/socket";
import { getUserDetails } from "../../features/users/userDetailsSlice";
import { getFriendRequests } from "../../features/users/friendRequestSlice";
import { getFriends } from "../../features/users/friendsSlice";

function NotificationToast() {
  const { visible } = useSelector((store) => store.notification);
  const { user } = useSelector((store) => store.checkAuth);

  const [data, setData] = useState({});

  const dispatch = useDispatch();
  const timeRef = useRef(null);

  const startTime = () => {
    timeRef.current = setTimeout(() => {
      dispatch(hideNotification());
    }, 10000);
  };
  const pauseTime = () => clearTimeout(timeRef.current);
  const resumeTime = () => startTime();

  useEffect(() => {
    if (visible) startTime();
    return () => clearTimeout(timeRef.current);
  }, [visible]);

  useEffect(() => {
    const handleReceiveFriendRequest = ({ fromId }) => {
      dispatch(getUserDetails(fromId))
        .unwrap()
        .then((res) => {
          setData(res);
          dispatch(getFriendRequests())
            .unwrap()
            .then(() => {
              dispatch(showNotification());
            });
        });
    };

    socket.on("receive-friend-request", handleReceiveFriendRequest);

    return () => {
      socket.off("receive-friend-request", handleReceiveFriendRequest);
    };
  }, [dispatch]);

  const handleRejectFriendRequest = () => {
    socket.emit("reject-friend-request", { fromId: user._id, toId: data._id });
    dispatch(getFriendRequests());
    dispatch(hideNotification());
  };

  const handleAcceptFriendRequest = () => {
    socket.emit("accept-friend-request", {
      fromId: user._id,
      toId: data._id,
    });

    dispatch(getFriends());
    dispatch(getFriendRequests());
    dispatch(hideNotification());
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 bg-background px-6 py-4 rounded-xl shadow-md"
      onMouseEnter={pauseTime}
      onMouseLeave={resumeTime}
    >
      <div className="flex items-center gap-3">
        <ProfileImage
          src={data?.profileImage?.url}
          width="w-13"
          height="h-13"
        />
        <div className="leading-4 text-white">
          <h5 className="font-semibold text-[15px]">
            {data?.name?.firstName + " " + data?.name?.lastName}
          </h5>
          <p className="text-sm opacity-50">wants to connect with you</p>
        </div>
      </div>

      <div className="flex items-center gap-2 justify-center mt-2">
        <button
          className="bg-button text-white text-sm px-2 py-1 font-semibold cursor-pointer"
          onClick={handleAcceptFriendRequest}
        >
          Accept
        </button>
        <button
          className="bg-red-600 text-white text-sm px-2 py-1 font-semibold cursor-pointer"
          onClick={handleRejectFriendRequest}
        >
          Reject
        </button>
      </div>
    </div>
  );
}

export default NotificationToast;
