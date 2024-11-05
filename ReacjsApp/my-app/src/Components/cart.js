import React from "react";
import "../Template/shine/dist/css/core.min.css";
import "../Template/shine/dist/css/main.min.css";
import { Link } from "react-router-dom";
import img_pro_3 from "../Template/shine/dist/img/pro-3.png";
import { FaShoppingBasket } from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css";
function Cart() {
  return (
    <main>
      <section className="the-shine-shop-cart py-5">
        <div className="container">
          <h1 className="shine-title">Giỏ hàng</h1>
          <div className="main-table">
            <table>
              <thead>
                <tr>
                  <th>Sản Phẩm</th>
                  <th>Số lượng</th>
                  <th>Giảm giá</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="name">
                    <div className="image">
                      <img src={img_pro_3} alt="" />
                    </div>
                    <div className="name-product">
                      <h3>Kem Dưỡng Ẩm Miracle Moisture Cream 50ml</h3>
                      <div className="delete-product">
                        <a href="#">
                          <em className="mdi mdi-plus-circle-outline"></em>
                          <span>Xoá</span>
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="amount">
                    <div className="quantity-box">
                      <button>-</button>
                      <input type="text" value="1" />
                      <button>+</button>
                    </div>
                  </td>
                  <td className="discount">20.000 đ</td>
                  <td className="total">320.000 ₫</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="main-total-amount">
            <div className="box-amount">
              <div className="totalamount">
                <p>Tạm tính</p>
                <span className="price">1.700.000 ₫</span>
              </div>
              <div className="totalamount">
                <p>Phí vận chuyển</p>
                <span className="price">0 ₫</span>
              </div>
              <div className="totalamount">
                <p>Cần thanh toán</p>
                <span className="total">1.700.000 ₫</span>
              </div>
            </div>
          </div>
          <div className="main-discount">
            <div className="box-discount">
              <div className="title">
                <h5>Sử dụng mã giảm giá</h5>
              </div>
              <div className="form-group">
                <input placeholder="Nhập mã khuyến mãi" />
                <button>ÁP DỤNG</button>
              </div>
            </div>
          </div>
          <div className="order-now">
            <button>
              <Link to="/payment">
                <FaShoppingBasket /> Tiến Hành Đặt Hàng
              </Link>
            </button>
          </div>
        </div>
      </section>

      <div id="phoneButton">
        <a href="#">
          <span className="ic">
            <em className="mdi mdi-phone"></em>
          </span>
        </a>
      </div>
      <div id="backToTop">
        <em className="mdi mdi-arrow-up"></em>
      </div>
    </main>
  );
}

export default Cart;
