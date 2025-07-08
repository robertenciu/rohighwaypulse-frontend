import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import styles from "./HighwayDetailedCard.module.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import CloseButton from "./CloseButton";
import { IoMdConstruct } from "react-icons/io";
import { CiLocationArrow1 } from "react-icons/ci";
import { GrMoney } from "react-icons/gr";
import { GiReceiveMoney } from "react-icons/gi";
import "@fontsource/jetbrains-mono";
import { isDex } from "../utils/highwayUtils";

function HighwayDetailedCard({ highway, onClose }) {
  const [detailedHighway, setDetailedHighway] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:8080/highways/${highway.name}`)
      .then((response) => response.json())
      .then((data) => setDetailedHighway(data))
      .catch((error) => console.error("Eroare la fetch:", error));
  }, []);

  if (!detailedHighway) {
    return;
  }

  const now = detailedHighway.percentageCompleted;
  return (
    <Card className="card-detailed" onClick={(e) => e.stopPropagation()}>
      <CloseButton onClick={onClose} />
      <div style={{ display: "flex", width: "100%" }}>
        <div
          className={`${styles.highwaySign}`}
          style={isDex(detailedHighway.name)}
        >
          {detailedHighway.name}
        </div>

        <div className={`${styles.cardDescription}`}>
          {detailedHighway.description}
        </div>
      </div>
      <hr className="hr-detailed-card"></hr>
      <Card.Body className={`${styles.cardBody}`}>
        <Row>
          <Col className="align-text-center">
            <IoMdConstruct style={{ marginRight: "10px" }} />
            Status: {detailedHighway.status}
          </Col>
        </Row>
        <Row>
          <Col className="align-text-center">
            <ProgressBar
              animated
              variant="success"
              now={detailedHighway.percentageCompleted}
              label={`${detailedHighway.percentageCompleted}%`}
              style={{ width: "50%", marginRight: "50px" }}
            />
            {detailedHighway.completedLength}/{detailedHighway.length} km.
          </Col>
        </Row>
        <hr className="hr-detailed-card"></hr>
        <Row>
          <Col className="align-text-center bordered-right-animated">
            <CiLocationArrow1 />
            Pornire: {detailedHighway.startCity}
          </Col>
          <Col className="align-text-center">
            <CiLocationArrow1 />
            Destinație: {detailedHighway.endCity}
          </Col>
        </Row>
        <hr className="hr-detailed-card"></hr>
        <Row>
          <Col className="align-text-center bordered-right-animated">
            <span>
              <GrMoney style={{ marginRight: "10px" }} />
              Buget: {detailedHighway.totalBudget}
            </span>
          </Col>
          <Col className="align-text-center">
            <span>
              <GiReceiveMoney style={{ marginRight: "10px" }} />
              Finanțare: {detailedHighway.fundingSource}
            </span>
          </Col>
        </Row>
        <hr className="hr-detailed-card"></hr>
        <Row>
          <Col className="align-text-center">
            <i class="bi bi-calendar3" style={{ marginRight: "10px" }}></i>
            An deschidere: {detailedHighway.estimatedCompletionYear}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default HighwayDetailedCard;
