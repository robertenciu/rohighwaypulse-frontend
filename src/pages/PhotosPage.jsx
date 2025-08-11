import React, { useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import ModelWrapper from "../components/ModelWrapper";
import CloseButton from "../components/CloseButton";

function PhotosPage() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  return (
    <>
      <h2 className="my-3 display-3 fade-in text-center">Fotografii</h2>
      <hr className="hr"></hr>
      <Container fluid style={{ width: "95%" }}>
        <Row className="g-4 justify-content-center" xs={1} sm={2} md={3} lg={4}>
          <Col className="fade-in" style={{ animationDelay: `0.1s` }}>
            <img
              className="photo"
              onClick={() => setSelectedPhoto("Luminita Margina-Holdea.jpeg")}
              src="/gallery/Luminita Margina-Holdea.jpeg"
            ></img>
          </Col>
          <Col className="fade-in" style={{ animationDelay: `0.1s` }}>
            <img
              className="photo"
              onClick={() => setSelectedPhoto("A1- tronson 3.jpeg")}
              src="/gallery/A1- tronson 3.jpeg"
            ></img>
          </Col>
          <Col className="fade-in" style={{ animationDelay: `0.1s` }}>
            <img
              className="photo"
              onClick={() => setSelectedPhoto("A1-Pisi-lot1.jpeg")}
              src="/gallery/A1-Pisi-lot1.jpeg"
            ></img>
          </Col>
          <Col className="fade-in" style={{ animationDelay: `0.1s` }}>
            <img
              className="photo"
              onClick={() => setSelectedPhoto("a2 Cernavoda Pod.jpg")}
              src="/gallery/a2 Cernavoda Pod.jpg"
            ></img>
          </Col>
          <Col className="fade-in" style={{ animationDelay: `0.1s` }}>
            <img
              className="photo"
              onClick={() => setSelectedPhoto("A1-Pisi-Lot2.jpeg")}
              src="\gallery\A1-Pisi-Lot2.jpeg"
            ></img>
          </Col>
          <Col className="fade-in" style={{ animationDelay: `0.1s` }}>
            <img
              className="photo"
              onClick={() => setSelectedPhoto("Dex 4 Turda-Dej.png")}
              src="gallery\Dex 4 Turda-Dej.png"
            ></img>
          </Col>
          <Col className="fade-in" style={{ animationDelay: `0.1s` }}>
            <img
              className="photo"
              onClick={() => setSelectedPhoto("Dex12.png")}
              src="/gallery/Dex12.png"
            ></img>
          </Col>
          <Col className="fade-in" style={{ animationDelay: `0.1s` }}>
            <img
              className="photo"
              onClick={() => setSelectedPhoto("Dex12-NodA1.png")}
              src="/gallery/Dex12-NodA1.png"
            ></img>
          </Col>
          <Col className="fade-in" style={{ animationDelay: `0.1s` }}>
            <img
              className="photo"
              onClick={() => setSelectedPhoto("A0-A1.png")}
              src="/gallery/A0-A1.png"
            ></img>
          </Col>
          <Col className="fade-in" style={{ animationDelay: `0.1s` }}>
            <img
              className="photo"
              onClick={() => setSelectedPhoto("Dex4.png")}
              src="/gallery/Dex4.png"
            ></img>
          </Col>
          <Col className="fade-in" style={{ animationDelay: `0.1s` }}>
            <img
              className="photo"
              onClick={() => setSelectedPhoto("Dex4-NodDn1.png")}
              src="/gallery/Dex4-NodDn1.png"
            ></img>
          </Col>
          <Col className="fade-in" style={{ animationDelay: `0.1s` }}>
            <img
              className="photo"
              onClick={() => setSelectedPhoto("")}
              src="/gallery/Luminita Margina-Holdea.jpeg"
            ></img>
          </Col>
        </Row>
      </Container>
      {selectedPhoto && (
        <ModelWrapper onClose={() => setSelectedPhoto(null)}>
          <Card className="photo-detailed" onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setSelectedPhoto(null)} />
            <div>
              <img
                src={`/gallery/${selectedPhoto}`}
                style={{ height: "85vh", width: "80vw" }}
              ></img>
            </div>
          </Card>
        </ModelWrapper>
      )}
    </>
  );
}

export default PhotosPage;
