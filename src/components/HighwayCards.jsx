import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import styles from "./HighwayCards.module.css";
import HighwayDetailedCard from "./HighwayDetailedCard";
import "@fontsource/jetbrains-mono";
import { useParams, useNavigate } from "react-router-dom";
import { isDex } from "../utils/highwayUtils";

function HighwayCards({ highways }) {
  const [selectedHighway, setSelectedHighway] = useState(null);
  return (
    <>
      <Container fluid style={{ width: "70%" }}>
        <Row className="g-4 justify-content-center" xs={1} sm={2} md={3} lg={4}>
          {highways.map((hw, index) => (
            <Col
              className="fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card
                className="shadow-sm card-hover"
                onClick={() => {
                  setSelectedHighway(hw);
                }}
              >
                <div className={styles.highwaySign} style={isDex(hw.name)}>
                  {hw.name}
                </div>
                <Card.Body>
                  <Card.Text className={`${styles.cardText}`}>
                    <div
                      style={{
                        flex: 1,
                        textAlign: "center",
                        flexDirection: "column",
                      }}
                    >
                      <div>
                        <i className="bi bi-geo me-2"></i>
                      </div>
                      <div>{hw.startCity}</div>
                    </div>

                    <div style={{ flex: 1 }}>
                      <i
                        className="bi bi-arrow-right"
                        style={{ fontSize: "40px" }}
                      ></i>
                    </div>

                    <div
                      style={{
                        flex: 1,
                        textAlign: "center",
                        flexDirection: "column",
                      }}
                    >
                      <div>
                        <i className="bi bi-geo me-2"></i>
                      </div>
                      <div>{hw.endCity}</div>
                    </div>
                  </Card.Text>
                </Card.Body>
                <Card.Footer
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: "bold",
                    fontSize: "17px",
                    textAlign: "center",
                  }}
                >
                  {hw.length} km
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      {selectedHighway && (
        <div
          onClick={() => {
            setSelectedHighway(null);
          }}
          style={{
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
          }}
        >
          <HighwayDetailedCard
            highway={selectedHighway}
            onClose={() => {
              setSelectedHighway(null);
            }}
          />
        </div>
      )}
    </>
  );
}

export default HighwayCards;
