import React from "react";
import Button from "react-bootstrap/Button";
import CloseButton from "./CloseButton";
import Form from "react-bootstrap/Form";
import { Card, Container, Row, Col } from "react-bootstrap";
import styles from "./Registration.module.css";
import { ReactComponent as Logo } from "./Logo.svg";

function SignUpUser({ onClose }) {
  return (
    <Card className={`${styles.form}`} onClick={(e) => e.stopPropagation()}>
      <CloseButton onClick={onClose} />
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          textAlign: "center",
          fontSize: "2.5rem",
          paddingTop: "30px",
          marginBottom: "30px",
        }}
      >
        <Logo style={{ height: "73px", width: "120px" }} />
      </div>

      <Form className={`${styles.formText}`}>
        {/* First Row: First Name & Last Name */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            maxWidth: "400px",
            margin: "10px auto",
          }}
        >
          <Form.Control
            type="text"
            placeholder="First Name"
            style={{
              height: "40px",
              width: "calc(50% - 5px)",
            }}
          />
          <Form.Control
            type="text"
            placeholder="Last Name"
            style={{
              height: "40px",
              width: "calc(50% - 5px)",
            }}
          />
        </div>

        {/* Username */}
        <Form.Group controlId="formUsername">
          <Form.Control
            type="text"
            placeholder="Username"
            style={{
              marginTop: "10px",
              width: "100%",
              maxWidth: "400px",
              margin: "10px auto",
              height: "40px",
            }}
          />
        </Form.Group>

        {/* Email */}
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Email"
            style={{
              marginTop: "10px",
              width: "100%",
              maxWidth: "400px",
              margin: "10px auto",
              height: "40px",
            }}
          />
        </Form.Group>

        {/* Password */}
        <Form.Group controlId="formBasicPassword">
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

        {/* Confirm Password */}
        <Form.Group controlId="formConfirmPassword">
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            style={{
              marginTop: "10px",
              width: "100%",
              maxWidth: "400px",
              margin: "10px auto",
              height: "40px",
            }}
          />
        </Form.Group>

        {/* Submit Button */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div className="my-2">
            <Button variant="success" style={{ width: "20rem" }}>
              Sign Up
            </Button>
          </div>
        </div>
      </Form>
    </Card>
  );
}

export default SignUpUser;
