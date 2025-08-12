import React, { useEffect, useState } from "react";
import TotalKmsChart from "../components/TotalKmsChart";
import RomaniaMap from "../components/RomaniaMap";
import LazyRenderComponent from "../components/LazyRenderComponent";
import Timeline from "../components/Timeline";
function HomePage() {
  return (
    <>
      <h2 className="my-3 display-3 fade-in text-center">Hartă</h2>
      <hr className="hr"></hr>
      <div
        className="fade-in"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <RomaniaMap />
      </div>
      <LazyRenderComponent>
        <TotalKmsChart />
      </LazyRenderComponent>

      <Timeline></Timeline>
    </>
  );
}

export default HomePage;
