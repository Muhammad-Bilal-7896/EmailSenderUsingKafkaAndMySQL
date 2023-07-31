import { Button, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import SnackBar from "../../../components/SnackBar";

import { styles } from "./styles";

interface PropsFormComponent {
  moveToTop: () => void;
}

const FormComponent = ({ moveToTop }: PropsFormComponent) => {
  // SnackBar
  const [snackBarHandler, setSnackBarHandler] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // numEmails
  const [numEmails, setNumEmails] = useState("");

  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendClick = async () => {
    moveToTop();

    if (!numEmails) {
      setSnackBarHandler(
        // Spread the previous state
        {
          ...snackBarHandler,
          open: true,
          message: `Please Enter the number of Emails to Continue`,
          severity: "error",
        }
      );
      return;
    }

    try {
      setLoading(true);

      let emailId = "example@gmail.com";
      let subject =
        "NEST JS + KAFKA + MYSQL + SOCKET IO FULL STACK DEVELOPMENT";
      let body = `<div>
      <h1>Full stack Development with NEST JS</h1>
      <p>
      NEST JS is a full stack development framework
      </p>
      </div>`;

      let EmailBody = {
        to: emailId,
        numEmails: parseInt(numEmails),
        subject: subject,
        body: body,
      };

      let url = "http://localhost:3001/email/produceEmail";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(EmailBody),
      });

      const data = await response.json();

      console.log("Success:", data);

      if (data.status === 200) {
        setSnackBarHandler(
          // Spread the previous state
          {
            ...snackBarHandler,
            open: true,
            message: `${numEmails} Emails are being Sent to ${emailId} Email ID`,
            severity: "success",
          }
        );

        setStatus("Sending...");
      }
    } catch (error) {
      alert("Error Sending Emails");
      console.error("Error sending emails:", error);

      setSnackBarHandler(
        // Spread the previous state
        {
          ...snackBarHandler,
          open: true,
          message: `Error Sending Emails`,
          severity: "error",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const submitForm = () => {
    moveToTop();

    setTimeout(() => {
      handleSendClick();
    }, 1000);
  };

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <div>
          <TextField
            type="number"
            label="Number of Emails"
            variant="standard"
            value={numEmails}
            onChange={(e) => setNumEmails(e.target.value)}
            sx={styles.inputStyles}
            fullWidth
          />
        </div>
        <br />
      </form>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Button
          variant="contained"
          onClick={submitForm}
          disabled={loading}
          sx={styles.buttonStyles}
        >
          {loading ? `Sending Emails ...` : "Send Emails"}
        </Button>
      </motion.div>
      {loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={styles.statusStyles}
        >
          <Typography variant="body1">Status: {status}</Typography>
        </motion.div>
      )}

      <SnackBar
        isOpen={snackBarHandler.open}
        message={snackBarHandler.message}
        severity={snackBarHandler.severity}
        setIsOpen={(isOpen: boolean) =>
          setSnackBarHandler({ ...snackBarHandler, open: isOpen })
        }
      />
    </div>
  );
};
export default FormComponent;
