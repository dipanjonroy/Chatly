import ProfileImage from "../../ui/ProfileImage";
import profileImg from "../../../assets/5.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import socket from "../../../libs/socket";
import {
  addMessage,
  markMessageAsRead,
  updateMessage,
} from "../../../features/chat/messageSlice";
import {
  addLastMessage,
  addMessageSeen,
  getChatRooms,
} from "../../../features/chat/chatRoomSlice";

function Chats() {
  const { showProfile } = useSelector((store) => store.profile);

  const { messages, friendInfo } = useSelector((store) => store.message);
  const { user } = useSelector((store) => store.checkAuth);
  const { lastMessage } = useSelector((store) => store.chatRoom);

  const dispatch = useDispatch();
  const bottomRef = useRef();

  useEffect(() => {
    socket.on("message-sent", ({ tempId, msg }) => {
      dispatch(updateMessage({ tempId, msg }));
      const lastMessage = {
        content: msg.message,
        sender: msg.sender._id,
        readBy: msg.readBy,
        timestamp: msg.timestamp,
      };

      dispatch(addLastMessage({chatRoomId: msg.chatRoom, lastMessage}))
    });

    return () => {
      socket.off("message-sent");
    };
  }, [dispatch]);

  useEffect(() => {
    const handleReceiveMessage = ({ msg, friendId, chatRoomId }) => {
      
      dispatch(addMessage(msg));
      
      dispatch(getChatRooms());
    };
    socket.on("receive-message", handleReceiveMessage);

    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, [dispatch]);

  useEffect(() => {
    const handleMessageRead = ({ chatRoomId, friendId }) => {
      dispatch(addMessageSeen({ chatRoomId, userId: friendId }));
      dispatch(markMessageAsRead({ senderId: friendId }));

      
    };

    socket.on("message-seen", handleMessageRead);

    return () => {
      socket.off("message-seen", handleMessageRead);
    };
  }, [dispatch]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const lastMessageSeenByFriend = messages
    .filter(
      (m) =>
        m.readBy.some((r) => r.userId === friendInfo._id) &&
        m.sender._id === user._id
    )
    .sort((a, b) => {
      const aReadTime = a.readBy.find(
        (r) => r.userId === friendInfo._id
      ).readAt;
      const bReadTime = b.readBy.find(
        (r) => r.userId === friendInfo._id
      ).readAt;
      return new Date(aReadTime) - new Date(bReadTime);
    })
    .pop();

  const isFriendInfoAvailable =
    friendInfo && Object.keys(friendInfo).length > 0;
  return (
    <div className="h-full">
      {isFriendInfoAvailable &&
        messages.map((item, index) => (
          <div className="flex justify-between" key={item._id}>
            <div>
              {item.sender?._id !== user._id && (
                <div className="flex items-center gap-2 mt-2">
                  <ProfileImage
                    src={item?.sender?.profileImage?.url}
                    width="w-7"
                    height="h-7"
                  />
                  <p
                    className={`bg-secondary px-2 py-2 rounded-lg ${
                      showProfile ? "max-w-[350px]" : "max-w-[500px]"
                    }  break-words`}
                  >
                    {item.message}
                  </p>
                </div>
              )}
            </div>

            <div className="relative">
              {item.sender?._id === user._id && (
                <div className="flex flex-col items-end gap-2 mt-2 ">
                  <p
                    className={`bg-button px-2 py-2 rounded-lg ${
                      showProfile ? "max-w-[300px]" : "max-w-[500px]"
                    }  break-words`}
                  >
                    {item.message}
                  </p>
                  {item._id === lastMessageSeenByFriend._id && (
                    <div className="absolute right-0 bottom-[-6px]">
                      <ProfileImage
                        src={friendInfo?.profileImage}
                        width="w-3"
                        height="h-3"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      <div ref={bottomRef} />
    </div>
  );
}

export default Chats;
