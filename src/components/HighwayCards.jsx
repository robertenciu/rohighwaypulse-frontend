import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import HighwayDetailedCard from './HighwayDetailedCard';
import "@fontsource/jetbrains-mono";

function HighwayCards() {
  const [highways, setHighways] = useState([]);
  const [selectedHighway, setSelectedHighway] = useState(null)

  useEffect(() => {
    fetch("http://localhost:8080/highways")
      .then(response => response.json())
      .then(data => setHighways(data))
      .catch(error => console.error("Eroare la fetch:", error));
  }, []);

  const isDex = (name) => {
    if (name.includes("DEx")) {
      return (
        <div style={{
			background: '#e00a0a',
			color: 'white',
			height: '100%',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			fontSize: '3rem',
			fontWeight: 'bold',
			height: '180px'
		}}>
			{name}
        </div>
      );
    }
    return (
        <div style={{
			background: '#198754',
			color: 'white',
			height: '100%',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			fontSize: '3rem',
			fontWeight: 'bold',
			height: '180px'
		}}>
			{name}
        </div>
      );
  };

  return (
	<>
    <Container fluid style={{width: '70%'}}>
      <Row className="g-4 justify-content-center" xs={1} sm={2} md={3} lg={4} >
        {highways.map((hw, index) => (
          <Col className='fade-in' style={{ animationDelay: `${index * 0.1}s` }}>
            <Card className="shadow-sm card-hover" style={{
				background: 'radial-gradient(circle,rgba(235, 235, 169, 0.9) 1%, rgba(209, 142, 142, 0.82) 50%, rgba(191, 172, 124, 0.85) 100%)',
				borderTopLeftRadius: '0rem',
				borderTopRightRadius: '0rem'
			}}
			onClick={() => {setSelectedHighway(hw)}
			}>
				{isDex(hw.name)}
				<Card.Body>
					<Card.Text
						style={{
							fontFamily: "'Josefin Sans', sans-serif",
							fontSize: '25px',
							fontWeight: 'bold',
							display: 'flex',
							alignItems: 'center',
							textAlign: 'center'
						}}
						>
						<div style={{ flex: 1, textAlign: 'center', flexDirection: 'column'}}>
							<div>
								<i className="bi bi-geo me-2"></i>
							</div>
							<div>{hw.startCity}</div>
						</div>

						<div style={{ flex: 1 }}>
							<i className="bi bi-arrow-right" style={{ fontSize: '40px' }}></i>
						</div>

						<div style={{ flex: 1, textAlign: 'center', flexDirection: 'column'}}>
							<div>
								<i className="bi bi-geo me-2"></i>
							</div>
							<div>{hw.endCity}</div>
						</div>
					</Card.Text>
				</Card.Body>
				<Card.Footer style={{fontFamily: "'JetBrains Mono', monospace" , fontWeight: 'bold', fontSize: '17px', textAlign: 'center'}}>
					{hw.length} km
				</Card.Footer>
            </Card>
        </Col>
        ))}
      </Row>
    </Container>
	{selectedHighway && (
  <div
    onClick={() => setSelectedHighway(null)} // click în afara cardului închide overlayul
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.35)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()} // prevenim propagarea clickului
      style={{
        maxWidth: '90%',
        maxHeight: '90%',
        overflowY: 'auto',
      }}
    >
      <HighwayDetailedCard highway={selectedHighway} onClose={() => setSelectedHighway(null)} />
    </div>
  </div>
)}
	</>
  );
}

export default HighwayCards;
