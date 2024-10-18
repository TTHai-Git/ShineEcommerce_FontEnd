import React from "react";
import "../Template/shine/dist/css/core.min.css";
import "../Template/shine/dist/css/main.min.css";
import "../Template/shine/dist/css/main.min.css.map";
const ListProduct = () => {
  return (
    <div className="san-pham-ds-page">
      <main>
        <section className="main-banner">
          <div className="swiper-container">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="image">
                  <img src="./img/banner-1.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="main-breadcrumb">
          <div className="container">
            <ul>
              <li>
                <a href="#">Trang chủ</a>
              </li>
              <li>
                <a href="#">Danh mục sản phẩm</a>
              </li>
              <li>
                <a href="#">Sản phẩm chăm sóc da</a>
              </li>
            </ul>
          </div>
        </section>
        <section className="product-list">
          <div className="container">
            <p className="description">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum. Sed
              ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem ape
            </p>
            <div className="main-wrapper py-4">
              <div className="row">
                <div className="col-lg-3">
                  <div className="product-filter-button">
                    <em className="mdi mdi-filter"></em>
                  </div>
                  <div className="product-filter-wrapper">
                    <div className="product-filter-close">
                      <em className="mdi mdi-close"></em>
                    </div>
                    {/* Price Filter */}
                    <FilterGroup
                      title="Giá tiền"
                      options={[
                        { id: "cb-1", label: "Dưới 500.000 đ" },
                        { id: "cb-2", label: "Từ 500.000 đ - 1.000.000 đ" },
                        { id: "cb-3", label: "Từ 1.000.000 đ - 1.500.000 đ" },
                        { id: "cb-4", label: "Từ 1.500.000 đ - 5.000.000 đ" },
                        { id: "cb-5", label: "Trên 5.000.000 đ" },
                      ]}
                    />
                    {/* Origin Filter */}
                    <FilterGroup
                      title="Xuất xứ"
                      options={[
                        { id: "cb-6", label: "Hàn Quốc" },
                        { id: "cb-7", label: "Nhật Bản" },
                        { id: "cb-8", label: "Trung Quốc nội địa" },
                        { id: "cb-9", label: "Nga" },
                        { id: "cb-10", label: "Ukraina" },
                      ]}
                    />
                    {/* Skin Type Filter */}
                    <FilterGroup
                      title="Làn da"
                      options={[
                        { id: "cb-11", label: "Da nhờn" },
                        { id: "cb-12", label: "Da mụn" },
                        { id: "cb-13", label: "Da dầu" },
                        { id: "cb-14", label: "Da hỗn hợp" },
                        { id: "cb-15", label: "Da nhạy cảm" },
                      ]}
                    />
                    {/* Brand Filter */}
                    <FilterGroup
                      title="Thương hiệu"
                      options={[
                        { id: "cb-16", label: "Thương hiệu 1" },
                        { id: "cb-17", label: "Thương hiệu 2" },
                        { id: "cb-18", label: "Thương hiệu 3" },
                        { id: "cb-19", label: "Thương hiệu 4" },
                        { id: "cb-20", label: "Thương hiệu 5" },
                      ]}
                    />
                    {/* Gender Filter */}
                    <FilterGroup
                      title="Giới tính"
                      options={[
                        { id: "cb-21", label: "Nam" },
                        { id: "cb-22", label: "Nữ" },
                      ]}
                    />
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="product-list-wrapper">
                    <div className="heading-wrapper">
                      <h1 className="shine-title">Sản phẩm chăm sóc da</h1>
                      <div className="sort-by">
                        <select>
                          <option>Giá giảm dần</option>
                          <option>Giá tăng dần</option>
                          <option>Mới nhất</option>
                        </select>
                      </div>
                      <div className="product-display">
                        <span>Cột hay hàng: </span>
                        <a
                          className="active"
                          href="javascript:void(0)"
                          display="1"
                        >
                          <em className="mdi mdi-view-week"></em>
                        </a>
                        <a href="javascript:void(0)" display="2">
                          <em className="mdi mdi-view-list"></em>
                        </a>
                      </div>
                    </div>
                    <div className="list-item-wrapper">
                      <div className="row">
                        {/* Product Item */}
                        <ProductItem
                          imgSrc="./img/pro-3.png"
                          title="Bộ Kem Trị Nám Giori"
                          newPrice="350.000 ₫"
                          oldPrice="700.000 ₫"
                          rating={5}
                        />
                      </div>
                      <div className="button mt-1">
                        <a className="view-more-button" href="#">
                          Xem thêm sản phẩm
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
    </div>
  );
};

const FilterGroup = ({ title, options }) => {
  return (
    <div className="item">
      <div className="heading">
        <h4>{title}</h4>
      </div>
      <div className="options">
        {options.map((option) => (
          <div className="form-group" key={option.id}>
            <input id={option.id} type="radio" name={title.toLowerCase()} />
            <label htmlFor={option.id}>{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductItem = ({ imgSrc, title, newPrice, oldPrice, rating }) => {
  return (
    <div className="col-md-4 col-6 col-xl-3 display">
      <div className="product-item">
        <div className="top-item">
          <div className="image">
            <a href="#">
              <img src={imgSrc} alt="" />
            </a>
          </div>
          <div className="sale">-10%</div>
          <div className="hidden-wrap">
            <a className="add-cart" href="#">
              <em className="fa fa-shopping-basket"></em>
              <span>Thêm vào giỏ hàng</span>
            </a>
            <a className="view-detail" href="#">
              <em className="fa fa-eye"></em>
              <span>Xem chi tiết</span>
            </a>
          </div>
        </div>
        <div className="bottom-item">
          <h5 className="title">
            <a href="#">{title}</a>
          </h5>
          <div className="price">
            <span className="new black">{newPrice}</span>
            <span className="old">{oldPrice}</span>
          </div>
          <div className="flex">
            <div className="rate" data-rate={rating}>
              {[...Array(rating)].map((_, i) => (
                <em key={i} className="fa fa-star"></em>
              ))}
            </div>
            <div className="cart-button">
              <a href="#">
                <em className="fa fa-shopping-basket"></em>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
