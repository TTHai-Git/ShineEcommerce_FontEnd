import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MyDispatchContext } from "../Config/contexts";
import APIs, { authApi, endpoints } from "../Config/APIs";
import { facebookProvider, googleProvider } from "../Config/authMethods";
import socialMediaAuth from "../service/auth";
import "../Template/shine/dist/css/core.min.css";
import "../Template/shine/dist/css/main.min.css";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const [error, setError] = useState(""); // For error handling
  const dispatch = useContext(MyDispatchContext);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  const CLIENT_ID_HAI = process.env.REACT_APP_CLIENT_ID_HAI;
  const CLIENT_SECRET_HAI = process.env.REACT_APP_CLIENT_SECRET_HAI;

  const updateState = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // console.log(CLIENT_ID_HAI);
      // console.log(CLIENT_SECRET_HAI);
      const res = await APIs.post(endpoints["login"], {
        ...user,
        client_id: CLIENT_ID_HAI,
        client_secret: CLIENT_SECRET_HAI,
        grant_type: "password",
      });

      const accessToken = res.data.access_token;
      await AsyncStorage.setItem("token", accessToken);

      const userRes = await authApi(accessToken).get(endpoints["current-user"]);
      const userData = { ...userRes.data, access_token: accessToken };
      dispatch({ type: "login", payload: userData });
      navigate(redirectTo);
    } catch (error) {
      console.error("Login failed:", error);
      window.alert("Đăng nhập thất bại. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const handleOnClick = async (provider) => {
    setSocialLoading(true);
    try {
      const res = await socialMediaAuth(provider);
      console.log(res);
      const userData = {
        uid: res.uid,
        username: res.displayName,
        email: res.email,
        access_token: res.accessToken, // Use the token here if available
      };
      dispatch({ type: "login", payload: userData });
      navigate(redirectTo);
    } catch (error) {
      console.error("Social login failed:", error);
      setError("Đăng nhập bằng mạng xã hội thất bại. Vui lòng thử lại!");
    } finally {
      setSocialLoading(false);
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
              <div className="form-btn">
                <button type="submit" disabled={loading}>
                  {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>
              </div>
              {error && <div className="error">{error}</div>}{" "}
              {/* Display error */}
              <div className="btn-dangky">
                <Link to="/register">Tạo tài khoản mới</Link>
              </div>
              <p>Đăng nhập bằng Facebook hoặc Google tại đây</p>
              <button
                type="button"
                onClick={() => handleOnClick(facebookProvider)}
                disabled={socialLoading}
              >
                {socialLoading
                  ? "Đang đăng nhập..."
                  : "Đăng Nhập Bằng Facebook"}
              </button>
              <button
                type="button"
                onClick={() => handleOnClick(googleProvider)}
                disabled={socialLoading}
              >
                {socialLoading ? "Đang đăng nhập..." : "Đăng Nhập Bằng Google"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Login;
