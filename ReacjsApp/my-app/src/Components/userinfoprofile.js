import React, { useState, useContext, useEffect } from "react";
import "../Template/shine/dist/css/core.min.css";
import "../Template/shine/dist/css/main.min.css";
import "../Template/shine/dist/css/UserInfoProfile.css";
import { MyDispatchContext, MyUserContext } from "../Config/contexts";
import {
  FaEdit,
  FaCamera,
  FaEnvelope,
  FaPhoneAlt,
  FaHome,
  FaCalendar,
  FaMars,
} from "react-icons/fa";
import { authApi, endpoints } from "../Config/APIs";
import { logOut } from "../Config/reducers";
import { useNavigate } from "react-router-dom";

const UserInfoProfile = () => {
  const { user } = useContext(MyUserContext);
  const [loading, setLoading] = useState(false);
  const dispatch = useContext(MyDispatchContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files[0]) {
      const reader = new FileReader();
      reader.onload = () => setFormData({ ...formData, avatar: reader.result });
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Updated User Data:", formData);
    updateInfo();
  };

  const updateInfo = async () => {
    let form = new FormData();
    for (let key in formData) {
      if (key !== "confirm") {
        // Handle the password field separately
        if (key === "password" && formData.password !== "") {
          form.append(key, formData[key]);
        } else if (key !== "password") {
          form.append(key, formData[key]);
        }
      }
    }

    setLoading(true);
    try {
      let res = await authApi(formData.access_token).patch(
        endpoints["current-user"],
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data.message);
      alert(res.data.message);
      logOut(dispatch);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        alert("Error", error.response.data.message);
      } else {
        console.log("Unexpected error: ", error);
        alert("Error", "Failed to register study.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {}, [user]);

  const InfoItem = ({ label, value, icon }) => (
    <div className="profile-info-item">
      <span className="profile-info-label">
        {icon} {label}:
      </span>
      <span className="profile-info-value">{value}</span>
    </div>
  );

  return (
    <main>
      <div className="profile-container">
        <div className="profile-card">
          {isEditing ? (
            <>
              <div className="profile-header">
                <label htmlFor="avatar-upload">
                  <img
                    src={formData.avatar}
                    alt="User Avatar"
                    className="profile-avatar editable-avatar"
                  />
                  <input
                    type="file"
                    id="avatar-upload"
                    name="avatar"
                    accept="image/*"
                    onChange={handleChange}
                    style={{ display: "none" }}
                  />
                  <FaCamera className="avatar-icon" />
                </label>
                <h1 className="profile-name">
                  {formData.last_name} {formData.first_name}
                </h1>
              </div>
              <div className="profile-body">
                <InfoField
                  label="First Name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
                <InfoField
                  label="Last Name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
                <InfoField
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                <InfoField
                  label="Date of Birth"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  type="date"
                />
                <InfoField
                  label="Gender"
                  name="sex"
                  value={formData.sex ? "Male" : "Female"}
                  onChange={(e) =>
                    handleChange({
                      target: { name: "sex", value: e.target.value === "Male" },
                    })
                  }
                />
                <InfoField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
                <InfoField
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <InfoField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-footer">
                <button
                  className="profile-btn edit-btn"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? "Đăng cập nhật thông tin" : "Save"}
                </button>
                <button
                  className="profile-btn delete-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="profile-header">
                <img
                  src={formData.avatar}
                  alt="User Avatar"
                  className="profile-avatar"
                />
                <h1 className="profile-name">
                  {formData.last_name} {formData.first_name}
                </h1>
                <p className="profile-username">@{formData.username}</p>
              </div>
              <div className="profile-body">
                <InfoItem
                  label="Date of Birth"
                  value={formData.dob}
                  icon={<FaCalendar />}
                />
                <InfoItem
                  label="Gender"
                  value={formData.sex ? "Male" : "Female"}
                  icon={<FaMars />}
                />
                <InfoItem
                  label="Address"
                  value={formData.address}
                  icon={<FaHome />}
                />
                <InfoItem
                  label="Phone"
                  value={formData.phone}
                  icon={<FaPhoneAlt />}
                />
                <InfoItem
                  label="Email"
                  value={
                    <a
                      href={`mailto:${formData.email}`}
                      className="profile-link"
                    >
                      {formData.email}
                    </a>
                  }
                  icon={<FaEnvelope />}
                />
              </div>
              <div className="profile-footer">
                <button
                  className="profile-btn edit-btn"
                  disabled={loading}
                  onClick={() => setIsEditing(true)}
                >
                  <FaEdit />
                  {loading ? "Đang cập nhật thông tin" : "Edit Profile"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

const InfoField = ({ label, name, value, onChange, type = "text", icon }) => (
  <div className="profile-info-item">
    <label htmlFor={name} className="profile-info-label">
      {icon} {label}:
    </label>
    <input
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      className="profile-info-value editable-input"
    />
  </div>
);

export default UserInfoProfile;
