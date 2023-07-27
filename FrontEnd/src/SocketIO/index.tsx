import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL: string =
  process.env.NODE_ENV === "production"
    ? "http://localhost:3001"
    : "http://localhost:3001";

export const socket = io(URL, {
  autoConnect: false,
});
