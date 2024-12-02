import React, { useContext, useEffect, useState } from "react";
import "../Template/shine/dist/css/core.min.css";
import "../Template/shine/dist/css/main.min.css";
import "../Template/shine/dist/css/SearchProductsByKw.css";
import "../Template/shine/dist/css/main.min.css.map";

import mainlogo from "../Template/shine/dist/img/logo.png";
import ic_1 from "../Template/shine/dist/img/ic-1.png";
import ic_2 from "../Template/shine/dist/img/ic-2.png";
import ic_cart from "../Template/shine/dist/img/cart.png";
// Assuming you have CSS for styling
import { FaAlignLeft, FaBell, FaShoppingBasket } from "react-icons/fa"; // Using react-icons for icons
import { MdPhone, MdSearch } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { MyDispatchContext, MyUserContext } from "../Config/contexts";
import { logOut } from "../Config/reducers";
import APIs, { endpoints } from "../Config/APIs";
import { useCart } from "../Config/CartContext";
import { formatCurrency } from "../Convert/formatcurrency";

function Header() {
  const { user } = useContext(MyUserContext);
  const { cartItems } = useCart();
  const dispatch = useContext(MyDispatchContext);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const [kw, setKw] = useState(null);
  const [suggestions, setSuggestions] = useState([]); // Suggestions state
  const [showSuggestions, setShowSuggestions] = useState(false); // Show/hide dropdown
  const [loading, setLoading] = useState(false);
  const loadCategories = async () => {
    try {
      const { data } = await APIs.get(endpoints["load-category"]);
      setCategories(data.results);
      // console.log(data.results);
    } catch (ex) {
      console.log(ex);
    }
  };

  const loadTags = async () => {
    try {
      const { data } = await APIs.get(endpoints["load-tag"]);
      setTags(data.results);
      // console.log(data.results);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {}, [user, cartItems.length, kw]);
  useEffect(() => {
    loadCategories();
    loadTags();
  }, []);

  const handleLogOut = () => {
    logOut(dispatch);
    navigate("/login");
  };

  const handleOnChange = async (value) => {
    setKw(value);
    if (value.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
    } else {
      try {
        const { data } = await APIs.get(
          `${endpoints["search-products-by-keyword"]}?keyword=${value}`
        );
        setSuggestions(data.results);
        setShowSuggestions(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const searchProductsWithKeywords = async () => {
    navigate(`/products/search/?keyword=${kw}`);
    setShowSuggestions(false);
  };

  return (
    <header className="semi">
      <div className="container">
        <div className="backdrop-wrapper"></div>
        <div className="mobile-wrapper"></div>

        {/* Top Wrapper */}
        <div className="top-wrapper">
          <div className="logo-wrapper">
            <a href="/">
              <img src={mainlogo} alt="Logo" />
            </a>
          </div>

          {/* Search Section */}
          <div className="search-wrapper">
            <div className="searchbox">
              <input
                type="text"
                placeholder="Bạn tìm sản phẩm gì hôm nay?"
                value={kw}
                onChange={(e) => handleOnChange(e.target.value)}
                onFocus={() => setShowSuggestions(suggestions.length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
              <button
                type="submit"
                onClick={() => searchProductsWithKeywords()}
              >
                <MdSearch />
              </button>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && (
              <div className="suggestions-dropdown">
                {suggestions.length > 0 ? (
                  <ul>
                    {suggestions.map((product) => (
                      <li
                        key={product.id_product}
                        onClick={() => {
                          navigate(
                            `products/${product.id_product}/info-details`
                          );
                          setShowSuggestions(false);
                        }}
                      >
                        <img
                          src={product.image_product}
                          alt={product.name_product}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            cursor: "pointer",
                          }}
                        />
                        <div className="suggestion-item">
                          <p className="product-name">{product.name_product}</p>
                          <p className="product-price">
                            {formatCurrency(`${product.present_price_product}`)}
                          </p>
                        </div>
                      </li>
                    ))}
                    {suggestions.length > 5 && (
                      <li
                        className="see-more"
                        onClick={() =>
                          navigate(`/products/search/?keyword=${kw}`)
                        }
                      >
                        Xem thêm sản phẩm
                      </li>
                    )}
                  </ul>
                ) : (
                  <div className="no-results">
                    Không tìm thấy sản phẩm nào tên là "{kw}..."
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Top List Section */}
          <div className="top-list-wrapper">
            <ul>
              {user !== null ? (
                <>
                  <li>
                    <Link to={`/users/${user.id}/orders`}>
                      <span className="ic">
                        <img src={ic_1} alt="" />
                      </span>
                      Đơn Hàng
                    </Link>
                  </li>
                  <li>
                    <Link to={`/users/${user.id}/notifications`}>
                      <span className="ic">
                        <FaBell />
                      </span>
                      Thông Báo
                    </Link>
                  </li>
                </>
              ) : (
                <></>
              )}

              <li className="user-wrapper">
                {user !== null ? (
                  <>
                    <span className="ic">
                      <img src={ic_2} alt={ic_2} />
                      {/* Chào, {user.last_name} {user.first_name} */}
                      Chào, {user.username}
                    </span>

                    <ul className="nav-user">
                      <Link to="/users/current-user">Thông Tin</Link>
                      <br></br>
                      <li onClick={() => handleLogOut()}>Đăng Xuất</li>
                    </ul>
                  </>
                ) : (
                  <>
                    <span className="ic">
                      <img src={ic_2} alt={ic_2} />
                      Tài khoản
                    </span>
                    <ul className="nav-user">
                      <li>
                        <Link to="/login">Đăng Nhập</Link>
                      </li>
                      <li>
                        <Link to="/register">Đăng Ký</Link>
                      </li>
                    </ul>
                  </>
                )}
              </li>
              <li>
                <Link to="/cart">
                  <span className="ic">
                    <img src={ic_cart} alt={ic_cart} />
                    <span>{cartItems.length}</span>
                  </span>
                  Giỏ hàng
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Wrapper */}
        <div className="bottom-wrapper">
          {/* Toggle Section */}
          <div className="toggle-wrapper black">
            <FaAlignLeft />
            <span>Danh mục sản phẩm</span>
            {/* <ul className="semi hidden-wrapper">
              {[
                "Chăm Sóc Da Mặt",
                "Chăm Sóc Tóc",
                "Chăm Sóc Body",
                "Mỹ Phẩm Trang Điểm",
                "Dụng Cụ Giúp Làm Đẹp",
              ].map((category, index) => (
                <li key={index} className="has-drop">
                  <a href="#">{category}</a>
                  <ul>
                    {Array(4)
                      .fill("Chăm sóc da mặt")
                      .map((item, i) => (
                        <li key={i}>
                          <a href="#">{item}</a>
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
              <li>
                <a href="#">Sản Phẩm Mới</a>
              </li>
              <li>
                <a href="#">Sản Phẩm Khuyến Mãi</a>
              </li>
              <li>
                <a href="#">Sản Phẩm Hot</a>
              </li>
              <li>
                <a href="#">Bí Kíp Làm Đẹp</a>
              </li>
            </ul> */}
            <ul className="semi hidden-wrapper">
              {categories.map((category) => (
                <li key={category.id} className="has-drop">
                  <Link to={`/categories/${category.id}/list-product`}>
                    {category.name}
                  </Link>
                  <ul>
                    {tags.map((tag) => (
                      <li key={tag.id}>
                        <Link to={`/categories/${category.id}/list-product`}>
                          {tag.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          {/* Main Navigation */}
          <div className="main-list-wrapper black">
            <ul>
              <li>
                <Link to="/">Trang Chủ</Link>
              </li>
              <li>
                <Link to="/about">Thông Tin Công Ty</Link>
              </li>
              <li>
                <Link to="/blogs">Blog làm đẹp</Link>
              </li>
              <li>
                <Link to="/contact">Hỗ Trợ Khách Hàng</Link>
              </li>
            </ul>
          </div>

          {/* Phone Section */}
          <div className="phone-wrapper">
            <a href="tel:0915948855">
              <MdPhone /> 0915 948 855 - 0961 324 950
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
