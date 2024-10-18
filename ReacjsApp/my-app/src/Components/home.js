import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Template/shine/dist/css/core.min.css";
import "../Template/shine/dist/css/main.min.css";
import "../Template/shine/dist/css/main.min.css.map";
import banner_1 from "../Template/shine/dist/img/home/banner-1.png";
import sale from "../Template/shine/dist/img/home/sale.png";
import {
  FaShoppingBasket,
  FaEye,
  FaStar,
  FaPhoneAlt,
  FaArrowUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Slider settings for react-slick
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

function Home() {
  const renderProduct = (title, newPrice, oldPrice) => (
    <div className="col-lg-3 col-md-4 col-6 col-xxl-2">
      <div className="product-item border">
        <div className="top-item">
          <div className="image">
            <a href="#">
              <img
                src="../Template/shine/dist/img/product/pro-1.png"
                alt={title}
              />
            </a>
          </div>
          <div className="sale">-20%</div>
          <div className="hidden-wrap">
            <a className="add-cart" href="#" aria-label="Add to cart">
              <FaShoppingBasket />
              <span>Thêm vào giỏ hàng</span>
            </a>
            <a className="view-detail" href="#" aria-label="View details">
              <FaEye />
              <span>Xem chi tiết</span>
            </a>
          </div>
        </div>
        <div className="bottom-item">
          <h5 className="title">
            <a href="#">{title}</a>
          </h5>
          <div className="price">
            <span className="new black">{newPrice} ₫</span>
            <span className="old">{oldPrice} ₫</span>
          </div>
          <div className="flex">
            <div className="rate" data-rate="3">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <div className="cart-button">
              <a href="#">
                <FaShoppingBasket />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <main>
      <section className="home-banner">
        <Slider {...sliderSettings}>
          {[...Array(3)].map((_, i) => (
            <div key={i}>
              <div className="image-wrapper">
                <img src={banner_1} alt={`Banner ${i + 1}`} />
              </div>
              <div className="content-wrapper">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-5">
                      <p>Trải nghiệm sản phẩm mới</p>
                      <h1>Bộ Đôi Dưỡng Trắng Và Đặc Trị Nám Chuyên Sâu</h1>
                      <a href="#" className="buy-now-button">
                        <FaShoppingBasket />
                        <span>Mua ngay</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      <div className="home-1 py-5 pb-2">
        <div className="container">
          <div className="heading-wrapper mb-3">
            <div className="ic">
              <img src={sale} alt="Sale" />
            </div>
            <h2 className="shine-title">KHUYẾN MÃI MỖI NGÀY</h2>
            <Link className="view-more-button" to="/listproduct">
              Xem thêm
            </Link>
          </div>
          <div className="list-item-wrapper">
            <div className="row">
              {renderProduct(
                "Bộ Kem Trị Nám Giori Nhật Bản",
                "350.000",
                "700.000"
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="home-2 py-5 pb-2">
        <div className="container">
          <div className="heading-wrapper mb-3">
            <h2 className="shine-title">Sản phẩm tốt nhất</h2>
            <Link className="view-more-button" to="/listproduct">
              Xem thêm
            </Link>
          </div>
          <div className="list-item-wrapper">
            <div className="row">
              {renderProduct(
                "Bộ Kem Trị Nám Giori Nhật Bản",
                "350.000",
                "700.000"
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="home-3 py-5">
        <div className="container">
          {["DA", "Tóc", "Body"].map((category) => (
            <div className="main-wrapper" key={category}>
              <div className="heading-wrapper">
                <h2 className="shine-title">SẢN PHẨM CHĂM SÓC {category}</h2>
                <Link className="view-more-button" to="/listproduct">
                  Xem thêm
                </Link>
              </div>
              <div className="list-item-wrapper">
                <div className="row">
                  {renderProduct(
                    "Bộ Kem Trị Nám Giori Nhật Bản",
                    "350.000",
                    "700.000"
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="home-4 py-5">
        <div className="container">
          <div className="heading-wrapper">
            <h2 className="shine-title">blog làm đẹp</h2>
            <Link className="view-more-button" to="/blog">
              Xem thêm
            </Link>
          </div>
          <div className="list-item-wrapper">
            <div className="row">
              <div className="col-lg-6">
                <div className="blog-item top-item">
                  <a href="#">
                    <figure>
                      <div className="image">
                        <img
                          src="src\Template\shine\dist\img\news-1.png"
                          alt="Blog"
                        />
                      </div>
                      <figcaption>
                        <time>01/10/2019</time>
                        <h5 className="title">
                          Bí quyết giảm nếp nhăn vùng mắt giúp bạn sở hữu vẻ đẹp
                          không tuổi
                        </h5>
                        <span>Xem thêm</span>
                      </figcaption>
                    </figure>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="top-finding py-5">
        <div className="container">
          <div className="heading-wrapper">
            <h2 className="shine-title">Top tìm kiếm</h2>
          </div>
          <ul className="list-item-wrapper">
            {[
              "Kem chống nắng",
              "Son dưỡng",
              "Son lì",
              "Sữa rửa mặt",
              "Bông tẩy trang",
              "Mặt nạ",
            ].map((item) => (
              <li key={item}>
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div id="phoneButton">
        <a href="#">
          <FaPhoneAlt />
        </a>
      </div>
      <div id="backToTop">
        <FaArrowUp />
      </div>
    </main>
  );
}

export default Home;
