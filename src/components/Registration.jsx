import React from "react";
import Button from "react-bootstrap/Button";
import CloseButton from "./CloseButton";
import Form from "react-bootstrap/Form";
import { Card, Container, Row, Col } from "react-bootstrap";
import styles from "./Registration.module.css";

function Registration({ onClose }) {
  return (
    <Card className={`${styles.form}`} onClick={(e) => e.stopPropagation()}>
      <CloseButton onClick={onClose} />
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          textAlign: "center",
          fontSize: "2.5rem",
        }}
      >
        Sign In
      </span>
      <Form className={`${styles.formText}`}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label style={{ color: "#198754" }}>Email address</Form.Label>
          <hr className="hr-detailed-card" style={{ margin: "auto" }}></hr>
          <Form.Control
            type="email"
            placeholder="Enter email"
            style={{
              marginTop: "10px",
              width: "100%",
              maxWidth: "400px",
              margin: "10px auto",
              height: "40px",
            }}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{ color: "#198754" }}>Password</Form.Label>
          <hr className="hr-detailed-card" style={{ margin: "auto" }}></hr>
          <Form.Control
            type="password"
            placeholder="Password"
            style={{
              marginTop: "10px",
              width: "100%",
              maxWidth: "400px",
              margin: "10px auto",
              height: "40px",
            }}
          />
        </Form.Group>
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            textAlign: "center",
          }}
        >
          <Button variant="primary">Submit</Button>
        </div>
      </Form>
    </Card>
  );
}

export default Registration;
