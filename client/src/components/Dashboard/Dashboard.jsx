import { useDispatch, useSelector } from "react-redux";
import ChatArea from "./ChatArea/ChatArea";
import Profile from "./Profile/Profile";
import Sidebar from "./Sidebar/Sidebar";
import { useEffect } from "react";
import socket from "../../libs/socket";
import { getFriendRequests } from "../../features/users/friendRequestSlice";
import { getFriends } from "../../features/users/friendsSlice";
import { getSentFriendRequests } from "../../features/users/sentRequestSlice";
import { getChatRooms } from "../../features/chat/chatRoomSlice";

function Dashboard() {
  const { showProfile } = useSelector((store) => store.profile);
  const { user } = useSelector((store) => store.checkAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriendRequests());
    dispatch(getFriends());
    dispatch(getSentFriendRequests());
    dispatch(getChatRooms())
  }, [dispatch]);

  const handleSocketConnect = () => {
    socket.emit("user-connected", { userId: user?._id });
  };

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", handleSocketConnect);

    return () => {
      socket.off("connect", handleSocketConnect);
      socket.disconnect();
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-background text-white p-3">
      <div className="flex gap-3 w-full h-full">
        <Sidebar />
        <ChatArea />
        {showProfile && <Profile />}
      </div>
    </div>
  );
}

export default Dashboard;
