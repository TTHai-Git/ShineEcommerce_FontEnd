import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Template/shine/dist/css/core.min.css";
import "../Template/shine/dist/css/main.min.css";
import banner_1 from "../Template/shine/dist/img/home/banner-1.png";
import banner_2 from "../Template/shine/dist/img/home/banner-2.png";
import banner_3 from "../Template/shine/dist/img/home/banner-3.png";
import sale from "../Template/shine/dist/img/home/sale.png";
import {
  FaShoppingBasket,
  FaEye,
  FaStar,
  FaPhoneAlt,
  FaArrowUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import APIs, { endpoints } from "../Config/APIs";
import { MyUserContext } from "../Config/contexts";
import moment from "moment";
import vi from "moment/locale/vi";
import { formatCurrency } from "../Convert/formatcurrency";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const banners = [banner_1, banner_2, banner_3];

function Home() {
  const user = useContext(MyUserContext);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [newBlogs, setNewBlogs] = useState([]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const { data } = await APIs.get(endpoints["load-product-home"]);
      setProducts(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadTags = async () => {
    try {
      const { data } = await APIs.get(endpoints["load-tag"]);
      setTags(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const loadCategories = async () => {
    try {
      const { data } = await APIs.get(endpoints["load-category"]);
      setCategories(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const loadNewBlogs = async () => {
    try {
      const { data } = await APIs.get(endpoints["load-new-blogs"]);
      setNewBlogs(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
    loadTags();
    loadNewBlogs();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const ProductItem = ({ product }) => (
    <div className="col-lg-3 col-md-4 col-6 col-xxl-2" key={product.id_product}>
      <div className="product-item border">
        <div className="top-item">
          <div className="image">
            <a href="#">
              <img
                src={product?.image_product || "/default-image.png"}
                alt={product?.name_product}
              />
            </a>
          </div>
          <div className="sale">{product.discount_product}</div>
          <div className="hidden-wrap">
            <a className="add-cart" href="#" aria-label="Add to cart">
              <FaShoppingBasket />
              <span>Thêm vào giỏ hàng</span>
            </a>
            <Link
              className="view-detail"
              to={`products/${product.id_product}/info-details`}
              aria-label="View details"
            >
              <FaEye />
              <span>Xem chi tiết</span>
            </Link>
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
            <span className="old">
              {formatCurrency(`${product.unit_price_product}`)}
            </span>
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

  const BlogTopItem = ({ blog }) => (
    <div className="blog-item top-item">
      <a href="#">
        <figure>
          <div className="image">
            <img src={blog.blog_image} alt={blog.blog_title} />
          </div>
          <figcaption>
            <time>
              {moment(blog.blog_created_date).locale("vi", vi).fromNow()}
            </time>
            <h5 className="title">{blog.blog_title}</h5>
          </figcaption>
        </figure>
      </a>
    </div>
  );

  const BlogPartItem = ({ blog }) => (
    <div className="blog-item part-item">
      <a href="#">
        <figure>
          <div className="image">
            <img src={blog.blog_image} alt={blog.blog_title} />
          </div>
          <figcaption>
            <time>
              {moment(blog.blog_created_date).locale("vi", vi).fromNow()}
            </time>
            <h5 className="title">{blog.blog_title}</h5>
          </figcaption>
        </figure>
      </a>
    </div>
  );

  const renderProductsByTags = (tagName) =>
    products
      .filter((product) =>
        product.tags_product.some((tag) => tag.name === tagName)
      )
      .map((product) => (
        <ProductItem product={product} key={product.id_product} />
      ));

  const renderTopNewBlogs = () =>
    newBlogs
      .filter((newBlog) => newBlog.blog_id === newBlogs.length - 1)
      .map((newBlog) => <BlogTopItem blog={newBlog} key={newBlog.blog_id} />);

  const renderPartNewBlogs = () =>
    newBlogs
      .filter((newBlog) => newBlog.blog_id !== newBlogs.length - 1)
      .map((newBlog) => <BlogPartItem blog={newBlog} key={newBlog.blog_id} />);

  const renderProductsByCategory = (categoryName) =>
    products
      .filter((product) => product.name_category === categoryName)
      .map((product) => (
        <ProductItem product={product} key={product.id_product} />
      ));

  return (
    <main>
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
                      <a
                        href="#"
                        className="buy-now-button"
                        aria-label="Buy now"
                      >
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
        {tags.map((tag) => (
          <div className="container" key={tag.id}>
            <div className="heading-wrapper mb-3">
              <div className="ic">
                <img src={sale} alt="Sale" />
              </div>
              <h2 className="shine-title">{tag.name}</h2>
            </div>
            <div className="list-item-wrapper">
              <div className="row">{renderProductsByTags(tag.name)}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="home-3 py-5">
        {categories.map((category) => (
          <div className="container" key={category.id}>
            <div className="main-wrapper">
              <div className="heading-wrapper">
                <h2 className="shine-title">{category.name}</h2>
                <div className="button">
                  <Link
                    className="view-more-button"
                    to={`categories/${category.id}/list-product`}
                  >
                    Xem thêm
                  </Link>
                </div>
              </div>
              <div className="list-item-wrapper">
                <div className="row">
                  {renderProductsByCategory(category.name)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="home-4 py-5">
        <div className="container">
          <div className="heading-wrapper">
            <h2 className="shine-title">Blog Làm Đẹp Mới Nhất</h2>
            <div className="button">
              <Link className="view-more-button" to="/blogs">
                Xem thêm
              </Link>
            </div>
          </div>
          <div className="list-item-wrapper">
            <div className="row">
              <div className="col-lg-6">{renderTopNewBlogs()}</div>
              <div className="col-lg-6">{renderPartNewBlogs()}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
