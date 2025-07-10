import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "./Logo.svg";
import { ReactComponent as Logo } from "./Logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import SignInUser from "./SignInUser";
import SignUpUser from "./SignUpUser";

function NavBar() {
  const [SignInForm, setSignInForm] = useState(false);
  const [SignUpForm, setSignUpForm] = useState(false);
  return (
    <>
      <Navbar fixed="top" className="nav">
        <Container>
          {/* Elemente din stanga */}
          <div>
            <span style={{ marginRight: "30px" }}>
              <Link to="/" style={{ all: "unset", cursor: "pointer" }}>
                <i
                  className="bi bi-house-door"
                  style={{ fontSize: "1.3em", marginRight: "7px" }}
                ></i>
                Acasă
              </Link>
            </span>
            <span style={{ marginRight: "30px" }}>
              <Link to="/highways" style={{ all: "unset", cursor: "pointer" }}>
                <i
                  className="bi bi-speedometer2"
                  style={{ fontSize: "1.3em", marginRight: "7px" }}
                ></i>
                Autostrăzi
              </Link>
            </span>
          </div>

          {/* Logo */}
          <Link
            to="/"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Logo style={{ height: "73px", width: "120px" }} />
          </Link>

          {/* Autentificare */}
          <div>
            <span
              onClick={(e) => setSignInForm(true)}
              style={{ cursor: "pointer" }}
            >
              <i
                class="bi bi-box-arrow-in-right"
                style={{ fontSize: "1.3em", marginRight: "7px" }}
              ></i>
              Autentificare
            </span>
          </div>
        </Container>
      </Navbar>
      {SignInForm && (
        <div
          onClick={() => {
            setSignInForm(false);
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
            zIndex: 10,
          }}
        >
          <SignInUser
            onClose={() => {
              setSignInForm(false);
            }}
            switchToSignUp={() => {
              setSignInForm(false);
              setSignUpForm(true);
            }}
          ></SignInUser>
        </div>
      )}
      {SignUpForm && (
        <div
          onClick={() => {
            setSignUpForm(false);
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
            zIndex: 10,
          }}
        >
          <SignUpUser
            onClose={() => {
              setSignUpForm(false);
            }}
          ></SignUpUser>
        </div>
      )}
    </>
  );
}

export default NavBar;
