import React, { useContext, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MyDispatchContext, MyUserContext } from "../Config/contexts";
import ax, { authApi, endpoints } from "../Config/APIs";
import "../Template/shine/dist/css/core.min.css";
import "../Template/shine/dist/css/main.min.css";
import APIs from "../Config/APIs";

function Login() {
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [user, setUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(MyUserContext);
  const navigate = useNavigate();

  const updateState = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await APIs.post(endpoints["login"], {
        ...user,
        client_id: "UCMKUhRjIgkzAnQVZjDRkDTNe0WdjhPDO3pF3wn7",
        client_secret:
          "xgPNNlVNFmrXCIzhwihWXS6HuWH2MROKz1lQ9VkiDTl6FqahPa0uuQ368uWp8igtiR0IXIjYsTBXWxr4uJf8I58znouvLXKjEVPcJeEWb97tryN8bV7WXYbcih9alhAG",
        grant_type: "password",
      });

      const accessToken = res.data.access_token;
      await AsyncStorage.setItem("token", accessToken);

      const userRes = await authApi(accessToken).get(endpoints["current-user"]);
      const userData = { ...userRes.data, access_token: accessToken };
      dispatch({ type: "login", payload: userData });
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      window.alert("Đăng nhập thất bại. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterToggle = () => {
    setRegisterOpen(!isRegisterOpen);
  };

  return (
    <main className="user-page">
      <section className="form-user main-section">
        <div className="container">
          <h2 className="main-title">Đăng nhập</h2>
          <form onSubmit={handleLogin}>
            <div className="formWrapper">
              <div className="form-group">
                <label htmlFor="username">
                  Tài khoản<span>*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Tài khoản"
                  value={user.username}
                  onChange={updateState}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  Mật khẩu<span>*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  value={user.password}
                  onChange={updateState}
                />
              </div>
              <div className="form-group">
                <p>Đăng nhập bằng Facebook hoặc Google tại đây</p>
              </div>
              <div className="form-btn">
                <button type="submit">Đăng nhập</button>
              </div>
              <div className="btn-dangky">
                <a href="#" onClick={handleRegisterToggle}>
                  Tạo tài khoản mới
                </a>
              </div>
            </div>
          </form>
        </div>
      </section>

      {isRegisterOpen && <RegisterModal onClose={handleRegisterToggle} />}

      <div id="phoneButton">
        <a href="#">
          <span className="ic">📞</span>
        </a>
      </div>
      <div id="backToTop">⬆️</div>
    </main>
  );
}

function RegisterModal({ onClose }) {
  const [registerData, setRegisterData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register data:", registerData);
    onClose(); // Close the modal after submission
  };

  return (
    <div className="dk-wrapper">
      <h2 className="main-title">Đăng ký</h2>
      <form onSubmit={handleSubmit}>
        <div className="formWrapper">
          <div className="form-group">
            <label>
              Họ và tên<span>*</span>
            </label>
            <input
              type="text"
              name="fullname"
              value={registerData.fullname}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>
              Email<span>*</span>
            </label>
            <input
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>
              Mật khẩu<span>*</span>
            </label>
            <input
              type="password"
              name="password"
              value={registerData.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>
              Nhập lại mật khẩu<span>*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={registerData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="form-btn">
            <button type="submit">Đăng ký</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
