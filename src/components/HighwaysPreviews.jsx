import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import "@fontsource/jetbrains-mono";

function HighwayPreviews() {
  const [highways, setHighways] = useState([]);

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
			height: '180px',
			borderTopLeftRadius: '1.5rem',
			borderTopRightRadius: '1.5rem'
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
			height: '180px',
			borderTopLeftRadius: '1.5rem',
			borderTopRightRadius: '1.5rem'
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
          <Col>
            <Card className="shadow-sm" style={{
				background: 'radial-gradient(circle,rgba(235, 235, 169, 1) 1%, rgba(209, 142, 142, 0.56) 60%, rgba(191, 172, 124, 0.58) 100%)',
				borderTopLeftRadius: '1.5rem',
				borderTopRightRadius: '1.5rem',
			}}
			onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.07)')}
  			onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
			>
				{isDex(hw.name)}
				<Card.Body>
					<Card.Title>{hw.status}</Card.Title>
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
				<Card.Footer style={{fontFamily: "'JetBrains Mono', monospace" , fontWeight: 'bold', fontSize: '17px'}}>
					{hw.length} km
				</Card.Footer>
                
            </Card>
        </Col>
        ))}
      </Row>
    </Container>
	</>
  );
}

export default HighwayPreviews;
