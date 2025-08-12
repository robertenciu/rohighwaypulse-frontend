import React, { useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import ModelWrapper from "../components/ModelWrapper";
import CloseButton from "../components/CloseButton";

function PhotosPage() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const photos = [
    { file: "A1- tronson 3.jpeg", desc: "A1 - Pisi Tronson 3" },
    { file: "A1-Pisi-lot1.jpeg", desc: "A1 - Pisi Lot 1" },
    { file: "a2 Cernavoda Pod.jpg", desc: "A2 - Pod Cernavodă" },
    { file: "A1-Pisi-Lot2.jpeg", desc: "A1 - Pisi Lot 2" },
    { file: "Dex 4 Turda-Dej.png", desc: "DEx 4 - Turda-Dej" },
    { file: "Dex12.png", desc: "DEx 12" },
    { file: "Dex12-NodA1.png", desc: "DEx 12 - Nod A1" },
    { file: "A0-A1.png", desc: "A0 - Nod A1" },
    { file: "Dex4.png", desc: "DEx 4" },
    { file: "Dex4-NodDn1.png", desc: "DEx 4 - Nod DN1" },
    {
      file: "Luminita Margina-Holdea.jpeg",
      desc: "Luminita de la capatul tunelului Margina-Holdea",
    },
  ];
  return (
    <>
      <h2 className="my-3 display-3 fade-in text-center">Fotografii</h2>
      <hr className="hr"></hr>
      <Container fluid style={{ width: "95%" }}>
        <Row className="g-4 justify-content-center" xs={1} sm={2} md={3} lg={4}>
          {photos.map((photo, index) => (
            <Col
              key={photo.file}
              className="fade-in"
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              <div
                className="photo-container"
                onClick={() => setSelectedPhoto(photo.file)}
              >
                <img
                  className="photo"
                  src={`/gallery/${photo.file}`}
                  alt={photo.desc}
                />
                <div className="photo-overlay">
                  <p>{photo.desc}</p>
                </div>
              </div>
            </Col>
          ))}
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
