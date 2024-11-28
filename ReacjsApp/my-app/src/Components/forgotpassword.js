import { useState } from "react";
import "../Template/shine/dist/css/core.min.css";
import "../Template/shine/dist/css/main.min.css";
import APIs, { endpoints } from "../Config/APIs";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    token: "",
    new_password: "",
    confirm_new_password: "",
  });
  const updateState = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  const handelChangePassword = async () => {
    setLoading(true);
    if (user.new_password.length < 6 || !user.new_password) {
      alert(
        "Đổi mật khẩu thất bại! Mật khẩu phải có độ dài tối thiểu là 6 ký tự"
      );
    } else {
      if (
        user.confirm_new_password !== user.new_password ||
        !user.confirm_new_password
      ) {
        alert(
          "Đổi mật khẩu thất bại! Mật khẩu xác nhận không khớp với mật khẩu mới"
        );
      } else {
        try {
          const url = `${endpoints["change-password"]}`;
          const res = await APIs.patch(url, {
            new_password: user.new_password,
            token: user.token,
          });
          alert(res.data.message); // Handle message dynamically
          if (res.status === 200) navigate("/login");
        } catch (ex) {
          alert(ex.response?.data?.message || "An error occurred.");
        } finally {
          setLoading(false);
        }
      }
    }
  };
  return (
    <main className="user-page">
      <section className="form-user main-section">
        <div className="container">
          <h2 className="main-title">Quên Mật Khẩu</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handelChangePassword();
            }}
          >
            <div className="formWrapper">
              <div className="form-group">
                <label htmlFor="username">
                  Mã OTP<span>*</span>
                </label>
                <input
                  type="text"
                  name="token"
                  placeholder="Nhập Mã OTP"
                  value={user.token}
                  onChange={updateState}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  Mật khẩu mới<span>*</span>
                </label>
                <input
                  type="password"
                  name="new_password"
                  placeholder="Nhập Mật khẩu"
                  value={user.new_password}
                  onChange={updateState}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  Xác nhận mật khẩu<span>*</span>
                </label>
                <input
                  type="password"
                  name="confirm_new_password"
                  placeholder="Nhập Xác nhận mật khẩu"
                  value={user.confirm_new_password}
                  onChange={updateState}
                />
              </div>
              <div className="form-btn">
                <button type="submit" disabled={loading}>
                  {loading ? "Đang cập nhật mật khẩu..." : "Cập nhật mật khẩu"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};
export default ForgotPassword;
