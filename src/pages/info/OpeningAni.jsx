import React from "react";
import "./OpeningAni.css";
import header_image from "/images/header_image.png";
import dog_image from "/images/dog_image.png";

const OpeningAni = () => {
  return (
    <div className="opening-ani-container">
      {/* 상단 배경 섹션 */}
      <div
        className="hero-section"
        style={{
          backgroundImage: `url(${header_image})`,
        }}
      >
        <div className="hero-content">
          <h3 className="hero-subtitle">2025 opening animation</h3>
          <h1 className="hero-title">어서오세요, 세칸25</h1>
          <p className="hero-description">
            "작품을 판매하는 SECAN 편의점의 알바생, <br class="mobile_br" />
            '쭈비'의 이야기"
          </p>
        </div>
      </div>

      {/* 캐릭터 소개 섹션 */}
      <div className="character-section">
        <div className="character-container">
          <div className="character-left">
            <div className="dog-character">
              <img src={dog_image} alt="쭈비 캐릭터" />
            </div>
          </div>

          <div className="character-right">
            <div className="character-title-box">
              <h3 className="character-title">쭈비</h3>
            </div>
            <div className="character-description">
              <p>
                '작품'을 판매하는 독특한 편의점의
                <br />
                아르바이트생이 된 쭈비.
                <br />
                점장님의 부재로 혼자 근무하게 된다.
                <br />
                과연 쭈비는 일을 잘 해낼 수 있을까?
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 편의점 섹션 */}
      <div className="store-section">
        <div className="store-container">
          <div className="store-content">
            <div className="store-header">
              <h3 className="store-title">opening</h3>
            </div>

            <div className="store-description">
              <p>
                이번 SECAN 편의점은 창작자의 작품들을 <br class="mobile_br" />
                진열하여 판매하는 특별한 편의점입니다.
                <br />
                2025 SECAN의 메인 테마인 '편의점'과
                <br class="mobile_br" />
                '타이쿤'에 맞춰 알바생 '쭈비'가
                <br />
                편의점을 운영하는 이야기를 담고 있습니다.
                <br class="mobile_br" />
                점장님 없이 홀로 편의점을 꾸려가는 쭈비의 모습은
                <br />
                작품을 완성하고 있는 창작자의 노력을,
                <br class="mobile_br" />
                그리고 화려하게 작품으로 채워진 전시장은
                <br />
                노력하는 과정에서 얻는 완성과 보람을 보여줍니다.
              </p>
            </div>

            {/* YouTube 비디오 섹션 */}
            <div className="video-section">
              <div className="video-container">
                <iframe
                  width="100%"
                  height="380px"
                  src="https://www.youtube.com/embed/Yjp-jXR6K9Q?si=VkkTSbY0ETSxdufu"
                  title="SECAN 2025 Opening Animation"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ borderRadius: "10px" }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpeningAni;
