import React from "react";
import Layout from "../../layouts/Layout";
import ExhibitionTitle from "../../components/ExhibitionTitle";
import KakaoMapEmbed from "../../components/KakaoMapEmbed";
import "./Exhibition.css";

const Exhibition = () => {
  return (
    <Layout>
      <div className="exhibition-container">
        <div className="exhibition-content">
          {/* 메인 타이틀 (전용 래퍼 사용) */}
          <ExhibitionTitle sub_title="2025" main_title="SECAN EXHIBITION" />

          {/* 설명 텍스트들 */}
          <div className="description-text">
            <p>
              큰일이다! 편의점 점장님이 급하게 자리를 비워야 하는데,
              <br />
              지금 알바생이 강아지 한 마리뿐?
              <br />
              수많은 작품이 진열되어 판매되는 세칸 편의점,
              <br />
              이곳에 방문하는 손님들에게 원하는 작품을 찾아줘야 하는데,
              <br />
              첫 업무를 수행하는 우당탕탕 발소리에
              <br />
              점장님은 벌써부터 걱정이 이만저만이 아닌 것 같다.
            </p>
            <p>과연 전시장이 없는 동안 강아지가 편의점을 잘 지켜줄 수 있을까?</p>
          </div>

          {/* 오시는 길 섹션 */}
          <div className="location-section">
            <h2 className="location-title">&lt;오시는길&gt;</h2>

            <div style={{ marginBottom: "30px" }}>
              <p className="address-main">
                서울 광진구 능동로 209
                <br />
                세종대학교 광개토관 지하 1층 세종뮤지엄 갤러리 3관
              </p>
            </div>

            {/* 지도 영역 */}
            <div className="map-container">
              <KakaoMapEmbed
                width="100%"
                height="400px"
                mapWidth="640"
                mapHeight="360"
                timestamp="1754050675701"
                mapKey="69oafikps6i"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Exhibition;
