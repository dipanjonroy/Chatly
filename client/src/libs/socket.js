import { io } from "socket.io-client";

//const URL = "https://real-time-chat-beryl.vercel.app/api";
const URL = "http://localhost:3001";

const socket = io(URL, {
  transports: ["websocket"],
  autoConnect: false,
});

export default socket;
