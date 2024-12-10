import { createContext, useContext, useEffect, useState } from "react";
import { MyUserContext } from "./contexts";
import { authApi, endpoints } from "./APIs";

const NotificationContext = createContext();
export const useNotification = () => useContext(NotificationContext);
export const NotificationProvider = ({ children }) => {
  const [notificationItems, setNotificationItems] = useState([]);
  const { user } = useContext(MyUserContext);
  const loadNotificationItem = async () => {
    try {
      const url = `${endpoints["notifications_not_seen"](user.id)}`;
      const res = await authApi(user.access_token).get(url);
      setNotificationItems(res.data.results);
    } catch (ex) {
      console.log(ex);
    }
  };
  const removeItem = (event_id) => {
    setNotificationItems((prevItems) =>
      prevItems.filter((item) => item.event_id !== event_id)
    );
  };
  useEffect(() => {
    if (user && user.access_token) {
      loadNotificationItem();
    }
  }, [user]);

  return (
    <NotificationContext.Provider value={{ notificationItems, removeItem }}>
      {children}
    </NotificationContext.Provider>
  );
};
