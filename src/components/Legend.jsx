function Legend() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 20,
        right: 20,
        background: "white",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "14px",
        zIndex: 9999,
      }}
    >
      <div>
        <span
          style={{
            backgroundColor: "#198754",
            display: "inline-block",
            width: 12,
            height: 12,
            marginRight: 6,
          }}
        ></span>{" "}
        Autostrăzi finalizate
      </div>
      <div>
        <span
          style={{
            backgroundColor: "red",
            display: "inline-block",
            width: 12,
            height: 12,
            marginRight: 6,
          }}
        ></span>{" "}
        În construcție
      </div>
      <div>
        <span
          style={{
            backgroundColor: "gray",
            display: "inline-block",
            width: 12,
            height: 12,
            marginRight: 6,
          }}
        ></span>{" "}
        Planificate
      </div>
      <div>
        <span
          style={{
            backgroundColor: "#62ff00",
            display: "inline-block",
            width: 12,
            height: 12,
            marginRight: 6,
          }}
        ></span>
        {" Progres 80% - 100%"}
      </div>
      <div>
        <span
          style={{
            backgroundColor: "#00ffae",
            display: "inline-block",
            width: 12,
            height: 12,
            marginRight: 6,
          }}
        ></span>
        {" Progres 60% - 80%"}
      </div>
      <div>
        <span
          style={{
            backgroundColor: "#fff700",
            display: "inline-block",
            width: 12,
            height: 12,
            marginRight: 6,
          }}
        ></span>
        {" Progres 40% - 60%"}
      </div>
      <div>
        <span
          style={{
            backgroundColor: "#ff6f00",
            display: "inline-block",
            width: 12,
            height: 12,
            marginRight: 6,
          }}
        ></span>
        {" Progres 20% - 40%"}
      </div>
      <div>
        <span
          style={{
            backgroundColor: "red",
            display: "inline-block",
            width: 12,
            height: 12,
            marginRight: 6,
          }}
        ></span>
        {" Progres 0% - 20%"}
      </div>
      <div>
        <span
          style={{
            backgroundColor: "#990000",
            display: "inline-block",
            width: 12,
            height: 12,
            marginRight: 6,
          }}
        ></span>
        {" Licitație finalizată"}
      </div>
      <div>
        <span
          style={{
            backgroundColor: "black",
            display: "inline-block",
            width: 12,
            height: 12,
            marginRight: 6,
          }}
        ></span>
        {" Tunel"}
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: 17,
            height: 0,
            borderTop: "2px dashed #7ca2de",
            marginRight: 6,
          }}
        ></div>
        {" Pod"}
      </div>
    </div>
  );
}

export default Legend;
