import React, { useEffect, useState } from "react";
import "../Template/shine/dist/css/core.min.css";
import "../Template/shine/dist/css/main.min.css";
import "../Template/shine/dist/css/main.min.css.map";
import { useNavigate, useParams } from "react-router-dom";
import APIs, { endpoints } from "../Config/APIs";
import banner_1 from "../Template/shine/dist/img/home/banner-1.png";
import banner_2 from "../Template/shine/dist/img/home/banner-2.png";
import banner_3 from "../Template/shine/dist/img/home/banner-3.png";
import { FaShoppingBasket, FaStar } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { formatCurrency, parseCurrency } from "../Convert/formatcurrency";

// Banner images and slider settings
const banners = [banner_1, banner_2, banner_3];
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const ListProduct = () => {
  const { category_id } = useParams();
  const [productByCategory, setProductsByCategory] = useState([]);
  const [titleCategory, setTitleCategory] = useState("");
  const [allOrigins, setAllOrigins] = useState([]);
  const [filterPrices] = useState([
    { id: "p0", name: "Tất Cả" },
    { id: "p1", name: "0đ - 5.000.000đ" },
    { id: "p2", name: "5.000.000đ - 10.000.000đ" },
    { id: "p3", name: "10.000.000đ - 15.000.000đ" },
    { id: "p4", name: "15.000.000đ - 20.000.000đ" },
    { id: "p5", name: "20.000.000đ" },
  ]);
  const [selectedPrice, setSelectedPrice] = useState("Tất Cả");
  const [selectedOrigin, setSelectedOrigin] = useState("Tất Cả");
  const [sortOrder, setSortOrder] = useState("");
  const navigate = useNavigate();

  // Load products based on category ID
  const loadProductsByCategory = async () => {
    try {
      // Start building the URL
      let url = `${endpoints["load-list-product"](category_id)}`;

      // Create a URLSearchParams object to handle query parameters
      const params = new URLSearchParams();

      // Append origin filter if provided
      if (selectedOrigin && selectedOrigin !== "Tất Cả") {
        params.append("origin", selectedOrigin);
      }

      // Handle price filter
      if (selectedPrice && selectedPrice !== "Tất Cả") {
        const [minPriceStr, maxPriceStr] = selectedPrice.split(" - ");
        const min_price = parseCurrency(minPriceStr);
        const max_price = maxPriceStr ? parseCurrency(maxPriceStr) : null;

        if (min_price) params.append("min_price", min_price);
        if (max_price !== null) params.append("max_price", max_price);
      }

      // Append sort order if provided
      if (sortOrder && sortOrder !== "") {
        params.append("sort_order", sortOrder);
      }

      // Combine base URL with query parameters
      url += `?${params.toString()}`;
      console.log(url); // Log the final URL

      // Fetch data from API
      const res = await APIs.get(url);
      navigate(`/categories/${category_id}/list-product?${params.toString()}`);
      const products = res.data.results || [];

      setProductsByCategory(products);
      setTitleCategory(products[0]?.name_category || "Sản phẩm");
    } catch (error) {
      console.error("Failed to load products:", error);
      alert("Không thể tải danh sách sản phẩm.");
    }
  };

  const loadAllOrigins = async () => {
    try {
      const res = await APIs.get(endpoints["load-all-origins"]);
      setAllOrigins(res.data.results || []);
    } catch (error) {
      console.error("Failed to load origins:", error);
    }
  };

  useEffect(() => {
    loadProductsByCategory();
  }, [category_id, selectedOrigin, selectedPrice, sortOrder]);

  useEffect(() => {
    loadAllOrigins();
  }, []);

  const handleChange = (title, value) => {
    if (title === "GIÁ TIỀN") {
      setSelectedPrice(value);
      console.log("Selected Price:", value); // Log the new value directly
    }
    if (title === "XUẤT XỨ") {
      setSelectedOrigin(value);
      console.log("Selected Origin:", value); // Log the new value directly
    }
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
    console.log("Sort order set to:", value); // Log the sort order for debugging
  };

  return (
    <div className="san-pham-ds-page">
      <main>
        <Banner />
        <ProductSection
          products={productByCategory}
          titleCategory={titleCategory}
          allOrigins={allOrigins}
          filterPrices={filterPrices}
          onFilterChange={handleChange}
          onOrderSortChange={handleSortChange} // Pass setSortOrder to ProductList
        />
        <BackToTop />
      </main>
    </div>
  );
};

// Banner Component
const Banner = () => (
  <section className="home-banner">
    <Slider {...sliderSettings}>
      {banners.map((banner, index) => (
        <div key={index}>
          <div className="image-wrapper">
            <img src={banner} alt={`Banner ${index + 1}`} />
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
);

// Product Section Component
const ProductSection = ({
  products,
  titleCategory,
  allOrigins,
  filterPrices,
  onFilterChange,
  onOrderSortChange,
}) => (
  <section className="product-list">
    <div className="container">
      <p className="description">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor...
      </p>
      <div className="main-wrapper py-4">
        <div className="row">
          <aside className="col-lg-3">
            <ProductFilter
              allOrigins={allOrigins}
              filterPrices={filterPrices}
              onChange={onFilterChange}
            />
          </aside>
          <div className="col-lg-9">
            <ProductList
              products={products}
              titleCategory={titleCategory}
              onOrderSortChange={onOrderSortChange}
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Product Filter Component
const ProductFilter = ({ allOrigins, filterPrices, onChange }) => (
  <div className="product-filter-wrapper">
    <div className="product-filter-button">
      <em className="mdi mdi-filter"></em>
    </div>
    <div className="product-filter-close">
      <em className="mdi mdi-close"></em>
    </div>
    <FilterGroup title="GIÁ TIỀN" options={filterPrices} onChange={onChange} />
    <FilterGroup title="XUẤT XỨ" options={allOrigins} onChange={onChange} />
  </div>
);

// FilterGroup Component
const FilterGroup = ({ title, options, onChange }) => (
  <div className="item">
    <div className="heading">
      <h4>{title}</h4>
    </div>
    <div className="options">
      {options.map((option) => (
        <div className="form-group" key={option.id}>
          <input
            id={option.id}
            type="radio"
            name={title}
            value={option.name}
            onChange={(e) => onChange(title, e.target.value)}
          />
          <label htmlFor={option.id}>{option.name}</label>
        </div>
      ))}
    </div>
  </div>
);

// Product List Component
const ProductList = ({ products, titleCategory, onOrderSortChange }) => (
  <div className="product-list-wrapper">
    <div className="heading-wrapper">
      <h1 className="shine-title">{titleCategory}</h1>
      <div className="sort-by">
        <select onChange={(e) => onOrderSortChange(e.target.value)}>
          <option value=""></option>
          <option value="new">Mới nhất</option>
          <option value="desc">Giá giảm dần</option>
          <option value="asc">Giá tăng dần</option>
        </select>
      </div>
    </div>
    <div className="list-item-wrapper">
      <div className="row">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  </div>
);

// Handler for sorting changes

// ProductItem Component
const ProductItem = ({ product }) => (
  <div className="col-md-4 col-6 col-xl-3">
    <div className="product-item">
      <div className="top-item">
        <div className="image">
          <a href="#">
            <img src={product.image_product} alt={product.name_product} />
          </a>
        </div>
        {product.discount_product && (
          <div className="sale">{product.discount_product}</div>
        )}
        <div className="hidden-wrap">
          <a className="add-cart" href="#">
            <FaShoppingBasket />
            <span>Thêm vào giỏ hàng</span>
          </a>
          <a className="view-detail" href="#">
            <FaStar />
            <span>Xem chi tiết</span>
          </a>
        </div>
      </div>
      <div className="bottom-item">
        <h5 className="title">
          <a href="#">{product.name_product}</a>
        </h5>
        <div className="price">
          <span className="new black">
            {formatCurrency(`${product.present_price}`)}
          </span>
          {product.unit_price_product && (
            <span className="old">
              {formatCurrency(`${product.unit_price_product}`)}
            </span>
          )}
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

// BackToTop Button Component
const BackToTop = () => (
  <div id="backToTop">
    <em className="mdi mdi-arrow-up"></em>
  </div>
);

export default ListProduct;
