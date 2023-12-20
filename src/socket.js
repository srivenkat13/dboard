import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production"
    ? "https://dboard-server.onrender.com"
    : "http://localhost:5000";
export const socket = io(URL);
