import { useEffect, useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";

import FormComponent from "./FormComponent";
import HomeIntro from "./HomeIntro";

// import CircularProgressWithLabel from "../../components/CircularProgressWithLabel";
// import { socketFetch } from "./methods";

const containerStyles: any = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginTop: "1rem",
  padding: "0 2rem",
};

const Home = () => {
  // const [progress, setProgress] = useState(0);

  // useEffect(() => {
  // socketFetch();
  // }, [numberOfEmails, progress]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={containerStyles}
    >
      <HomeIntro />
      <FormComponent />
    </motion.div>
  );
};

export default Home;
