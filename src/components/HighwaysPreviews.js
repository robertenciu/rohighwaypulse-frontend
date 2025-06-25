import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

function HighwayPreviews() {
  const [highways, setHighways] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/highways")
      .then(response => response.json())
      .then(data => setHighways(data))
      .catch(error => console.error("Eroare la fetch:", error));
  }, []);

  return (
    <Container>
      <h2 className="my-4">Autostrăzi</h2>
      <Row className="g-4">
        {highways.map((hw, index) => (
          <Col key={index} md={12}>
            <Card 
				className="h-100 shadow-sm"
				style={{background: 'radial-gradient(circle,rgba(235, 235, 169, 1) 1%, rgba(209, 142, 142, 0.56) 60%, rgba(191, 172, 124, 0.58) 100%)'}}>
              <Row className="g-0 h-100">
                <Col md={4}>
                  <div style={{
                    background: '#198754',
                    color: 'white',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    borderTopLeftRadius: '0.375rem',
                    borderBottomLeftRadius: '0.375rem',
                    minHeight: '230px',
                  }}>
                    {hw.name}
                  </div>
                </Col>

                <Col md={8}>
                  <Card.Body>
                    <Card.Title>{hw.status}</Card.Title>
                    <Card.Text style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: '18px'}}>
                      {hw.description ?? "Nicio descriere disponibilă."}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted ms-3">Last updated 3 mins ago</small>
                  </Card.Footer>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default HighwayPreviews;
