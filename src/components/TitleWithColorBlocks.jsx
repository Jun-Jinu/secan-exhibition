import React from "react";
import "./TitleWithColorBlocks.css";

const TitleWithColorBlocks = ({ sub_title, main_title }) => {
  return (
    <div className="title-with-blocks-container">
      {/* 왼쪽 색상 블록들 */}
      <div className="color-blocks-left">
        <div className="color-block" style={{ backgroundColor: "#87CEEB" }}></div>
        <div className="color-block" style={{ backgroundColor: "#4A90E2" }}></div>
        <div className="color-block" style={{ backgroundColor: "#FF8C42" }}></div>
      </div>

      {/* 타이틀 텍스트 */}
      <div className="title-container">
        <h1 className="main-title-sub">{sub_title}</h1>
        <h1 className="main-title-main">{main_title}</h1>
      </div>

      {/* 오른쪽 색상 블록들 */}
      <div className="color-blocks-right">
        <div className="color-block" style={{ backgroundColor: "#87CEEB" }}></div>
        <div className="color-block" style={{ backgroundColor: "#4A90E2" }}></div>
        <div className="color-block" style={{ backgroundColor: "#FF8C42" }}></div>
      </div>
    </div>
  );
};

export default TitleWithColorBlocks;
