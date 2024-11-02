import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import APIs, { endpoints } from "../Config/APIs";
import moment from "moment";
import "moment/locale/vi";

moment.locale("vi"); // Set locale to Vietnamese once

const BlogDetail = () => {
  const { blog_id } = useParams();
  const [blogDetail, setBlogDetail] = useState(null);
  const [newBlogs, setNewBlogs] = useState([]);

  const loadInfoDetailsOfBlog = async () => {
    try {
      const { data } = await APIs.get(
        endpoints["load-blog-info-detail"](blog_id)
      );
      setBlogDetail(data.results);
    } catch (error) {
      console.error("Error loading blog details:", error);
    }
  };

  const loadNewBlogs = async () => {
    try {
      const { data } = await APIs.get(endpoints["load-new-blogs"]);
      setNewBlogs(data.results);
    } catch (error) {
      console.error("Error loading new blogs:", error);
    }
  };

  useEffect(() => {
    loadInfoDetailsOfBlog();
    loadNewBlogs();
  }, [blog_id]);

  const BlogMain = ({ blog }) => (
    <div className="col-lg-8" key={blog?.blog_id}>
      <div className="heading">
        <time>{moment(blog?.blog_created_date).format("DD/MM/YYYY")}</time>
        <h2 className="tt-title">{blog?.blog_title}</h2>
      </div>
      <div className="full-content">
        <p>{blog?.blog_content}</p>
      </div>
      <div className="social-share"></div>
    </div>
  );

  const BlogsRelatedItem = ({ blog }) => (
    <div className="col-sm-6 col-lg-12 news-other-item" key={blog?.blog_id}>
      <Link to={`/blogs/${blog.blog_id}/info-details`}>
        <figure>
          <div className="image">
            <img src={blog.blog_image} alt={blog.blog_title} />
          </div>
          <figcaption>
            <time>{moment(blog.blog_created_date).format("DD/MM/YYYY")}</time>
            <h5>{blog.blog_title}</h5>
          </figcaption>
        </figure>
      </Link>
    </div>
  );

  const renderBlogsRelated = () =>
    newBlogs
      .filter((newBlog) => newBlog.blog_id.toString() !== blog_id.toString())
      .map((newBlog) => (
        <BlogsRelatedItem blog={newBlog} key={newBlog.blog_id} />
      ));

  return (
    <>
      <main>
        <section className="news-detail main-section">
          <div className="container">
            <div className="row">
              {blogDetail ? <BlogMain blog={blogDetail} /> : <p>Loading...</p>}
              <div className="col-lg-4">
                <div className="news-other-heading">
                  <h3 className="tt-title">Blog Làm Đẹp Khác</h3>
                </div>
                <div className="news-other-list row">
                  {renderBlogsRelated()}
                </div>
              </div>
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
    </>
  );
};

export default BlogDetail;
