import React, { useEffect, useState } from "react";
import "../Template/shine/dist/css/core.min.css";
import "../Template/shine/dist/css/main.min.css";
import "../Template/shine/dist/css/main.min.css.map";
import APIs, { endpoints } from "../Config/APIs";
import moment from "moment";
import vi from "moment/locale/vi";
import { Link } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(null);

  const loadBlogs = async () => {
    const { data } = await APIs.get(endpoints["load-new-blogs"]);
    console.log(data.results);
    setBlogs(data.results);
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const BlogItem = ({ blog }) => (
    <div className="news-item" key={blog.id}>
      <figure>
        <div className="image">
          <a href="#">
            <img src={blog.blog_image} alt={blog.blog_title} />
          </a>
        </div>
        <figcaption>
          <time>
            <a href="#">
              {moment(blog.blog_created_date)
                .locale("vi", vi)
                .format("dddd, DD/MM/YYYY, HH:mm")}
            </a>
          </time>
          <h4>
            <a href="#">{blog.blog_title}</a>
          </h4>
          <div className="content">
            <p>{blog.blog_description}</p>
          </div>
          <Link
            className="btn-viewmore"
            to={`/blogs/${blog.blog_id}/info-details`}
          >
            Xem thêm
          </Link>
        </figcaption>
      </figure>
    </div>
  );

  return (
    <body className="thanh-toan-page">
      <main>
        <section className="tin-tuc main-section">
          <div className="container">
            <h2 className="main-title">Tổng Hợp Các Blog Làm Đẹp Nổi Bật</h2>
            <div className="news-list">
              <div className="row">
                {blogs.map((blog) => (
                  <div className="col-md-6 col-lg-4 item" key={blog.id}>
                    <BlogItem blog={blog} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </body>
  );
};

export default Blog;
