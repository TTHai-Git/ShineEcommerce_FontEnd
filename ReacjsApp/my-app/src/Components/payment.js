import React, { useState } from "react";
import "../Template/shine/dist/css/core.min.css";
import "../Template/shine/dist/css/main.min.css";
import "../Template/shine/dist/css/main.min.css.map";
function Payment() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    notes: "",
    city: "",
    district: "",
    ward: "",
    paymentMethod: "",
    shippingMethod: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    if (!userInfo.termsAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }
    alert("Payment successful!");
  };

  return (
    <main>
      <section className="main-breadcrumb">
        <div className="container">
          <ul>
            <li>
              <a href="/">Trang chủ</a>
            </li>
            <li>
              <a href="/cart">Giỏ hàng</a>
            </li>
            <li>
              <a href="/payment">Thông tin giao hàng</a>
            </li>
          </ul>
        </div>
      </section>

      <section className="shipment-detail py-5">
        <div className="container">
          <h1 className="shine-title">Thông tin giao hàng</h1>
          <div className="row">
            <div className="col-lg-7">
              <div className="box-wrapper">
                <div className="heading">Thông tin cơ bản</div>
                <div className="content">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        id="sex-1"
                        type="radio"
                        name="sex"
                        value="Anh"
                        onChange={handleChange}
                      />
                      <label htmlFor="sex-1">Anh</label>
                    </div>
                    <div className="input-group">
                      <input
                        id="sex-2"
                        type="radio"
                        name="sex"
                        value="Chị"
                        onChange={handleChange}
                      />
                      <label htmlFor="sex-2">Chị</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Họ tên"
                      name="name"
                      value={userInfo.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={userInfo.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Địa chỉ"
                      name="address"
                      value={userInfo.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Số điện thoại"
                      name="phone"
                      value={userInfo.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="box-wrapper">
                <div className="heading">Địa chỉ giao hàng</div>
                <div className="content">
                  <div className="form-group">
                    <select
                      name="city"
                      value={userInfo.city}
                      onChange={handleChange}
                    >
                      <option value="">Tỉnh/ Thành phố</option>
                      <option value="HCM">Hồ Chí Minh</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <select
                      name="district"
                      value={userInfo.district}
                      onChange={handleChange}
                    >
                      <option value="">Quận/ Huyện</option>
                      <option value="District 1">Quận 1</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <select
                      name="ward"
                      value={userInfo.ward}
                      onChange={handleChange}
                    >
                      <option value="">Phường/ Xã</option>
                      <option value="Ward 1">Phường 1</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <textarea
                      placeholder="Ghi chú khác"
                      name="notes"
                      value={userInfo.notes}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="box-wrapper">
                <div className="heading">Phương thức thanh toán</div>
                <div className="content">
                  <div className="form-group method">
                    <input
                      id="shipment1"
                      type="radio"
                      name="paymentMethod"
                      value="ATM"
                      onChange={handleChange}
                    />
                    <label htmlFor="shipment1">
                      <h5>Thanh toán bằng thẻ ATM nội địa</h5>
                    </label>
                  </div>
                  <div className="form-group method">
                    <input
                      id="shipment2"
                      type="radio"
                      name="paymentMethod"
                      value="Visa"
                      onChange={handleChange}
                    />
                    <label htmlFor="shipment2">
                      <h5>Thanh toán thẻ visa, mastercard</h5>
                    </label>
                  </div>
                  <div className="form-group method">
                    <input
                      id="shipment3"
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      onChange={handleChange}
                    />
                    <label htmlFor="shipment3">
                      <h5>Thanh toán khi nhận hàng (COD)</h5>
                    </label>
                  </div>
                </div>
              </div>

              <div className="accept">
                <input
                  id="accept-input"
                  type="checkbox"
                  name="termsAccepted"
                  checked={userInfo.termsAccepted}
                  onChange={handleChange}
                />
                <label htmlFor="accept-input">
                  Tôi đã đọc và đồng ý với <a href="#">các điều khoản</a>
                </label>
              </div>

              <div className="bottom-wrapper">
                <button onClick={handleSubmit}>Thanh toán</button>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="cart-summary">
                <div className="box-wrapper">
                  <div className="heading">Giỏ hàng</div>
                  <div className="content">
                    <p>
                      Tổng cộng: <span className="price">1.700.000 ₫</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Payment;
