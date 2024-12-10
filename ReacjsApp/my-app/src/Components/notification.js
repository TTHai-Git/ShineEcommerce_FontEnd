import { Link, useNavigate, useParams } from "react-router-dom";
import "../Template/shine/dist/css/core.min.css";
import "../Template/shine/dist/css/main.min.css";
import { useContext, useEffect, useState } from "react";
import { authApi, endpoints } from "../Config/APIs";
import { MyUserContext } from "../Config/contexts";
import { useNotification } from "../Config/NotificationContext";

const Notification = () => {
  const { user_id } = useParams();
  const { user } = useContext(MyUserContext);
  const [notificationItems, setNotificationItems] = useState([]); // Manage local state
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [endPage, setEndPage] = useState(false);
  const { removeItem } = useNotification();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    // Fetch notifications (example endpoint)
    let url = `${endpoints["get_notifications"](user_id)}?page=${page}`;
    try {
      setLoadingPage(true);
      const res = await authApi(user.access_token).get(url);
      const events = res.data.results || [];
      setEndPage(res.data.next === null);
      setNotificationItems((prev) =>
        page === 1 ? events : [...prev, ...events]
      );
      navigate(`/users/${user_id}/notifications/?page=${page}`);
    } catch (ex) {
      console.error("Error fetching notifications:", ex);
    } finally {
      setLoadingPage(false);
    }
  };

  const updateSeenStatusOfEvent = async (event_id) => {
    try {
      setLoading(true);
      const url = `${endpoints["update_seen_status"](event_id)}`;
      const res = await authApi(user.access_token).post(url);
      handleRemoveItem(event_id);

      // Alert the user on successful update
      alert(res.data.message);

      // Update the specific notification's status in local state
      setNotificationItems((prevItems) =>
        prevItems.map((item) =>
          item.event_id === event_id
            ? { ...item, event_status_seen: true }
            : item
        )
      );
    } catch (ex) {
      console.error("Error updating seen status:", ex);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = (event_id) => {
    removeItem(event_id);
  };

  useEffect(() => {
    fetchNotifications(); // Fetch notifications on component mount
  }, [page]);

  return (
    <main>
      <section className="main-section about-1">
        <div className="container">
          <h1>Các sự kiện đáng quan tâm</h1>
          <div className="notification-list">
            {notificationItems.length > 0 ? (
              notificationItems.map((item) => (
                <div
                  key={item.event_id}
                  className="notification-item"
                  style={{
                    ...styles.notificationItem,
                    backgroundColor: item.event_status_seen
                      ? "#e8f5e9" // Seen background color
                      : "#ffecec", // Unseen background color
                  }}
                >
                  <button
                    onClick={() => updateSeenStatusOfEvent(item.event_id)}
                    style={styles.button}
                    disabled={loading || item.event_status_seen}
                  >
                    {loading && !item.event_status_seen
                      ? "Đang xử lý..."
                      : item.event_status_seen
                      ? "Đã xem"
                      : "Đánh dấu đã xem"}
                  </button>

                  <img
                    src={item.event_image}
                    alt={item.event_title}
                    style={styles.image}
                  />

                  <div className="notification-content" style={styles.content}>
                    <h3 style={styles.title}>
                      {item.event_title} - Ngày tạo:{" "}
                      {new Date(item.event_created_date).toLocaleString()}
                    </h3>
                    <p
                      dangerouslySetInnerHTML={{ __html: item.event_content }}
                      style={styles.description}
                    ></p>
                    <p style={styles.dates}>
                      Từ: {new Date(item.event_started_time).toLocaleString()} -{" "}
                      Đến: {new Date(item.event_ended_time).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>Không có thông báo nào.</p>
            )}
          </div>
          <div className="button">
            {endPage ? (
              <Link
                className="view-more-button"
                to="#"
                onClick={() => setPage(1)}
              >
                Thu gọn
              </Link>
            ) : (
              <Link
                className="view-more-button"
                to="#"
                onClick={() => setPage((prevPage) => prevPage + 1)}
                disabled={loadingPage} // Disable button if loading
              >
                {loadingPage ? "Đang tải..." : "Xem thêm"}
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

const styles = {
  notificationItem: {
    display: "flex",
    alignItems: "flex-start",
    position: "relative",
    marginBottom: "20px",
    padding: "20px",
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  button: {
    position: "absolute",
    top: "15px",
    right: "15px",
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#4caf50",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "background-color 0.2s ease, transform 0.2s ease",
  },
  buttonHover: {
    backgroundColor: "#45a045",
    transform: "scale(1.05)",
  },
  image: {
    width: "100px",
    height: "100px",
    borderRadius: "10px",
    objectFit: "cover",
    marginRight: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  title: {
    margin: "0 0 10px 0",
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
  },
  description: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "10px",
    lineHeight: "1.5",
  },
  dates: {
    fontSize: "12px",
    color: "#999",
    marginTop: "10px",
    fontStyle: "italic",
  },
};

export default Notification;
