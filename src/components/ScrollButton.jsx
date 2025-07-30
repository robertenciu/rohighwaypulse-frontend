import React, { useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  window.addEventListener("scroll", toggleVisible);
  const iconStyle = {
    position: "fixed",
    bottom: "30px",
    right: "2.3%",
    zIndex: 1000,
    display: visible ? "inline-flex" : "none",
    color: "white",
    cursor: "pointer",
    fontSize: "3em",
    boxShadow: "-7px 7px 10px rgba(0, 0, 0, 0.65)",
    borderRadius: "50%",
  };
  return (
    <i
      className="bi bi-arrow-up-circle-fill fade-in"
      onClick={scrollToTop}
      style={iconStyle}
    ></i>
  );
};

export default ScrollButton;
