import React, { useEffect, useRef, useState } from "react";
import "./Timeline.css";
import { ComponentLoader } from "./Loader";

const Timeline = () => {
  const itemRefs = useRef([]);
  const [visibleItems, setVisibleItems] = useState([]);
  const [schedule, setSchedule] = useState({});
  useEffect(() => {
    fetch("http://localhost:8080/highways/schedule")
      .then((res) => res.json())
      .then((data) => setSchedule(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!schedule || Object.keys(schedule).length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setTimeout(() => {
              setVisibleItems((prev) => [...prev, index]);
            }, index);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [schedule]);
  return (
    <div
      style={{
        background: `linear-gradient(90deg, rgba(235,235,235,0.8) 0%, rgba(255,255,255,0.8) 100%)`,
        margin: "0 auto",
        width: "50%",
        borderRadius: "20px",
        marginTop: "50px",
        boxShadow: "-10px 10px 10px rgba(0,0,0,0.65)",
      }}
    >
      <div className="divos">
        <h2
          className="my-3 display-3 fade-in text-center"
          style={{ fontSize: "clamp(1rem, 5vw, 4rem)" }}
        >
          Calendar autostrazi
        </h2>
        <hr className="hr" style={{ marginBottom: 0 }} />
        {Object.keys(schedule).length === 0 && (
          <div style={{ position: "relative", height: "50vh"}}>
            <ComponentLoader />
          </div>
        )}
        <ul>
          {Object.entries(schedule).map(([year, projects], indexYear) => (
            <li
              key={year}
              ref={(el) => (itemRefs.current[indexYear] = el)}
              data-index={indexYear}
              className={`timeline-item ${
                visibleItems.includes(indexYear) ? "visible" : ""
              }`}
              style={{
                "--accent-color": getAccentColor(indexYear),
              }}
            >
              <div className="date">{year}</div>
              {projects.map((project, index) => (
                <div key={`${year}-${index}`} className="project">
                  <div className="title">{project.segment}</div>
                  <div className="descr">
                    {project.lengthKm
                      ? `${project.lengthKm} km`
                      : "Lungime necunoscută"}
                  </div>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const getAccentColor = (index) => {
  const colors = ["#41516C", "#FBCA3E", "#E24A68", "#1B5F8C", "#4CADAD"];
  return colors[index % colors.length];
};

export default Timeline;
