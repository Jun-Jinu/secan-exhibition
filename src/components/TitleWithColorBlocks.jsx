import React from "react";
import "./TitleWithColorBlocks.css";

const TitleWithColorBlocks = ({ sub_title, main_title, align = "center", mainTitleSize }) => {
  return (
    <div className="title-with-blocks-container">
      {/* 왼쪽 색상 블록들 */}
      <div className="color-blocks-left">
        <div className="color-block" style={{ backgroundColor: "#aefffd" }}></div>
        <div className="color-block" style={{ backgroundColor: "#99dcff" }}></div>
        <div className="color-block" style={{ backgroundColor: "#ff8420" }}></div>
      </div>

      {/* 타이틀 텍스트 */}
      <div className="title-container">
        <h1 className={`main-title-sub ${align === "left" ? "align-left" : ""}`}>{sub_title}</h1>
        <h1 className="main-title-main" style={mainTitleSize ? { fontSize: mainTitleSize } : undefined}>
          {main_title}
        </h1>
      </div>

      {/* 오른쪽 색상 블록들 */}
      <div className="color-blocks-right">
        <div className="color-block" style={{ backgroundColor: "#aefffd" }}></div>
        <div className="color-block" style={{ backgroundColor: "#99dcff" }}></div>
        <div className="color-block" style={{ backgroundColor: "#ff8420" }}></div>
      </div>
    </div>
  );
};

export default TitleWithColorBlocks;
