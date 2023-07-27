import React from "react";
import { socket } from "../../SocketIO";
import { Box, Button } from "@mui/material";

const ConnectionManager = () => {
  function connect() {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected");
    });
  }

  function disconnect() {
    socket.disconnect();

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });
  }

  return (
    <Box>
      <Button variant={"outlined"} color="success" onClick={connect}>
        Connect
      </Button>
      <Button
        sx={{ ml: 2 }}
        variant={"outlined"}
        color="error"
        onClick={disconnect}
      >
        Disconnect
      </Button>
    </Box>
  );
};
export default ConnectionManager;
