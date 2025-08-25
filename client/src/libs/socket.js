import { io } from "socket.io-client";

const URL = "https://chatly-6sh0.onrender.com";
//const URL = "http://localhost:3001";

const socket = io(URL, {
  transports: ["websocket"],
  autoConnect: false,
});

export default socket;
