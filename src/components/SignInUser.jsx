import React from "react";
import Button from "react-bootstrap/Button";
import CloseButton from "./CloseButton";
import Form from "react-bootstrap/Form";
import { Card, Container, Row, Col } from "react-bootstrap";
import styles from "./Registration.module.css";
import { ReactComponent as Logo } from "./Logo.svg";
import { useState, useEffect } from "react";

function SignInUser({ onClose, switchToSignUp }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        console.log("User is logged in:", res);
        localStorage.setItem("token", data.token);

      } else if (res.status === 401) {
        setError("Invalid credentials");
      } else {
        setError("Something went wrong. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error.");
    }
  };
  return (
    <Card className={`${styles.form}`} onClick={(e) => e.stopPropagation()}>
      <CloseButton onClick={onClose} />
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          textAlign: "center",
          fontSize: "2.5rem",
          paddingTop: "30px",
        }}
      >
        <Logo style={{ height: "73px", width: "120px" }} />
      </div>

      <Form className={`${styles.formText}`} onSubmit={handleLogin}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label style={{ color: "#198754" }}>Email address</Form.Label>
          <hr className="hr-detailed-card" style={{ margin: "auto" }}></hr>
          <Form.Control
            type="username"
            placeholder="Enter email or username"
            style={{
              marginTop: "10px",
              width: "100%",
              maxWidth: "400px",
              margin: "10px auto",
              height: "40px",
            }}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div className="my-2">
            <Button variant="success" style={{ width: "20rem" }} type="submit">
              Log In
            </Button>
          </div>
          <div className="my-2">
            Dont have account?
            <Button
              variant="secondary mx-2"
              style={{ width: "7rem" }}
              onClick={switchToSignUp}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </Form>
    </Card>
  );
}

export default SignInUser;
