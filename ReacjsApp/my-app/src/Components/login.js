import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MyDispatchContext } from "../Config/contexts";
import { authApi, endpoints } from "../Config/APIs";
import "../Template/shine/dist/css/core.min.css";
import "../Template/shine/dist/css/main.min.css";
import APIs from "../Config/APIs";

function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useContext(MyDispatchContext);
  const navigate = useNavigate();
  // const CLIENT_ID_HAI = process.env.CLIENT_ID_HAI;
  // const CLIENT_SECRET_HAI = process.env.CLIENT_SECRET_HAI;

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

        // ...user,
        // client_id: CLIENT_ID_HAI,
        // client_secret: CLIENT_SECRET_HAI,
        // grant_type: "password",
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
                <Link to="/register">Tạo tài khoản mới</Link>
              </div>
            </div>
          </form>
        </div>
      </section>

      <div id="phoneButton">
        <a href="#">
          <span className="ic">📞</span>
        </a>
      </div>
      <div id="backToTop">⬆️</div>
    </main>
  );
}

export default Login;
