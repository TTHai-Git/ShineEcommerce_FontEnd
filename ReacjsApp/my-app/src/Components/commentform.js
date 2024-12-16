import React, { useContext, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "../Template/shine/dist/css/CommentForm.css";
import "../Template/shine/dist/css/StarCommentRate.css";
import { authApi, endpoints } from "../Config/APIs";
import { MyUserContext } from "../Config/contexts";
import { useNavigate } from "react-router-dom";

function CommentForm({ selected_product_id, loadInfoDetailsOfProduct }) {
  const [content, setContent] = useState("");
  const [star, setStar] = useState(0);
  const [hoverStar, setHoverStar] = useState(null); // For hover functionality
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { user } = useContext(MyUserContext);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    // Filter files larger than 2MB
    const validFiles = files.filter((file) => {
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > 2) {
        alert(`${file.name} exceeds 2MB and will not be uploaded.`);
        return false;
      }
      return true;
    });

    setSelectedFiles((prev) => [...prev, ...validFiles]);
  };

  const handleRemoveFile = (fileIndex) => {
    setSelectedFiles((prev) => prev.filter((_, index) => index !== fileIndex));
  };

  const handleAddComment = async (event) => {
    event.preventDefault();

    if (star === 0) {
      alert("Please provide a rating.");
      return;
    }

    if (content.trim() === "") {
      alert("Content cannot be empty.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("star", star);

      selectedFiles.forEach((file) => {
        formData.append("files", file); // Use a consistent field name
      });

      const url = `${endpoints["add-comment"](selected_product_id)}`;
      const res = await authApi(user.access_token).post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(res.data.message);

      // Clear all fields in the form
      setContent("");
      setStar(0);
      setSelectedFiles([]);
      navigate(`/products/${selected_product_id}/info-details`);
      loadInfoDetailsOfProduct();
    } catch (err) {
      console.error("Failed to add comment:", err);
      alert("Failed to add comment. Please try again.");
    }
  };

  return (
    <form onSubmit={handleAddComment} className="comment-form">
      <div className="form-group">
        <label htmlFor="comment-content">Your Comment</label>
        <textarea
          id="comment-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your comment..."
          required
        ></textarea>
      </div>

      <div className="form-group">
        <label>Rate this product</label>
        <div
          className="stars"
          onMouseLeave={() => setHoverStar(null)} // Reset hover on mouse leave
        >
          {[...Array(5)].map((_, i) => {
            const fullValue = i + 1; // Full star value
            const halfValue = i + 0.5; // Half star value

            const isActive = hoverStar
              ? hoverStar >= fullValue
              : star >= fullValue;
            const isHalfActive = hoverStar
              ? hoverStar >= halfValue && hoverStar < fullValue
              : star >= halfValue && star < fullValue;

            return (
              <span
                key={i}
                onMouseEnter={() => setHoverStar(fullValue)}
                onClick={() => setStar(fullValue)}
              >
                {isActive ? (
                  <FaStar className="star active" />
                ) : isHalfActive ? (
                  <FaStarHalfAlt className="star half-active" />
                ) : (
                  <FaRegStar className="star" />
                )}
              </span>
            );
          })}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="file-upload">Upload Images or Videos</label>
        <input
          type="file"
          id="file-upload"
          accept="image/*,video/*"
          multiple
          onChange={handleFileChange}
        />
        {selectedFiles.length > 0 && (
          <ul className="file-list">
            {selectedFiles.map((file, index) => {
              const fileURL = URL.createObjectURL(file);
              const isImage = file.type.startsWith("image/");
              const isVideo = file.type.startsWith("video/");

              return (
                <li key={index} className="file-item">
                  {isImage && (
                    <img
                      src={fileURL}
                      alt={file.name}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  {isVideo && (
                    <video
                      src={fileURL}
                      controls
                      style={{ width: "150px", height: "100px" }}
                    ></video>
                  )}
                  <p>{file.name}</p>
                  <button
                    type="button"
                    className="remove-file-btn"
                    onClick={() => handleRemoveFile(index)}
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <button type="submit" className="btn-submit">
        Submit Comment
      </button>
    </form>
  );
}

export default CommentForm;
