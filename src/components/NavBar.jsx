import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "./Logo.svg";
import { ReactComponent as Logo } from "./Logo.svg";
import { Link } from "react-router-dom";

function NavBar() {
  return (
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
          <i
            class="bi bi-box-arrow-in-right"
            style={{ fontSize: "1.3em", marginRight: "7px" }}
          ></i>
          Autentificare
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;
