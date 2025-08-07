import React from "react";
import "./DetailButton.css";

const DetailButton = ({ text = "작품정보 보러가기", onClick }) => {
  return (
    <div className="detail-button-container">
      <button className="detail-button" onClick={onClick}>
        {text} <span className="arrow">›</span>
      </button>
    </div>
  );
};

export default DetailButton;
