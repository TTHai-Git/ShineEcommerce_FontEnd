import React from "react";
import "../Template/shine/dist/css/core.min.css";
import "../Template/shine/dist/css/main.min.css";
import "../Template/shine/dist/css/main.min.css.map";

const Contact = () => {
  return (
    <main>
      <section className="contact main-section">
        <div className="container">
          <h2 className="main-title">Liên hệ</h2>
          <div className="content-section">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              quis nisi facere quibusdam ipsam. Exercitationem, culpa deleniti
              tempora rem cum minima obcaecati alias sequi ullam? Mollitia
              delectus error quaerat laudantium.
            </p>
          </div>
          <form>
            <div className="form-wrapper">
              {[
                "Họ và tên",
                "Email",
                "Số điện thoại",
                "Tiêu đề",
                "Nội dung",
              ].map((label, index) => (
                <div className="form-group" key={index}>
                  <label>
                    {label}
                    <span>*</span>
                  </label>
                  {label === "Nội dung" ? (
                    <textarea rows="10" cols="30" required />
                  ) : (
                    <input
                      type={
                        label === "Email"
                          ? "email"
                          : label === "Số điện thoại"
                          ? "number"
                          : "text"
                      }
                      required
                    />
                  )}
                </div>
              ))}
              <div className="form-btn">
                <button type="submit">Gửi</button>
              </div>
            </div>
          </form>
          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.188537504888!2d106.63359591533873!3d10.796867461767055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529547d2f3197%3A0x177eaa5c4aa9867d!2zxJDGsOG7nW5nIFRy4bqnbiBU4bqlbiwgVMOibiBTxqFuIE5ow6wsIFTDom4gUGjDuiwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1604683272358!5m2!1svi!2s"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
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
  );
};

export default Contact;
