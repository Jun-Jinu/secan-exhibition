import React from "react";
import "./Home.css";

const Home = () => {
  // 배경 이미지 URL (필요에 따라 props나 상태로 변경 가능)
  const backgroundImageUrl = "/images/home_background_image.png"; // 배경 이미지 URL
  const characterImageUrl = "/images/home_exhibition_info_image.png"; // 우측 하단 캐릭터 이미지 URL

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : "none",
      }}
    >
      {/* 좌측 상단 타이틀 */}
      <div className="home-title">
        <h1 className="title-2025">2025</h1>
        <h1 className="title-secan">SECAN</h1>
        <h1 className="title-exhibition">EXHIBITION</h1>
      </div>

      {/* 우측 하단 고정 이미지 */}
      <div className="home-character">
        {characterImageUrl ? (
          <img src={characterImageUrl} alt="Exhibition Character" />
        ) : (
          <div className="character-placeholder">캐릭터</div>
        )}
      </div>

      {/* 모바일 전시 정보 박스 */}
      <div className="mobile-exhibition-info">
        <h2 className="exhibition-info-title">2025 세칸편의점</h2>
        <div className="exhibition-info-box">
          <div className="exhibition-info-content">
            <p className="exhibition-subtitle">세종대학교 만화애니메이션텍 졸업/과제작품 전시회</p>

            <div className="info-section">
              <strong>일시</strong> | 2025.10.20 - 10.27
            </div>

            <div className="info-section">
              <strong>장소</strong> | 세종대학교 광개토관 지하1층 세종뮤지엄갤러리3관
            </div>

            <div className="info-section">
              <strong>시간</strong> | 평일: 11:00 - 20:30
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;주말: 13:00 - 20:30
            </div>

            <div className="info-section">
              <strong>상영회</strong> | 세종대학교 대양홀 | 10.26
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| 1부 13:00 - 15:00, 2부
              15:30 - 17:30,
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3부 18:00 -
              20:00
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;세종대학교 학생회관 지하1층
              대공연장 | 10.24, 10.27
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| 1부 09:00 - 11:00, 2부
              11:30 - 13:30
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
