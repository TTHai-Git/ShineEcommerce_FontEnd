import React, { useContext, useEffect } from "react";
import "../Template/shine/dist/css/core.min.css";
import "../Template/shine/dist/css/main.min.css";
import "../Template/shine/dist/css/main.min.css.map";

import mainlogo from "../Template/shine/dist/img/logo.png";
import ic_1 from "../Template/shine/dist/img/ic-1.png";
import ic_2 from "../Template/shine/dist/img/ic-2.png";
// Assuming you have CSS for styling
import { FaAlignLeft, FaShoppingBasket } from "react-icons/fa"; // Using react-icons for icons
import { MdPhone, MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import { MyDispatchContext, MyUserContext } from "../Config/contexts";
import { logOut } from "../Config/reducers";

function Header() {
  const user = useContext(MyUserContext);
  const dispatch = useContext(MyDispatchContext);
  useEffect(() => {}, [user.user]);
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
          <div className="search-icon">
            <MdSearch />
          </div>
          <div className="search-wrapper">
            <div className="searchbox">
              <input type="text" placeholder="Bạn tìm sản phẩm gì hôm nay?" />
              <button type="submit">
                <MdSearch />
              </button>
            </div>
          </div>

          {/* Top List Section */}
          <div className="top-list-wrapper">
            <ul>
              <li>
                <a href="#">
                  <span className="ic">
                    <img src={ic_1} alt="" />
                  </span>
                  Kinh nghiệm hay
                </a>
              </li>
              <li className="user-wrapper">
                {user.user !== null ? (
                  <>
                    <span className="ic">
                      <img src={ic_2} alt={ic_2} />
                      Chào, {user.user.last_name} {user.user.first_name}
                    </span>
                    <ul className="nav-user">
                      <li onClick={() => logOut(dispatch)}>Thoát</li>
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
                    <FaShoppingBasket />
                    <span>0</span>
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
            <ul className="semi hidden-wrapper">
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
