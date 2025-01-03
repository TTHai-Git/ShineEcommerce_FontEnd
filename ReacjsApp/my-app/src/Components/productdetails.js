import "../Template/shine/dist/css/core.min.css";
import "../Template/shine/dist/css/main.min.css";
import "../Template/shine/dist/css/StarRate.css";
import "../Template/shine/dist/css/CommentForm.css";
import { useState, useCallback, useEffect, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import {
  FaFacebook,
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaShoppingBasket,
  FaChevronDown,
  FaChevronUp,
  FaEye,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaSignInAlt,
  FaTrash,
} from "react-icons/fa";
// import detail_1 from "../Template/shine/dist/img/product/detail-1.png";
// import detail_2 from "../Template/shine/dist/img/product/detail-2.png";
// import detail_3 from "../Template/shine/dist/img/product/detail-3.png";
import moment from "moment";
import vi from "moment/locale/vi";

import { Link, useParams } from "react-router-dom";
import APIs, { authApi, endpoints } from "../Config/APIs";
import { formatCurrency } from "../Convert/formatcurrency";
import { useCart } from "../Config/CartContext";
import CommentForm from "./commentform";
import { MyUserContext } from "../Config/contexts";
import Modal from "./modal";

function ProductDetails() {
  const { user } = useContext(MyUserContext);
  const { selected_product_id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [relatedproducts, setRelatedProducts] = useState([]);
  const [productColors, setProductColors] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("#e08271");
  const [isExpanded, setIsExpanded] = useState(false);
  const { addToCartWithQuantity } = useCart();

  const handleAddToCart = (product, quantity) => {
    addToCartWithQuantity(product, quantity);
  };

  const loadInfoDetailsOfProduct = async () => {
    try {
      const url = `${endpoints["product-info-details"](selected_product_id)}`;
      const res = await APIs.get(url);
      // console.log(`danh sách sản phẩm trên: ${res.data.results}`);
      if (res.data.results.length > 0) {
        setSelectedProduct(res.data.results[0]); // Vì trong list chỉ trả về array có 1 item
        setRelatedProducts(res.data.results[0].related_products);
        setReviews(res.data.results[0].reviews);
        setProductColors(res.data.results[0].color_product);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const delComment = async (selected_comment_id) => {
    try {
      const url = `${endpoints["del-comment"](selected_comment_id)}`;
      const res = await authApi(user.access_token).delete(url);
      alert(res.data.message);
    } catch (ex) {
      console.log(ex);
    } finally {
      loadInfoDetailsOfProduct();
    }
  };

  useEffect(() => {
    loadInfoDetailsOfProduct();
  }, [selected_product_id]);

  const handleQuantityChange = useCallback((change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  }, []);

  const handleColorSelect = (color) => setSelectedColor(color);

  const handleToggleDetails = () => setIsExpanded((prev) => !prev);

  const ProductImages = ({ selectedProduct }) => (
    <div className="left-wrapper">
      <div className="sale">{selectedProduct.discount_product} %</div>
      <div className="image-top">
        <div className="swiper-container">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="image">
                <img
                  src={selectedProduct.image_product}
                  alt={selectedProduct.name_product}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ProductInfo = ({ selectedProduct }) => (
    <div className="right-wrapper">
      <h1 className="shine-title">{selectedProduct.name_product}</h1>
      <p className="status">
        {selectedProduct.active_product ? "Còn Hàng" : "Hết Hàng"}
      </p>
      <div className="table-wrap">
        <div className="table-row">
          <div className="title">Giá</div>
          <div className="old">
            {formatCurrency(`${selectedProduct.unit_price_product}`)}
          </div>
        </div>
        <div className="table-row">
          <div className="title">Giá khuyến mãi</div>
          <div className="new">
            {formatCurrency(`${selectedProduct.present_price}`)}
          </div>
        </div>
        <div className="table-row">
          <div className="title">Số lượng</div>
          <div className="quantity-box">
            <button
              onClick={() => handleQuantityChange(-1)}
              aria-label="Giảm số lượng"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              aria-label="Số lượng"
            />
            <button
              onClick={() => handleQuantityChange(1)}
              aria-label="Tăng số lượng"
            >
              +
            </button>
          </div>
        </div>
        <div className="table-row">
          <div className="title">Màu sắc</div>
          <div className="color-options">
            {productColors.map((color, index) => (
              <div
                key={index}
                className={`color-item ${
                  selectedColor === color.color_name ? "active" : ""
                }`}
                onClick={() => handleColorSelect(color.color_name)}
                style={{ background: color.color_name }}
                aria-label={`Chọn màu ${color.color_name}`}
              />
            ))}
          </div>
        </div>
        <div className="table-row">
          <div className="title">Chia sẻ</div>
          <ul className="social">
            {[FaFacebook, FaYoutube, FaTwitter, FaInstagram].map(
              (Icon, index) => (
                <li key={index}>
                  <a href="#" aria-label={`Social ${index}`}>
                    <Icon />
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
      <div className="add-cart">
        <Link
          className="add-cart"
          aria-label="Add to cart"
          to="#"
          onClick={() => handleAddToCart(selectedProduct, quantity)}
        >
          <FaShoppingBasket />
          <span>Thêm vào giỏ hàng</span>
        </Link>
      </div>
    </div>
  );

  const ProductInfoDetails = ({ selectedProduct }) => (
    <div className="product-detail-wrapper">
      <div className="heading">
        <h3>Chi tiết sản phẩm</h3>
      </div>
      <div className={`content ${isExpanded ? "expanded" : ""}`}>
        <p>{selectedProduct.description_product}</p>
        <button onClick={handleToggleDetails} aria-expanded={isExpanded}>
          {isExpanded ? "Thu gọn" : "Xem thêm"}{" "}
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
    </div>
  );

  const ProductCard = ({ product }) => (
    <div className="product-item" key={product.id_product}>
      <div className="top-item">
        <div className="image">
          <a href="#">
            <img src={product.image_product} alt={product.name_product} />
          </a>
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
          <div className="rate" data-rate="5">
            <div className="stars">
              {[...Array(5)].map((_, i) => {
                const rating = product.star_comment_rate;
                if (i < Math.floor(rating)) {
                  // Full star
                  return <FaStar key={i} className="star active" />;
                } else if (i < rating) {
                  // Half star
                  return <FaStarHalfAlt key={i} className="star half-active" />;
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
  );

  const RelatedProducts = () => (
    <div className="related-products-wrapper other-wrapper">
      <div className="heading">
        <h3 className="shine-title">Sản Phẩm Tương Tự</h3>
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
      <div className="list-item">
        <div className="swiper-container">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <Swiper
                spaceBetween={30}
                slidesPerView={4}
                autoplay={{
                  delay: 3000, // Adjust delay time in milliseconds
                  disableOnInteraction: false, // Keep autoplay running after user interaction
                }}
              >
                {relatedproducts.map((product, index) => (
                  <SwiperSlide key={index}>
                    <ProductCard product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mediaType, setMediaType] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaName, setMediaName] = useState("");
  const openModal = (fileType, fileUrl, fileName) => {
    setMediaType(fileType);
    setMediaUrl(fileUrl);
    setMediaName(fileName);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const ReviewItem = ({ review }) => (
    <div className="review-item" key={review.comment_id}>
      <figure>
        <div className="image">
          <img
            src={review.user_avatar}
            alt={`Review of ${review.user_fullname}`}
          />
        </div>
        <figcaption>
          <div className="form-group">
            <h5>{review.user_fullname}</h5>
            <div className="stars">
              {[...Array(5)].map((_, i) => {
                const rating = review.comment_star;
                if (i < Math.floor(rating)) {
                  // Full star
                  return <FaStar key={i} className="star active" />;
                } else if (i < rating) {
                  // Half star
                  return <FaStarHalfAlt key={i} className="star half-active" />;
                } else {
                  // Empty star
                  return <FaRegStar key={i} className="star" />;
                }
              })}
            </div>
            <p>
              {moment(review.comment_created_date)
                .locale("vi", vi)
                .format("DD/MM/YYYY, HH:mm")}
            </p>
            <br></br>
            <p>{review.comment_content}</p>
            <br></br>
          </div>
          <div className="form-group">
            {review.comment_files.length > 0 && (
              <ul className="file-list">
                {review.comment_files.map((file, index) => {
                  const isImage = file.file_resource_type.startsWith("image");
                  const isVideo = file.file_resource_type.startsWith("video");

                  return (
                    <li key={index} className="file-item">
                      {isImage && (
                        <img
                          src={file.file_url}
                          alt={file.file_name}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            openModal(
                              file.file_resource_type,
                              file.file_url,
                              file.file_name
                            )
                          }
                        />
                      )}
                      {isVideo && (
                        <video
                          src={file.file_url}
                          controls
                          style={{
                            width: "150px",
                            height: "100px",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            openModal(
                              file.file_resource_type,
                              file.file_url,
                              file.file_name
                            )
                          }
                        ></video>
                      )}
                      <p>{file.file_name}</p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </figcaption>
        {user !== null && user.id === review.user_id ? (
          <div className="delete-icon-wrapper">
            <FaTrash
              onClick={() => delComment(review.comment_id)}
              style={{
                color: "red",
                cursor: "pointer",
                fontSize: "1.2rem",
              }}
              title={`Delete comment ${review.comment_id}`}
            />
          </div>
        ) : null}
      </figure>
      {/* Modal for viewing details */}
      <Modal
        isOpen={isModalOpen}
        close={closeModal}
        mediaType={mediaType}
        mediaUrl={mediaUrl}
        mediaName={mediaName}
      />
    </div>
  );

  const ReviewProducts = ({ reviews }) => (
    <div className="product-reviews-wrapper other-wrapper">
      <div className="heading">
        <h3 className="shine-title">Đánh giá sản phẩm</h3>
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
      <div className="list-item">
        <div className="swiper-container">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <Swiper
                spaceBetween={30}
                slidesPerView={4}
                autoplay={{
                  delay: 3000, // Adjust delay time in milliseconds
                  disableOnInteraction: false, // Keep autoplay running after user interaction
                }}
              >
                {reviews.map((review, index) => (
                  <SwiperSlide key={index}>
                    <ReviewItem key={index} review={review} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <main className="san-pham-ct-page">
      <section className="product-detail py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <ProductImages selectedProduct={selectedProduct} />
            </div>
            <div className="col-lg-6">
              <ProductInfo selectedProduct={selectedProduct} />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <ProductInfoDetails selectedProduct={selectedProduct} />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <RelatedProducts />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <ReviewProducts reviews={reviews} />
            </div>
          </div>
          {user ? (
            <>
              <section className="comment-section">
                <h3>Hãy để lại đánh giá sản phẩm nha!</h3>
                <CommentForm
                  selected_product_id={selected_product_id}
                  loadInfoDetailsOfProduct={loadInfoDetailsOfProduct}
                />
              </section>
            </>
          ) : (
            <>
              <div className="row">
                <section className="comment-section">
                  <Link
                    to="/login"
                    state={{
                      from: `/products/${selected_product_id}/info-details`,
                    }}
                  >
                    <FaSignInAlt /> Bạn có thể để lại đánh giá bằng cách đăng
                    nhập đó ^_^
                  </Link>
                </section>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;
