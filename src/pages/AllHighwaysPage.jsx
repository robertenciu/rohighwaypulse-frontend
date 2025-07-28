import HighwayCards from "../components/HighwayCards";
import React, { useEffect, useState } from "react";

function HighwayPage() {
  const [highways, setHighways] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/highways", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setHighways(data);
      })
      .catch((error) => console.error("Eroare la fetch:", error));
  }, []);

  return (
    <>
      <h2 className="my-3 display-3 fade-in text-center">Autostrăzi</h2>
      <hr className="hr"></hr>
      <HighwayCards highways={highways} />
      {/* Scroll up button to add */}
    </>
  );
}

export default HighwayPage;
