import { io } from "socket.io-client";

const URL = "https://chatly-three-eta.vercel.app/api";
//const URL = "http://localhost:3001";

const socket = io(URL, {
  transports: ["websocket"],
  autoConnect: false,
});

export default socket;
