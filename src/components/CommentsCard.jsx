import React from "react";
import CloseButton from "./CloseButton";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "./AuthContext";
import "./Comments.css";

function CommentsCard({ user: commentUser, requestLogin }) {
  const { firstName, lastName, avatar, rating, comment } = commentUser;
  const { user: loggedInUser, loading } = useAuth();
  const handleAddReply = () => {
    if (loading) return;
    if (!loggedInUser) {
      console.log("Please log in before.");
      requestLogin();
    } else {
      // show comment box, modal etc.
      console.log("User is:", loggedInUser);
    }
  };
  const handleLikeComment = () => {
    if (loading) return;
    if (!loggedInUser) {
      console.log("Please log in before.");
      requestLogin();
    } else {
      // show comment box, modal etc.
      console.log("loggedInUser is:", loggedInUser);
    }
  };
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
          <span className="comment-interact">
            <i
              class="bi bi-hand-thumbs-up"
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleLikeComment();
              }}
            ></i>
            <i
              class="bi bi-chat-dots"
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleAddReply();
              }}
            ></i>
          </span>
          <span className="comment-date">21-03-2024</span>
        </div>
      </div>
    </>
  );
}

export default CommentsCard;
