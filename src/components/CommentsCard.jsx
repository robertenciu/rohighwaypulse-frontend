import React from "react";
import CloseButton from "./CloseButton";
import { Card, Container, Row, Col } from "react-bootstrap";
import "./Comments.css";

function CommentsCard({ onClose, user }) {
  const { firstName, lastName, avatar, rating, comment } = user;

  return (
    <>
      <div className="comment-card">
        <div className="left-section">
          <img
            src={avatar}
            alt={`${firstName} ${lastName}`}
            className="avatar"
          />
          <div className="user-info">
            <strong>
              {firstName} {lastName}
            </strong>
            <div className="rating">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i}>{i < rating ? "★" : "☆"}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="right-section">
          <p className="comment-text">{comment}</p>
          <span className="comment-date">21-03-2024</span>
        </div>
      </div>
    </>
  );
}

export default CommentsCard;
