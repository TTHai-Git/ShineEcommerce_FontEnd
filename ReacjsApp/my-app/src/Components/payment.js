import React, { useState } from "react";
import "../Template/shine/dist/css/core.min.css";
import "../Template/shine/dist/css/main.min.css";
import "../Template/shine/dist/css/main.min.css.map";
import shipment_1 from "../Template/shine/dist/img/shipment-1.png";
import shipment_2 from "../Template/shine/dist/img/shipment-2.png";
import shipment_3 from "../Template/shine/dist/img/shipment-3.png";
import shipment_4 from "../Template/shine/dist/img/shipment-4.png";
import { FaShoppingBasket } from "react-icons/fa";
import { Link } from "react-router-dom";
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
      <section class="shipment-detail py-5">
        <div class="container">
          <h1 class="shine-title">Thông tin giao hàng</h1>
          <div class="row">
            <div class="col-lg-7">
              <div class="box-wrapper">
                <div class="heading">Thông tin cơ bản</div>
                <div class="content">
                  <div class="form-group">
                    <div class="input-group">
                      <input id="sex-1" type="radio" name="sex" />
                      <label for="sex-1">Anh</label>
                    </div>
                    <div class="input-group">
                      <input id="sex-2" type="radio" name="sex" />
                      <label for="sex-2">Chị</label>
                    </div>
                  </div>
                  <div class="form-group">
                    <input type="text" placeholder="Họ tên" />
                  </div>
                  <div class="form-group">
                    <input type="text" placeholder="Email" />
                  </div>
                  <div class="form-group">
                    <input type="text" placeholder="Địa chỉ" />
                  </div>
                  <div class="form-group">
                    <input type="text" placeholder="Số điện thoại" />
                  </div>
                </div>
              </div>
              <div class="box-wrapper">
                <div class="heading">Địa chỉ giao hàng</div>
                <div class="content">
                  <div class="form-group">
                    <div class="select">
                      <select>
                        <option>Tỉnh/ Thành phố</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="select">
                      <select>
                        <option>Quận/ Huyện</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="select">
                      <select>
                        <option>Phường/ Xã</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <textarea placeholder="Ghi chú khác"></textarea>
                  </div>
                </div>
              </div>
              <div class="box-wrapper">
                <div class="heading">Phương thức thanh toán</div>
                <div class="content">
                  <div class="form-group method">
                    <input id="shipment1" type="radio" name="Shipment" />
                    <label for="shipment1">
                      <figure>
                        <div class="ic">
                          <img src={shipment_1} alt="" />
                        </div>
                        <figcaption>
                          <h5>Thanh toán bằng thử ATM nội địa</h5>
                          <p>
                            Thẻ ATM của bạn cần đăng ký sử dụng dịch vụ Internet
                            Banking. Bạn sẽ được quyền chuyển tới OnePay để
                            thanh toán
                          </p>
                        </figcaption>
                      </figure>
                    </label>
                  </div>
                  <div class="form-group method">
                    <input id="shipment2" type="radio" name="Shipment" />
                    <label for="shipment2">
                      <figure>
                        <div class="ic">
                          <img src={shipment_2} alt="" />
                        </div>
                        <figcaption>
                          <h5>Thanh toán thẻ visa, mastercard</h5>
                          <p>
                            Hỗ trợ thẻ VISA, Mastercard, JCB, Amex. Bạn sẽ được
                            chuyển tới OnePay để thanh toán
                          </p>
                        </figcaption>
                      </figure>
                    </label>
                  </div>
                  <div class="form-group method">
                    <input id="shipment3" type="radio" name="Shipment" />
                    <label for="shipment3">
                      <figure>
                        <div class="ic">
                          <img src={shipment_3} alt="" />
                        </div>
                        <figcaption>
                          <h5>Thanh toán khi nhận hàng (COD)</h5>
                          <p>
                            Quý khách sẽ thanh toán bằng tiền mặt khi The Shine
                            Shop giao hàng cho quý khách
                          </p>
                        </figcaption>
                      </figure>
                    </label>
                  </div>
                  <div class="form-group method">
                    <input id="shipment4" type="radio" name="Shipment" />
                    <label for="shipment4">
                      <figure>
                        <div class="ic">
                          <img src={shipment_4} alt="" />
                        </div>
                        <figcaption>
                          <h5>Chuyển khoản</h5>
                          <p>
                            Quý khách thanh toán bằng cách chuyển khoản qua
                            Internet Banking hoặc tại ngân hàng
                          </p>
                        </figcaption>
                      </figure>
                    </label>
                  </div>
                </div>
              </div>
              <div class="box-wrapper">
                <div class="heading">Phương thức giao hàng</div>
                <div class="content">
                  <div class="form-group">
                    <div class="input-group">
                      <input id="shipment-4" type="radio" name="sex" />
                      <label for="shipment-4">Nhận tại cửa hàng</label>
                    </div>
                    <div class="input-group">
                      <input id="shipment-5" type="radio" name="sex" />
                      <label for="shipment-5">Giao hàng tận nơi</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="accept">
                <input id="accept-input" type="checkbox" />
                <label for="accept-input">
                  Tôi đã đọc và đồng ý với
                  <a href="#"> các điều khoản</a>
                </label>
              </div>
              <div class="bottom-wrapper">
                <div class="back">
                  <Link to={"/cart"}>
                    <em class="mdi mdi-reply"></em>Quay lại giỏ hàng
                  </Link>
                </div>
                <div class="done">
                  <a href="#">
                    <FaShoppingBasket /> Thanh Toán
                  </a>
                </div>
              </div>
            </div>
            <div class="col-lg-5">
              <div class="cart-summary">
                <div class="box-wrapper">
                  <div class="heading">
                    Giỏ hàng
                    <Link to={"/cart"}>
                      <em class="fas fa-pencil-alt"></em>
                    </Link>
                  </div>
                  <div class="content">
                    <div class="item">
                      <figure>
                        <div class="image">
                          <img src="./img/pro-1.png" alt="" />
                        </div>
                        <figcaption>
                          <p>
                            <span class="title">
                              Kem Dưỡng Ẩm Miracle Moisture Cream 50ml
                            </span>
                            <span class="price">320.000 ₫</span>
                          </p>
                          <p>
                            <span>Số lượng</span>
                            <span> x1</span>
                          </p>
                          <p>
                            <span>Giảm giá </span>
                            <span>20.000 đ</span>
                          </p>
                        </figcaption>
                      </figure>
                    </div>
                    <div class="item">
                      <figure>
                        <div class="image">
                          <img src="./img/pro-1.png" alt="" />
                        </div>
                        <figcaption>
                          <p>
                            <span class="title">
                              Kem Dưỡng Ẩm Miracle Moisture Cream 50ml
                            </span>
                            <span class="price">320.000 ₫</span>
                          </p>
                          <p>
                            <span>Màu sắc</span>
                            <span> Hồng</span>
                          </p>
                          <p>
                            <span>Số lượng</span>
                            <span> x1</span>
                          </p>
                          <p>
                            <span>Giảm giá </span>
                            <span>20.000 đ</span>
                          </p>
                        </figcaption>
                      </figure>
                    </div>
                    <div class="price-wrapper">
                      <p>
                        <span>Tạm tính</span>
                        <span class="price">1.700.000 ₫</span>
                      </p>
                      <p>
                        <span>VAT</span>
                        <span>0 ₫</span>
                      </p>
                      <p>
                        <span>Phí vận chuyển</span>
                        <span>0 ₫</span>
                      </p>
                      <p class="total">
                        <span>Tổng cộng</span>
                        <span class="price">1.700.000 ₫</span>
                      </p>
                    </div>
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
