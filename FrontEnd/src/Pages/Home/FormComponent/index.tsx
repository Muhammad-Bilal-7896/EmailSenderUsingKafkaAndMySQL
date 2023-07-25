import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import SnackBar from "../../../components/SnackBar";

import { styles } from "./styles";

const FormComponent = () => {
  ///////////////////////////////// Snackbar State /////////////////////////////////
  const [snackBarHandler, setSnackBarHandler] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  ///////////////////////////////// Snackbar State /////////////////////////////////

  // Data For API
  const [emailId, setEmailId] = useState<string>("");
  const [numEmails, setNumEmails] = useState("");
  const [emailSubject, setEmailSubject] = useState<string>("");
  const [emailText, setEmailText] = useState<string>("");
  const [emailHtml, setEmailHtml] = useState<string>("");
  //

  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendClick = async () => {
    if (!emailId || !numEmails || !emailSubject || !emailText || !emailHtml) {
      setSnackBarHandler(
        // Spread the previous state
        {
          ...snackBarHandler,
          open: true,
          message: `Please Fill All Fields`,
          severity: "error",
        }
      );
      return;
    }

    try {
      setLoading(true);

      let url = "http://localhost:3001/email/produceEmail";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: emailId,
          numEmails: parseInt(numEmails),
          subject: emailSubject,
          text: emailText,
          html: `<div>${emailHtml}</div>`,
        }),
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
        <div>
          <TextField
            type="text"
            label="Send Email to"
            variant="standard"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            sx={styles.inputStyles}
            fullWidth
          />
        </div>
        <br />
        <div>
          <TextField
            type="text"
            label="Subject"
            variant="standard"
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
            sx={styles.inputStyles}
            fullWidth
          />
        </div>
        <br />
        <div>
          <TextField
            type="text"
            label="Email Text"
            variant="standard"
            multiline
            rows={4}
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            sx={styles.inputStyles}
            fullWidth
          />
        </div>

        <div>
          <TextField
            type="text"
            label="Email Body"
            variant="standard"
            multiline
            rows={4}
            value={emailHtml}
            onChange={(e) => setEmailHtml(e.target.value)}
            sx={styles.inputStyles}
            fullWidth
          />
        </div>
      </form>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Button
          variant="contained"
          onClick={handleSendClick}
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
        setIsOpen={
          // Only pass the setIsOpen function to the SnackBar component
          // and not the whole state object
          (isOpen: boolean) =>
            setSnackBarHandler({ ...snackBarHandler, open: isOpen })
        }
      />
    </div>
  );
};
export default FormComponent;
