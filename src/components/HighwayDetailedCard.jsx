import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import styles from "./HighwayDetailedCard.module.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import CloseButton from "./CloseButton";
import CommentsCard from "./CommentsCard";
import { IoMdConstruct } from "react-icons/io";
import { CiLocationArrow1 } from "react-icons/ci";
import { GrMoney } from "react-icons/gr";
import { GiReceiveMoney } from "react-icons/gi";
import "@fontsource/jetbrains-mono";
import { isDex } from "../utils/highwayUtils";
import { useAuth } from "./AuthContext";
import SignInUser from "./SignInUser";
import SignUpUser from "./SignUpUser";
import ModelWrapper from "./ModelWrapper";

function HighwayDetailedCard({ highway, selectedComments, onClose }) {
  const [detailedHighway, setDetailedHighway] = useState(null);
  const { user, loading } = useAuth();
  const [SignInForm, setSignInForm] = useState(false);
  const [SignUpForm, setSignUpForm] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/highways/${highway.name}`)
      .then((response) => response.json())
      .then((data) => setDetailedHighway(data))
      .catch((error) => console.error("Eroare la fetch:", error));
  }, []);

  if (!detailedHighway) {
    return;
  }
  const handleAddComment = () => {
    if (loading) return;
    if (!user) {
      console.log("Please log in before.");
      setSignInForm(true);
    } else {
      // show comment box, modal etc.
      console.log("User is:", user);
    }
  };

  const dummyComments = [
    {
      firstName: "Maria",
      lastName: "Ionescu",
      avatar: "https://i.pravatar.cc/150?img=3",
      rating: 4,
      comment: "Un serviciu excelent! Recomand cu încredere.",
    },
    {
      firstName: "Andrei",
      lastName: "Popescu",
      avatar: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      comment: "Totul a decurs perfect. Comunicarea a fost impecabilă.",
    },
    {
      firstName: "Elena",
      lastName: "Marin",
      avatar: "https://i.pravatar.cc/150?img=10",
      rating: 3,
      comment: "A fost ok, dar se poate și mai bine.",
    },
  ];
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
          {selectedComments && (
            <div
              className={styles.cardComments}
              onClick={() => {
                handleAddComment();
              }}
            >
              <i className="bi bi-chat-dots"> Add comment</i>
            </div>
          )}
        </div>

        <div className={`${styles.cardDescription}`}>
          {detailedHighway.description}
        </div>
      </div>
      <hr className="hr-detailed-card"></hr>
      {selectedComments ? (
        <div>
          {dummyComments.map((user, index) => (
            <CommentsCard
              key={index}
              user={user}
              requestLogin={() => {
                setSignInForm(true);
              }}
            />
          ))}
        </div>
      ) : (
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
      )}
      {SignInForm && (
        <ModelWrapper onClose={() => setSignInForm(false)}>
          <SignInUser
            onClose={() => setSignInForm(false)}
            switchToSignUp={() => {
              setSignInForm(false);
              setSignUpForm(true);
            }}
          />
        </ModelWrapper>
      )}

      {SignUpForm && (
        <ModelWrapper onClose={() => setSignUpForm(false)}>
          <SignUpUser onClose={() => setSignUpForm(false)} />
        </ModelWrapper>
      )}
    </Card>
  );
}

export default HighwayDetailedCard;
