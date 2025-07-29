import React, { useRef, useEffect, useState } from "react";

const LazyRenderComponent = ({
  children,
  threshold = 0.4,
  minHeight = "500px",
}) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [threshold]);

  return (
    <div ref={containerRef} style={{ minHeight }}>
      {isVisible ? children : null}
    </div>
  );
};

export default LazyRenderComponent;
