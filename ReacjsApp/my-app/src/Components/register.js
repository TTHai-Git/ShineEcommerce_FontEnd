import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Template/shine/dist/css/core.min.css";
import "../Template/shine/dist/css/main.min.css";
import APIs, { endpoints } from "../Config/APIs";
import moment from "moment";

function Register() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    role: "Khách Hàng",
    avatar: null,
    dob: "", // Initialize dob as an empty string
  });
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    if (user.password !== user.confirmPassword) setErr(true);
    else {
      setErr(false);

      let form = new FormData();
      for (let key in user) {
        if (key === "avatar" && user.avatar) {
          form.append("avatar", user.avatar); // Append avatar file directly
        } else if (key !== "confirmPassword") {
          form.append(key, user[key]);
        }
      }
      console.log(form);
      try {
        setIsLoading(true);
        let res = await APIs.post(endpoints["register"], form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.status === 201) {
          alert("Thành công", "Tạo tài khoản thành công");
          navigate("/login");
        }
      } catch (ex) {
        console.error(ex);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files && files[0]) {
      setUser((prev) => ({ ...prev, avatar: files[0] }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <main>
      <section className="form-user main-section">
        <div className="container">
          <h2 className="main-title">Đăng ký</h2>
          <form onSubmit={handleSubmit}>
            <div className="formWrapper">
              <div className="form-group">
                <label>
                  Họ<span>*</span>
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={user.last_name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>
                  Tên<span>*</span>
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={user.first_name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>
                  Ngày Sinh<span>*</span>
                </label>
                <input
                  type="date"
                  name="dob"
                  value={moment(user.dob).format("YYYY-MM-DD")}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>
                  Số Điện Thoại<span>*</span>
                </label>
                <input
                  type="number"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>
                  Địa Chỉ<span>*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={user.address}
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
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>
                  Tên Tài Khoản<span>*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={user.username}
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
                  value={user.password}
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
                  value={user.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Ảnh đại diện</label>
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>
              <div className="form-btn">
                <button type="submit" disabled={isLoading}>
                  {isLoading ? "Đang đăng ký..." : "Đăng ký"}
                </button>
              </div>
              <div className="btn-dangky">
                <Link to="/login">Quay Trở Về Đăng Nhập</Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Register;
