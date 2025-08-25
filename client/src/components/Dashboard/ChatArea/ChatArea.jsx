import ProfileImage from "../../ui/ProfileImage";
import profileImg from "../../../assets/avatar.png";
import IconButton from "../../ui/IconButton";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleNotificationBox,
  setShowProfile,
  closeNotificationBox,
} from "../../../features/profile/profileSlice";
import Chats from "./Chats";
import TypeChat from "./TypeChat";
import { RiAccountCircleFill } from "react-icons/ri";
import { logOut } from "../../../features/auth/logOutSlice";
import { useNavigate } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import NotificationBox from "../Profile/Notification";
import { useEffect, useRef } from "react";

function ChatArea() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notificationRef = useRef();

  const { showNotificationBox } = useSelector((store) => store.profile);
  const { friendRequests } = useSelector((store) => store.friendRequest);
  const { user } = useSelector((store) => store.userDetails);
  const { friendInfo } = useSelector((store) => store.message);

  const handleLogOut = () => {
    dispatch(logOut())
      .unwrap()
      .then(() => {
        navigate("/login");
      });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        dispatch(closeNotificationBox());
      }
    };

    if (showNotificationBox) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, [showNotificationBox, dispatch]);

  const isFriendInfoAvailable = friendInfo && Object.keys(friendInfo).length > 0;

  return (
    <div className="flex-1 h-full bg-primary rounded-xl p-2 flex flex-col justify-between">
      <div className="flex items-center justify-between pe-2 pb-2">
        <div className="flex items-center gap-4 p-2 hover:bg-secondary cursor-pointer rounded-lg">
          {friendInfo && friendInfo?.name ? (
            <>
              <ProfileImage
                src={friendInfo?.profileImage || profileImg}
                alt="Profile Image"
                width="w-10"
                height="h-10"
              />
              <div className="flex flex-col">
                <h5 className="font-semibold text-[15px] ">
                  {friendInfo?.name}
                </h5>
                {friendInfo?.isOnline && (
                  <span className="text-xs">Active Now</span>
                )}
              </div>
            </>
          ) : (
            <div></div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="relative inline-block">
              <IconButton onClick={() => dispatch(toggleNotificationBox())}>
                <IoIosNotifications size={20} />
              </IconButton>

              {friendRequests.length > 0 && (
                <div className="absolute top-0 right-0 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-[10px]">
                  {friendRequests.length}
                </div>
              )}
            </div>
            {showNotificationBox && (
              <div
                className="max-h-[450px] bg-secondary overflow-y-auto scrollBar rounded-md absolute right-0 mt-1 w-[400px] shadow-lg"
                ref={notificationRef}
              >
                {friendRequests.map((item, index) => (
                  <div key={item._id}>
                    <NotificationBox person={item} index />
                  </div>
                ))}
              </div>
            )}
          </div>

          <IconButton
            onClick={() => {
              dispatch(setShowProfile(true));
              dispatch(closeNotificationBox());
            }}
          >
            <RiAccountCircleFill size={20} />
          </IconButton>

          <IconButton onClick={handleLogOut}>
            <FiLogOut size={20} />
          </IconButton>
        </div>
      </div>

      <div className="px-2 flex-1 h-full overflow-y-auto scrollBar">
        <Chats />
      </div>
      {isFriendInfoAvailable && (
        <div className="">
          <TypeChat />
        </div>
      )}
    </div>
  );
}

export default ChatArea;
