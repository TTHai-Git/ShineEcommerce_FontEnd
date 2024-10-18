import React from "react";
import "../Template/shine/dist/css/core.min.css";
import "../Template/shine/dist/css/main.min.css";
import "../Template/shine/dist/css/main.min.css.map";
import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
function Cart() {
  return (
    <main class="cart-page">
      <section class="main-breadcrumb">
        <div class="container">
          <ul>
            <li>
              <a href="#">Trang chủ</a>
            </li>
            <li>
              <a href="#">Giỏ hàng</a>
            </li>
          </ul>
        </div>
      </section>
      <section class="the-shine-shop-cart py-5">
        <div class="container">
          <h1 class="shine-title">Giỏ hàng</h1>
          <div class="main-table">
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
                  <td class="name">
                    <div class="image">
                      <img src="./img/pro-1.png" alt="" />
                    </div>
                    <div class="name-product">
                      <h3>Kem Dưỡng Ẩm Miracle Moisture Cream 50ml</h3>
                      <div class="delete-product">
                        <a href="#">
                          <em class="mdi mdi-plus-circle-outline"></em>
                          <span>Xoá</span>
                        </a>
                      </div>
                    </div>
                  </td>
                  <td class="amount">
                    <div class="quantity-box">
                      <button>-</button>
                      <input type="text" value="1" />
                      <button>+</button>
                    </div>
                  </td>
                  <td class="discount">20.000 đ</td>
                  <td class="total">320.000 ₫</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="main-total-amount">
            <div class="box-amount">
              <div class="totalamount">
                <p>Tạm tính</p>
                <span class="price">1.700.000 ₫</span>
              </div>
              <div class="totalamount">
                <p>Phí vận chuyển</p>
                <span class="price">0 ₫</span>
              </div>
              <div class="totalamount">
                <p>Cần thanh toán</p>
                <span class="total">1.700.000 ₫</span>
              </div>
            </div>
          </div>
          <div class="main-discount">
            <div class="box-discount">
              <div class="title">
                <h5>Sử dụng mã giảm giá</h5>
              </div>
              <div class="form-group">
                <input placeholder="Nhập mã khuyến mãi" />
                <button>ÁP DỤNG</button>
              </div>
            </div>
          </div>
          <div class="order-now">
            <button>
              <Link to="/payment">
                <em class="fa fa-shopping-basket"></em>tiến hành đặt hàng
              </Link>
            </button>
          </div>
        </div>
      </section>
      <section class="the-shine-shop-cart-2 pb-5">
        <div class="related-products-wrapper other-wrapper">
          <div class="container">
            <div class="heading">
              <h3 class="shine-title">SẢN PHẨM tương tự</h3>
              <div class="swiper-navigation">
                <div class="swiper-navigation">
                  <div class="swiper-prev">
                    <em class="lnr lnr-chevron-left"></em>
                  </div>
                  <div class="swiper-next">
                    <em class="lnr lnr-chevron-right"></em>
                  </div>
                </div>
              </div>
            </div>
            <div class="list-item">
              <div class="swiper-container">
                <div class="swiper-wrapper">
                  <div class="swiper-slide">
                    <div class="product-item">
                      <div class="top-item">
                        <div class="image">
                          <a href="#">
                            <img src="./img/pro-3.png" alt="" />
                          </a>
                        </div>
                        <div class="sale">-10%</div>
                        <div class="hidden-wrap">
                          <a class="add-cart" href="#">
                            <em class="fa fa-shopping-basket"></em>
                            <span>Thêm vào giỏ hàng</span>
                          </a>
                          <a class="view-detail" href="#">
                            <em class="fa fa-eye"></em>
                            <span>Xem chi tiết</span>
                          </a>
                        </div>
                      </div>
                      <div class="bottom-item">
                        <h5 class="title">
                          <a href="#">Bộ Kem Trị Nám Giori</a>
                        </h5>
                        <div class="price">
                          <span class="new black">350.000 ₫</span>
                          <span class="old">700.000 ₫</span>
                        </div>
                        <div class="flex">
                          <div class="rate" data-rate="5">
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                          </div>
                          <div class="cart-button">
                            <a href="#">
                              <em class="fa fa-shopping-basket"></em>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div class="product-item">
                      <div class="top-item">
                        <div class="image">
                          <a href="#">
                            <img src="./img/pro-3.png" alt="" />
                          </a>
                        </div>
                        <div class="sale">-10%</div>
                        <div class="hidden-wrap">
                          <a class="add-cart" href="#">
                            <em class="fa fa-shopping-basket"></em>
                            <span>Thêm vào giỏ hàng</span>
                          </a>
                          <a class="view-detail" href="#">
                            <em class="fa fa-eye"></em>
                            <span>Xem chi tiết</span>
                          </a>
                        </div>
                      </div>
                      <div class="bottom-item">
                        <h5 class="title">
                          <a href="#">Bộ Kem Trị Nám Giori</a>
                        </h5>
                        <div class="price">
                          <span class="new black">350.000 ₫</span>
                          <span class="old">700.000 ₫</span>
                        </div>
                        <div class="flex">
                          <div class="rate" data-rate="5">
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                          </div>
                          <div class="cart-button">
                            <a href="#">
                              <em class="fa fa-shopping-basket"></em>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div class="product-item">
                      <div class="top-item">
                        <div class="image">
                          <a href="#">
                            <img src="./img/pro-3.png" alt="" />
                          </a>
                        </div>
                        <div class="sale">-10%</div>
                        <div class="hidden-wrap">
                          <a class="add-cart" href="#">
                            <em class="fa fa-shopping-basket"></em>
                            <span>Thêm vào giỏ hàng</span>
                          </a>
                          <a class="view-detail" href="#">
                            <em class="fa fa-eye"></em>
                            <span>Xem chi tiết</span>
                          </a>
                        </div>
                      </div>
                      <div class="bottom-item">
                        <h5 class="title">
                          <a href="#">Bộ Kem Trị Nám Giori</a>
                        </h5>
                        <div class="price">
                          <span class="new black">350.000 ₫</span>
                          <span class="old">700.000 ₫</span>
                        </div>
                        <div class="flex">
                          <div class="rate" data-rate="5">
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                          </div>
                          <div class="cart-button">
                            <a href="#">
                              <em class="fa fa-shopping-basket"></em>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div class="product-item">
                      <div class="top-item">
                        <div class="image">
                          <a href="#">
                            <img src="./img/pro-3.png" alt="" />
                          </a>
                        </div>
                        <div class="sale">-10%</div>
                        <div class="hidden-wrap">
                          <a class="add-cart" href="#">
                            <em class="fa fa-shopping-basket"></em>
                            <span>Thêm vào giỏ hàng</span>
                          </a>
                          <a class="view-detail" href="#">
                            <em class="fa fa-eye"></em>
                            <span>Xem chi tiết</span>
                          </a>
                        </div>
                      </div>
                      <div class="bottom-item">
                        <h5 class="title">
                          <a href="#">Bộ Kem Trị Nám Giori</a>
                        </h5>
                        <div class="price">
                          <span class="new black">350.000 ₫</span>
                          <span class="old">700.000 ₫</span>
                        </div>
                        <div class="flex">
                          <div class="rate" data-rate="5">
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                          </div>
                          <div class="cart-button">
                            <a href="#">
                              <em class="fa fa-shopping-basket"></em>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div class="product-item">
                      <div class="top-item">
                        <div class="image">
                          <a href="#">
                            <img src="./img/pro-3.png" alt="" />
                          </a>
                        </div>
                        <div class="sale">-10%</div>
                        <div class="hidden-wrap">
                          <a class="add-cart" href="#">
                            <em class="fa fa-shopping-basket"></em>
                            <span>Thêm vào giỏ hàng</span>
                          </a>
                          <a class="view-detail" href="#">
                            <em class="fa fa-eye"></em>
                            <span>Xem chi tiết</span>
                          </a>
                        </div>
                      </div>
                      <div class="bottom-item">
                        <h5 class="title">
                          <a href="#">Bộ Kem Trị Nám Giori</a>
                        </h5>
                        <div class="price">
                          <span class="new black">350.000 ₫</span>
                          <span class="old">700.000 ₫</span>
                        </div>
                        <div class="flex">
                          <div class="rate" data-rate="5">
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                          </div>
                          <div class="cart-button">
                            <a href="#">
                              <em class="fa fa-shopping-basket"></em>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div class="product-item">
                      <div class="top-item">
                        <div class="image">
                          <a href="#">
                            <img src="./img/pro-3.png" alt="" />
                          </a>
                        </div>
                        <div class="sale">-10%</div>
                        <div class="hidden-wrap">
                          <a class="add-cart" href="#">
                            <em class="fa fa-shopping-basket"></em>
                            <span>Thêm vào giỏ hàng</span>
                          </a>
                          <a class="view-detail" href="#">
                            <em class="fa fa-eye"></em>
                            <span>Xem chi tiết</span>
                          </a>
                        </div>
                      </div>
                      <div class="bottom-item">
                        <h5 class="title">
                          <a href="#">Bộ Kem Trị Nám Giori</a>
                        </h5>
                        <div class="price">
                          <span class="new black">350.000 ₫</span>
                          <span class="old">700.000 ₫</span>
                        </div>
                        <div class="flex">
                          <div class="rate" data-rate="5">
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                          </div>
                          <div class="cart-button">
                            <a href="#">
                              <em class="fa fa-shopping-basket"></em>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div class="product-item">
                      <div class="top-item">
                        <div class="image">
                          <a href="#">
                            <img src="./img/pro-3.png" alt="" />
                          </a>
                        </div>
                        <div class="sale">-10%</div>
                        <div class="hidden-wrap">
                          <a class="add-cart" href="#">
                            <em class="fa fa-shopping-basket"></em>
                            <span>Thêm vào giỏ hàng</span>
                          </a>
                          <a class="view-detail" href="#">
                            <em class="fa fa-eye"></em>
                            <span>Xem chi tiết</span>
                          </a>
                        </div>
                      </div>
                      <div class="bottom-item">
                        <h5 class="title">
                          <a href="#">Bộ Kem Trị Nám Giori</a>
                        </h5>
                        <div class="price">
                          <span class="new black">350.000 ₫</span>
                          <span class="old">700.000 ₫</span>
                        </div>
                        <div class="flex">
                          <div class="rate" data-rate="5">
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                          </div>
                          <div class="cart-button">
                            <a href="#">
                              <em class="fa fa-shopping-basket"></em>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div class="product-item">
                      <div class="top-item">
                        <div class="image">
                          <a href="#">
                            <img src="./img/pro-3.png" alt="" />
                          </a>
                        </div>
                        <div class="sale">-10%</div>
                        <div class="hidden-wrap">
                          <a class="add-cart" href="#">
                            <em class="fa fa-shopping-basket"></em>
                            <span>Thêm vào giỏ hàng</span>
                          </a>
                          <a class="view-detail" href="#">
                            <em class="fa fa-eye"></em>
                            <span>Xem chi tiết</span>
                          </a>
                        </div>
                      </div>
                      <div class="bottom-item">
                        <h5 class="title">
                          <a href="#">Bộ Kem Trị Nám Giori</a>
                        </h5>
                        <div class="price">
                          <span class="new black">350.000 ₫</span>
                          <span class="old">700.000 ₫</span>
                        </div>
                        <div class="flex">
                          <div class="rate" data-rate="5">
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                          </div>
                          <div class="cart-button">
                            <a href="#">
                              <em class="fa fa-shopping-basket"></em>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div class="product-item">
                      <div class="top-item">
                        <div class="image">
                          <a href="#">
                            <img src="./img/pro-3.png" alt="" />
                          </a>
                        </div>
                        <div class="sale">-10%</div>
                        <div class="hidden-wrap">
                          <a class="add-cart" href="#">
                            <em class="fa fa-shopping-basket"></em>
                            <span>Thêm vào giỏ hàng</span>
                          </a>
                          <a class="view-detail" href="#">
                            <em class="fa fa-eye"></em>
                            <span>Xem chi tiết</span>
                          </a>
                        </div>
                      </div>
                      <div class="bottom-item">
                        <h5 class="title">
                          <a href="#">Bộ Kem Trị Nám Giori</a>
                        </h5>
                        <div class="price">
                          <span class="new black">350.000 ₫</span>
                          <span class="old">700.000 ₫</span>
                        </div>
                        <div class="flex">
                          <div class="rate" data-rate="5">
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                          </div>
                          <div class="cart-button">
                            <a href="#">
                              <em class="fa fa-shopping-basket"></em>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div class="product-item">
                      <div class="top-item">
                        <div class="image">
                          <a href="#">
                            <img src="./img/pro-3.png" alt="" />
                          </a>
                        </div>
                        <div class="sale">-10%</div>
                        <div class="hidden-wrap">
                          <a class="add-cart" href="#">
                            <em class="fa fa-shopping-basket"></em>
                            <span>Thêm vào giỏ hàng</span>
                          </a>
                          <a class="view-detail" href="#">
                            <em class="fa fa-eye"></em>
                            <span>Xem chi tiết</span>
                          </a>
                        </div>
                      </div>
                      <div class="bottom-item">
                        <h5 class="title">
                          <a href="#">Bộ Kem Trị Nám Giori</a>
                        </h5>
                        <div class="price">
                          <span class="new black">350.000 ₫</span>
                          <span class="old">700.000 ₫</span>
                        </div>
                        <div class="flex">
                          <div class="rate" data-rate="5">
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                          </div>
                          <div class="cart-button">
                            <a href="#">
                              <em class="fa fa-shopping-basket"></em>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="top-finding py-5">
        <div class="container">
          <div class="heading-wrapper">
            <h2 class="shine-title">Top tìm kiếm</h2>
          </div>
          <div class="list-item-wrapper">
            <ul>
              <li>
                <a href="#">Kem chống nắng</a>
              </li>
              <li>
                <a href="#">Son dưỡng</a>
              </li>
              <li>
                <a href="#">Son lì</a>
              </li>
              <li>
                <a href="#">Sữa rửa mặt </a>
              </li>
              <li>
                <a href="#">Bông tẩy trang</a>
              </li>
              <li>
                <a href="#">Mặt nạ</a>
              </li>
              <li>
                <a href="#">Kem dưỡng da</a>
              </li>
              <li>
                <a href="#">Kem dưỡng ẩm Hada Labo</a>
              </li>
              <li>
                <a href="#">Kem chống nắng</a>
              </li>
              <li>
                <a href="#">Son dưỡng</a>
              </li>
              <li>
                <a href="#">Son lì</a>
              </li>
              <li>
                <a href="#">Sữa rửa mặt </a>
              </li>
              <li>
                <a href="#">Bông tẩy trang</a>
              </li>
              <li>
                <a href="#">Mặt nạ</a>
              </li>
              <li>
                <a href="#">Kem dưỡng da</a>
              </li>
              <li>
                <a href="#">Kem dưỡng ẩm Hada Labo</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div id="phoneButton">
        <a href="#">
          <span class="ic">
            <em class="mdi mdi-phone"></em>
          </span>
        </a>
      </div>
      <div id="backToTop">
        <em class="mdi mdi-arrow-up"></em>
      </div>
    </main>
  );
}

export default Cart;
