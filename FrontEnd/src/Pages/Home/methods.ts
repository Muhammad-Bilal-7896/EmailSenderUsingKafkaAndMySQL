export const socketFetch = () => {
  const socket = new WebSocket("ws://localhost:3001");

  socket.onopen = () => {
    console.log("WebSocket connected.");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    console.log("WebSocket message received ===> ", data);
    // if (data.numEmails) {
    //   setNumberOfEmails(data.numEmails);
    // } else {
    //   // Update progress once an email is sent
    //   const percentage = ((progress + 1) / parseInt(numberOfEmails)) * 100;
    //   setProgress(percentage);
    //   setEmailId(
    //     data.emailId ? data.emailId : data.emailId === 0 ? 0 : emailId
    //   );
    // }
  };

  return () => {
    socket.close();
  };
};
