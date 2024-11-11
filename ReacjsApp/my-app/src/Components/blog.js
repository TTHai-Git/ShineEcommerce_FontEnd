import React, { useEffect, useState } from "react";
import "../Template/shine/dist/css/core.min.css";
import "../Template/shine/dist/css/main.min.css";
import "../Template/shine/dist/css/main.min.css.map";
import APIs, { endpoints } from "../Config/APIs";
import moment from "moment";
import vi from "moment/locale/vi";
import { Link, useNavigate } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [endPage, setEndPage] = useState(false);
  const navigate = useNavigate();

  const loadBlogs = async () => {
    let url = `${endpoints["load-new-blogs"]}`;
    const params = new URLSearchParams();
    params.append("page", page);
    url += `?${params.toString()}`;
    const res = await APIs.get(url);
    navigate(`/blogs?${params.toString()}`);
    // console.log(res.data);
    if (page === 1) {
      setBlogs(res.data.results);
    } else {
      setBlogs((current) => [...current, ...res.data.results]);
    }

    // Update end page status
    setEndPage(res.data.next === null);
  };

  useEffect(() => {
    loadBlogs();
  }, [page]);

  const handelSetPageIncrease = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Decrease page handler with minimum limit
  const handelSetPageDecrease = () => {
    setPage((prevPage) => prevPage - prevPage + 1);
  };

  const BlogItem = ({ blog }) => (
    <div className="news-item" key={blog.blog_id}>
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
            Xem Chi tiết
          </Link>
        </figcaption>
      </figure>
    </div>
  );

  return (
    <main>
      <section className="tin-tuc main-section">
        <div className="container">
          <h2 className="main-title">Tổng Hợp Các Blog Làm Đẹp Nổi Bật</h2>
          <div className="news-list">
            <div className="row">
              {blogs.map((blog) => (
                <div className="col-md-6 col-lg-4 item" key={blog.blog_id}>
                  <BlogItem blog={blog} />
                </div>
              ))}
            </div>
            <div className="button">
              {endPage === false ? (
                <>
                  <Link
                    className="view-more-button"
                    to="#"
                    onClick={() => handelSetPageIncrease()}
                  >
                    Xem thêm
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    className="view-more-button"
                    to="#"
                    onClick={() => handelSetPageDecrease()}
                  >
                    Thu gọn
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;
