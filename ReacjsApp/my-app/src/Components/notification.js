import { useParams } from "react-router-dom";
import "../Template/shine/dist/css/core.min.css";
import "../Template/shine/dist/css/main.min.css";
const Notification = () => {
  const { user_id } = useParams();
  return (
    <main>
      <section className="main-section about-1">
        <div className="container">
          <h1>Đây là trang thông báo của user_id = {user_id}</h1>
        </div>
      </section>
    </main>
  );
};
export default Notification;
