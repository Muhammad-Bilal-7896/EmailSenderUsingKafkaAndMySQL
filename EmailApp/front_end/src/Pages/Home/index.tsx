import { Box, LinearProgress, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import FormComponent from "./FormComponent";
import HomeIntro from "./HomeIntro";

// Import Socket IO Client
import { socket } from "../../SocketIO";
import Events from "../../components/Events";

import styles from "./style.module.css";

const containerStyles: any = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginTop: "1rem",
  padding: "0 2rem",
};

const Home = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [emailEvents, setEmailEvents] = useState<any>([]);

  const ref: any = useRef<any>(null);

  useEffect(() => {
    socket.connect();

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onEmailEvent(value: any) {
      setEmailEvents((previous: any) => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    // Listen for emailSent event
    socket.on("emailSent", onEmailEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("emailSent", onEmailEvent);
    };
  }, [isConnected, emailEvents]);

  const moveToTop = () => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={containerStyles}
    >
      <div ref={ref}></div>
      {!isConnected ? (
        <Box sx={{ width: "100%" }}>
          <Typography variant="h6">
            Please Wait ⌛ ! Connecting to WebSocket...
          </Typography>
          <LinearProgress sx={{ marginTop: "20px" }} />
        </Box>
      ) : (
        <div>
          <div className={styles.blockEmailSent}>
            <p className={styles.emailSentText}>No. of Emails Sent: </p>{" "}
            <p className={styles.number_emails}>{emailEvents.length}</p>
          </div>

          {/* {emailEvents.length > 0 && <Events events={emailEvents} />} */}
          <HomeIntro />
          <FormComponent moveToTop={moveToTop} />
        </div>
      )}
    </motion.div>
  );
};

export default Home;
