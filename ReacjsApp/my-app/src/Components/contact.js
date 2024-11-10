import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "../Template/shine/dist/css/core.min.css";
import "../Template/shine/dist/css/main.min.css";

const Contact = () => {
  const form = useRef();
  const REACT_APP_ServiceID = process.env.REACT_APP_ServiceID;
  const REACT_APP_TemplateID = process.env.REACT_APP_TemplateID;
  const REACT_APP_FormID = process.env.REACT_APP_FormID;

  const sendEmail = (e) => {
    // console.log(REACT_APP_ServiceID);
    // console.log(REACT_APP_TemplateID);
    // console.log(REACT_APP_FormID);
    e.preventDefault();

    emailjs
      .sendForm(
        REACT_APP_ServiceID,
        REACT_APP_TemplateID,
        form.current,
        REACT_APP_FormID
      )
      .then(
        () => {
          console.log("SUCCESS!");
          alert(
            "Thành Công",
            "Mail của bạn đã được gửi tới quản trị viên hệ thống thành công!"
          );
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <main>
      <section className="contact main-section">
        <div className="container">
          <h2 className="main-title">Liên hệ</h2>
          <div className="content-section">
            <p>
              Hãy gửi các phản hồi bất kỳ vấn đề nào về cho chúng tôi để mang
              lại cho bạn trải nghiệm tốt nhất
            </p>
          </div>
          <form ref={form} onSubmit={sendEmail}>
            <div className="form-wrapper">
              {[
                { label: "Họ và tên", type: "text", name: "user_name" },
                { label: "Email", type: "email", name: "user_email" },
                { label: "Số điện thoại", type: "tel", name: "user_phone" },
                { label: "Tiêu đề", type: "text", name: "subject" },
                { label: "Nội dung", type: "textarea", name: "descriptions" },
              ].map((field, index) => (
                <div className="form-group" key={index}>
                  <label>
                    {field.label}
                    <span>*</span>
                  </label>
                  {field.type === "textarea" ? (
                    <textarea name={field.name} rows="10" cols="30" required />
                  ) : (
                    <input type={field.type} name={field.name} required />
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
