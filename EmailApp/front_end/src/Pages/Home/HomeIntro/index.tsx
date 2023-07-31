import { Typography } from "@mui/material";
import style from "./style.module.css";

const HomeIntro = () => {
  const styles = {
    titleStyles: {
      fontSize: "2rem",
      marginTop: "1rem",
    },
    descriptionStyles: {
      textAlign: "left",
      fontSize: "1.2rem",
    },
  };

  return (
    <div>
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={styles.titleStyles}
      >
        Email Sender App
      </Typography>

      <Typography variant="body1" gutterBottom sx={styles.descriptionStyles}>
        This app will send a specified number of emails to a specified email
        address. The emails will be sent in the background using a worker
        thread. The status of the job will be displayed below. We will use kafka
        to optimize the performance of the app. The database My SQL will be used
        to store the data of the emails sent.
      </Typography>

      {/* <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={styles.titleStyles}
      >
        Technologies Used
      </Typography>

      <ol className={style.technologiesList}>
        <li>React</li>
        <li>Material UI</li>
        <li>Nest JS</li>
        <li>Kafka</li>
        <li>My SQL</li>
      </ol> */}
    </div>
  );
};
export default HomeIntro;
