import React from "react";
import "./AlternatingSection.css";

const AlternatingSection = ({ imageUrl, title, content, reverse = false }) => {
  return (
    <div className={`section ${reverse ? "reverse" : ""}`}>
      <div className="text-content">
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
      <div className="image-container">
        <img src={imageUrl} alt={title} />
      </div>
    </div>
  );
};

export default AlternatingSection;
