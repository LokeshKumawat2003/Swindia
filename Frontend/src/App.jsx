import axios from "axios";
import PageRoute from "./Allroute/PageRoute";
import Notification from "./components/Notication";
import { useEffect, useState } from "react";

function App() {
  const [showNotification, setShowNotification] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState(true);
  const handleClose = () => {
    setShowNotification(false);
  };
  useEffect(() => {
    axios
      .get("http://localhost:8080/notification")
      .then((response) => {
        let data = response.data;
        const lastNotification = data[data.length - 1];
        setNotificationMessage(lastNotification);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(notificationMessage.title);
  return (
    <>
      <PageRoute />
      <div>
        {showNotification && (
          <Notification
            message={notificationMessage.title}
            type="success"
            onClose={handleClose}
          />
        )}
      </div>
    </>
  );
}

export default App;
