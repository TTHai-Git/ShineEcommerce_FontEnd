import "../Template/shine/dist/css/Modal.css";

import { useState } from "react";

const Modal = ({ isOpen, close, mediaType, mediaUrl, mediaName }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const modalRef = useState(null); // Create a ref to access the modal element

  // Function to toggle fullscreen mode
  const toggleFullscreen = () => {
    if (modalRef.current) {
      if (!isFullscreen) {
        // Try to make the modal go fullscreen
        if (modalRef.current.requestFullscreen) {
          modalRef.current.requestFullscreen();
        } else if (modalRef.current.mozRequestFullScreen) {
          // Firefox
          modalRef.current.mozRequestFullScreen();
        } else if (modalRef.current.webkitRequestFullscreen) {
          // Chrome, Safari and Opera
          modalRef.current.webkitRequestFullscreen();
        } else if (modalRef.current.msRequestFullscreen) {
          // Internet Explorer/Edge
          modalRef.current.msRequestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          // Firefox
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          // Chrome, Safari and Opera
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          // Internet Explorer/Edge
          document.msExitFullscreen();
        }
        setIsFullscreen(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={close}>
      <div
        className="modal-content"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        {mediaType.startsWith("image") ? (
          <img
            src={mediaUrl}
            alt={mediaName}
            style={{
              width: isFullscreen ? "100vw" : "100%",
              height: isFullscreen ? "100vh" : "auto",
            }}
          />
        ) : mediaType.startsWith("video") ? (
          <video
            src={mediaUrl}
            controls
            style={{
              width: isFullscreen ? "100vw" : "100%",
              height: isFullscreen ? "100vh" : "auto",
            }}
          />
        ) : null}
        <p>{mediaName}</p>
        <button onClick={toggleFullscreen}>
          {isFullscreen ? "Exit Fullscreen" : "Go Fullscreen"}
        </button>
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
