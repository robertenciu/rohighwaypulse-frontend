import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import "@fontsource/jetbrains-mono";

function HighwayDetailedCard({highway, onClose}) {
    return (
            <Card style={{ height: '700px', width: '1000px' , backgroundColor: 'rgba(0, 0, 0, 0.55)'}}>
                <i class="bi bi-x-lg" onClick={onClose} style={{
                    color: '#ffffff',
                    cursor: 'pointer',
                    position: 'absolute',
                    top:'10px',
                    right:'20px',
                    fontSize: '2rem'}}></i>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    {highway.name}
                    </Card.Text>
                </Card.Body>
            </Card>
    )
}

export default HighwayDetailedCard;