import React from "react";
import Button from "react-bootstrap/Button";
import CloseButton from "./CloseButton";
import Form from "react-bootstrap/Form";
import { Card, Container, Row, Col } from "react-bootstrap";
import styles from "./Registration.module.css";
import { ReactComponent as Logo } from "./Logo.svg";
import { useState, useEffect } from "react";

function SignUpUser({ onClose }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    const payload = {
      firstName,
      lastName,
      email,
      username,
      password,
    };
    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        console.log("User successfully registered:", res);
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
          marginBottom: "30px",
        }}
      >
        <Logo style={{ height: "73px", width: "120px" }} />
      </div>

      <Form className={`${styles.formText}`} onSubmit={handleRegister}>
        {/* First Row: First Name & Last Name */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            maxWidth: "400px",
            margin: "2px auto",
          }}
        >
          <div style={{ width: "calc(50% - 5px)" }}>
            <div
              style={{
                fontSize: "0.85rem",
                marginBottom: "4px",
                paddingLeft: "2px",
                color: "#555",
              }}
            >
              First Name
            </div>
            <Form.Control
              type="text"
              placeholder="First Name"
              style={{ height: "40px", width: "100%" }}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div style={{ width: "calc(50% - 5px)" }}>
            <div
              style={{
                fontSize: "0.85rem",
                marginBottom: "4px",
                paddingLeft: "2px",
                color: "#555",
              }}
            >
              Last Name
            </div>
            <Form.Control
              type="text"
              placeholder="Last Name"
              style={{ height: "40px", width: "100%" }}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        {/* Username */}
        <Form.Group controlId="formUsername">
          <div
            style={{
              fontSize: "0.85rem",
              marginBottom: "2px",
              color: "#555",
              maxWidth: "400px",
              margin: "2px auto",
              paddingLeft: "2px",
            }}
          >
            Username
          </div>
          <Form.Control
            type="text"
            placeholder="Username"
            style={{
              marginTop: "10px",
              width: "100%",
              maxWidth: "400px",
              margin: "2px auto",
              height: "40px",
            }}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        {/* Email */}
        <Form.Group controlId="formBasicEmail">
          <div
            style={{
              fontSize: "0.85rem",
              marginBottom: "2px",
              color: "#555",
              maxWidth: "400px",
              margin: "2px auto",
              paddingLeft: "2px",
            }}
          >
            Email
          </div>
          <Form.Control
            type="email"
            placeholder="Email"
            style={{
              marginTop: "10px",
              width: "100%",
              maxWidth: "400px",
              margin: "2px auto",
              height: "40px",
            }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        {/* Password */}
        <Form.Group controlId="formBasicPassword">
          <div
            style={{
              fontSize: "0.85rem",
              marginBottom: "2px",
              color: "#555",
              maxWidth: "400px",
              margin: "2px auto",
              paddingLeft: "2px",
            }}
          >
            Password
          </div>
          <Form.Control
            type="password"
            placeholder="Password"
            style={{
              marginTop: "10px",
              width: "100%",
              maxWidth: "400px",
              margin: "2px auto",
              height: "40px",
            }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {/* Confirm Password */}
        <Form.Group controlId="formConfirmPassword">
          <div
            style={{
              fontSize: "0.85rem",
              marginBottom: "2px",
              color: "#555",
              maxWidth: "400px",
              margin: "2px auto",
              paddingLeft: "2px",
            }}
          >
            Confirm Password
          </div>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            style={{
              marginTop: "10px",
              width: "100%",
              maxWidth: "400px",
              margin: "2px auto",
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
            <Button variant="success" style={{ width: "20rem" }} type="submit">
              Sign Up
            </Button>
          </div>
        </div>
      </Form>
    </Card>
  );
}

export default SignUpUser;
