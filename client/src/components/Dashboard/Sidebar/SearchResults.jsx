import { useEffect, useState } from "react";
import profileImg from "../../../assets/5.jpg";
import IconButton from "../../ui/IconButton";
import ProfileImage from "../../ui/ProfileImage";
import { IoPersonAdd } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../../../features/users/userListSlice";
import socket from "../../../libs/socket";
import { getSentFriendRequests } from "../../../features/users/sentRequestSlice";
import { openRoom } from "../../../features/chat/chatRoomSlice";
import { addFriendInfo, getMessages } from "../../../features/chat/messageSlice";

function SearchResult() {
  const [isHover, setIshover] = useState(null);
  const [isIconHover, setIsIconHover] = useState(false);

  const dispatch = useDispatch();

  const { userList } = useSelector((store) => store.userList);
  const { searchValue } = useSelector((store) => store.search);
  const { user } = useSelector((store) => store.checkAuth);
  const { friendsList } = useSelector((store) => store.friends);
  const { friendRequests } = useSelector((store) => store.friendRequest);
  const { sentFriendRequestList } = useSelector(
    (store) => store.sentFriendRequests
  );

  useEffect(() => {
    const trimmed = searchValue.trim();
    const searchKey = trimmed === "" ? "0" : trimmed;

    const delay = setTimeout(() => {
      dispatch(getUserList({ page: 1, limit: 20, keyword: searchKey }));
    }, 300);

    return () => clearTimeout(delay);
  }, [searchValue, dispatch]);

  const isFriendCheck = (id) => {
    const isRequested =
      Array.isArray(sentFriendRequestList) &&
      sentFriendRequestList.some((item) => item._id === id);
    const isGotRequest =
      Array.isArray(friendRequests) &&
      friendRequests.some((item) => item._id === id);
    const isFriend =
      Array.isArray(friendsList) && friendsList.some((item) => item._id === id);

    return isFriend || isGotRequest || isRequested;
  };

  const handleSendFriendRequest = (id) => {
    const confirmation = isFriendCheck(id);
    if (confirmation) return;

    socket.emit("send-friend-request", { fromId: user._id, toId: id });

    dispatch(getSentFriendRequests());
  };

  const createRoom = (id)=>{
    const isAlreadyFriend = isFriendCheck(id);
    if(!isAlreadyFriend) return;

    dispatch(openRoom(id))
      .unwrap()
      .then((res) => {
        dispatch(getMessages(res._id));
        dispatch(addFriendInfo(friend));
        socket.emit("join-room", { chatRoomId: res._id, userId: user._id});
      });
  }

  
  return (
    <>
      {userList.length ? (
        userList.map((p, index) => (
          <div
            key={p._id}
            className={`flex items-center justify-between px-2 py-[9px] cursor-pointer ${
              !isIconHover && "hover:bg-secondary"
            } rounded-lg`}
            onMouseEnter={() => setIshover(index)}
            onMouseLeave={() => setIshover(null)}
            onClick={()=>createRoom(p._id)}
          >
            <div className="flex items-center gap-4">
              <ProfileImage
                src={p.image}
                alt="Profile Image"
                width="w-10"
                height="h-10"
              />
              <div className="leading-4">
                <h5 className="font-semibold text-[15px] ">{p.fullname}</h5>
                {isHover === index && !isFriendCheck(p._id) ? (
                  <p className="text-sm opacity-50">send him connect request</p>
                ) : (
                  ""
                )}

              </div>
            </div>

            {isHover === index && !isFriendCheck(p._id) ? (
              <IconButton
                type="option"
                onMouseEnter={() => setIsIconHover(true)}
                onMouseLeave={() => setIsIconHover(false)}
                onClick={() => handleSendFriendRequest(p._id)}
              >
                <IoPersonAdd size={14} />
              </IconButton>
            ) : (
              ""
            )}
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-full">
          <h2 className="font-inter font-bold text-2xl text-hover">
            No user found
          </h2>
        </div>
      )}
    </>
  );
}

export default SearchResult;
