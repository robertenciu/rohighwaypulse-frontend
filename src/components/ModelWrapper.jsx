function ModelWrapper({ onClose, children }) {
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
    zIndex: 10,
  };
  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

export default ModelWrapper;
