import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Template/shine/dist/css/core.min.css";
import "../Template/shine/dist/css/main.min.css";
import "../Template/shine/dist/css/StarRate.css";
import banner_1 from "../Template/shine/dist/img/home/banner-1.png";
import banner_2 from "../Template/shine/dist/img/home/banner-2.png";
import banner_3 from "../Template/shine/dist/img/home/banner-3.png";
import sale from "../Template/shine/dist/img/home/sale.png";
import {
  FaShoppingBasket,
  FaEye,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaPhoneAlt,
  FaArrowUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import APIs, { endpoints } from "../Config/APIs";
import { MyUserContext } from "../Config/contexts";
import moment from "moment";
import vi from "moment/locale/vi";
import { formatCurrency } from "../Convert/formatcurrency";
import { useCart } from "../Config/CartContext";

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
  const { user } = useContext(MyUserContext);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [newBlogs, setNewBlogs] = useState([]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

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
      const res = await APIs.get(endpoints["load-new-blogs"]);
      setNewBlogs(res.data.results);
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

  const ProductItem = ({ product }) => (
    <div className="col-lg-3 col-md-4 col-6 col-xxl-2" key={product.id_product}>
      <div className="product-item border">
        <div className="top-item">
          <div className="image">
            <Link to="#">
              <img
                src={product?.image_product || "/default-image.png"}
                alt={product?.name_product}
              />
            </Link>
          </div>
          <div className="sale">{product.discount_product} %</div>
          <div className="hidden-wrap">
            <Link
              className="add-cart"
              aria-label="Add to cart"
              to="#"
              onClick={() => handleAddToCart(product)}
            >
              <FaShoppingBasket />
              <span>Thêm vào giỏ hàng</span>
            </Link>
            <Link
              className="view-detail"
              to={`/products/${product.id_product}/info-details`}
              aria-label="View details"
            >
              <FaEye />
              <span>Xem chi tiết</span>
            </Link>
          </div>
        </div>
        <div className="bottom-item">
          <h5 className="title">
            <Link to="#">{product.name_product}</Link>
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
            <div className="rate" data-rate="5">
              <div className="stars">
                {[...Array(5)].map((_, i) => {
                  const rating = product.star_comment_rate;
                  if (i < Math.floor(rating)) {
                    // Full star
                    return <FaStar key={i} className="star active" />;
                  } else if (i < rating) {
                    // Half star
                    return (
                      <FaStarHalfAlt key={i} className="star half-active" />
                    );
                  } else {
                    // Empty star
                    return <FaRegStar key={i} className="star" />;
                  }
                })}
              </div>
            </div>
            <div className="cart-button">
              <Link
                className="add-cart"
                aria-label="Add to cart"
                to="#"
                onClick={() => handleAddToCart(product)}
              >
                <FaShoppingBasket />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const BlogTopItem = ({ blog }) => (
    <div className="blog-item top-item" key={blog.blog_id}>
      <Link to="#">
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
      </Link>
    </div>
  );

  const BlogPartItem = ({ blog }) => (
    <div className="blog-item part-item" key={blog.blog_id}>
      <Link to="#">
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
      </Link>
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

  const renderTopNewBlogs = (newBlog) => <BlogTopItem blog={newBlog} />;

  const renderPartNewBlogs = () =>
    newBlogs
      .slice(1) // Start from the second blog to avoid duplication with the top blog
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
        <div className="swiper-container">
          <Slider {...sliderSettings}>
            {banners.map((banner, index) => (
              <div key={index} className="swiper-slide">
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
        </div>
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
              {newBlogs[0] && (
                <div className="col-lg-6">{renderTopNewBlogs(newBlogs[0])}</div>
              )}
              <div className="col-lg-6">{renderPartNewBlogs()}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
