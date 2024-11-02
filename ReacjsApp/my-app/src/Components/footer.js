import React, { useState } from "react";
import "../Template/shine/dist/css/core.min.css";
import "../Template/shine/dist/css/main.min.css";
import "../Template/shine/dist/css/main.min.css.map";
import cer_img from "../Template/shine/dist/img/cer.png";
import img_3 from "../Template/shine/dist/img/img-3.png";

function Footer() {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send email to backend or show confirmation)
    alert(`Subscribed with: ${email}`);
    setEmail(""); // Clear the input field after submission
  };

  return (
    <div>
      {/* Newsletter Section */}
      <section className="newsletter py-3">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="heading-wrapper">
                <div className="ic">
                  <img src={img_3} alt="Newsletter Icon" />
                </div>
                <div className="text">
                  <h3>Đăng ký nhận bản tin</h3>
                  <p>Đăng ký ngay để nhận thông tin khuyến mãi mới nhất</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <form className="form-wrapper" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Nhập địa chỉ email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                <button type="submit">Đăng ký</button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="container">
          <div className="top-wrapper">
            <div className="row">
              {/* Contact Section */}
              <div className="col-lg-3 col-md-6 ft-col">
                <div className="text-wrap">
                  <h4>Liên hệ</h4>
                  <p>
                    <em className="mdi mdi-map-marker"></em> 198 Hoàng Văn Thụ,
                    Phường 9, Quận Phú Nhuận, TP. HCM
                  </p>
                  <p>
                    <em className="mdi mdi-phone"></em> 0915 948 855 - 0961 324
                    950
                  </p>
                  <p>
                    <em className="mdi mdi-email"></em> cskh@khakim.com
                  </p>
                </div>
              </div>

              {/* Quick Links Section */}
              <div className="col-lg-3 col-md-6 ft-col">
                <div className="text-wrap">
                  <h4>Liên kết nhanh</h4>
                  <ul>
                    {[
                      "Thông tin công ty",
                      "Blog làm đẹp",
                      "Hỗ trợ khách hàng",
                      "Tuyển dụng",
                      "Liên hệ",
                    ].map((item, index) => (
                      <li key={index}>
                        <a href="#">{item}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Customer Support Section */}
              <div className="col-lg-3 col-md-6 ft-col">
                <div className="text-wrap">
                  <h4>Hỗ trợ khách hàng</h4>
                  <ul>
                    {[
                      "Theo dõi đơn hàng",
                      "Hướng dẫn mua hàng",
                      "Chính sách mua hàng",
                      "Chính sách đổi trả, hoàn tiền",
                      "Chính sách bảo mật",
                      "Quy chế hoạt động",
                    ].map((item, index) => (
                      <li key={index}>
                        <a href="#">{item}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Social Links Section */}
              <div className="col-lg-3 col-md-6 ft-col">
                <div className="text-wrap social">
                  <h4>Kết nối với chúng tôi</h4>
                  <ul>
                    {["facebook", "youtube-play", "twitter", "instagram"].map(
                      (platform, index) => (
                        <li key={index}>
                          <a href="#">
                            <em className={`fa fa-${platform}`}></em>
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                  <div className="certification">
                    <img src={cer_img} alt="Certification" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="bottom-wrapper">
            <div className="copyright">
              <p>
                2019 © The Shine Shop.
                <a
                  href="https://www.canhcam.vn/thiet-ke-website"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Thiết kế website{" "}
                </a>{" "}
                bởi
                <a
                  href="https://www.canhcam.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Cánh Cam
                </a>
                .
              </p>
            </div>
            <div className="sub-list">
              <ul>
                <li>
                  <a href="#">Điều khoản sử dụng</a>
                </li>
                <li>
                  <a href="#">Chính sách bảo mật</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
