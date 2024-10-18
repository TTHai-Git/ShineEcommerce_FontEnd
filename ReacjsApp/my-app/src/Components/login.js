import React, { useState } from "react";
import "../Template/shine/dist/css/core.min.css";
import "../Template/shine/dist/css/main.min.css";
import "../Template/shine/dist/css/main.min.css.map";

function Login() {
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
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
                  value={formData.username}
                  onChange={handleChange}
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
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  name="remember"
                  id="saveAccount"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                <label htmlFor="saveAccount">Lưu tài khoản</label>
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

      {/* Register Modal */}
      {isRegisterOpen && (
        <div className="dk-wrapper" id="creat">
          <h2 className="main-title">Đăng ký</h2>
          <RegisterForm onClose={handleRegisterToggle} />
        </div>
      )}

      <Newsletter />

      <div id="phoneButton">
        <a href="#">
          <span className="ic">📞</span>
        </a>
      </div>
      <div id="backToTop">⬆️</div>
    </main>
  );
}

// Register Form Component
function RegisterForm({ onClose }) {
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
    onClose(); // Close the register modal after submission
  };

  return (
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
  );
}

// Newsletter Component
function Newsletter() {
  return (
    <section className="newsletter py-3">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="heading-wrapper">
              <div className="ic">
                <img src="./img/img-3.png" alt="Newsletter" />
              </div>
              <div className="text">
                <h3>Đăng ký nhận bản tin</h3>
                <p>Đăng ký ngay để nhận thông tin khuyến mãi mới nhất</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-wrapper">
              <input type="text" placeholder="Nhập địa chỉ email" />
              <button type="submit">Đăng ký</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
