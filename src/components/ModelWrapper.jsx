import { createPortal } from "react-dom";
import { useEffect } from "react";
function ModelWrapper({ onClose, children }) {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
  const modalOverlayStyle = {
    paddingTop: "80px",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    backdropFilter: "blur(10px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  };
  return createPortal(
    <div style={modalOverlayStyle} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>,
    document.body
  );
}

export default ModelWrapper;
