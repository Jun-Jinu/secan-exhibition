import React, { useEffect, useRef } from "react";
import "./KakaoMapEmbed.css";

const KakaoMapEmbed = ({
  width = "100%",
  height = "400px",
  mapWidth = "640",
  mapHeight = "360",
  timestamp = "1754050675701",
  mapKey = "69oafikps6i",
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // 카카오맵 스크립트가 로드되었는지 확인
    if (!window.daum || !window.daum.roughmap) {
      console.error("카카오맵 스크립트가 로드되지 않았습니다.");
      return;
    }

    // 기존 지도 인스턴스가 있으면 제거
    if (mapInstanceRef.current) {
      try {
        mapInstanceRef.current.destroy();
      } catch (e) {
        console.log("기존 지도 인스턴스 제거 중 오류:", e);
      }
    }

    // 고유한 컨테이너 ID 생성
    const containerId = `daumRoughmapContainer${timestamp}`;

    if (mapContainerRef.current) {
      // 컨테이너에 필요한 속성 설정
      mapContainerRef.current.id = containerId;
      mapContainerRef.current.className = "root_daum_roughmap root_daum_roughmap_landing";

      try {
        // 카카오맵 렌더링
        const mapInstance = new window.daum.roughmap.Lander({
          timestamp: timestamp,
          key: mapKey,
          mapWidth: mapWidth,
          mapHeight: mapHeight,
        });

        mapInstance.render();
        mapInstanceRef.current = mapInstance;
      } catch (error) {
        console.error("카카오맵 렌더링 중 오류:", error);
      }
    }

    // cleanup
    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.destroy();
        } catch (e) {
          console.log("카카오맵 제거 중 오류:", e);
        }
      }
    };
  }, [timestamp, mapKey, mapWidth, mapHeight]);

  return (
    <div className="kakao-map-embed-container" style={{ width, height }}>
      <div className="map-content-container">
        <div
          ref={mapContainerRef}
          className="kakao-map-container"
          style={{
            width: "100%",
            height: "100%",
            minHeight: "300px",
          }}
        >
          {/* 카카오맵 로드 실패 시 대체 컨텐츠 */}
          <div className="map-fallback">
            <div className="fallback-content">
              <h3>지도를 로드 중입니다...</h3>
              <p>카카오맵을 불러오고 있습니다.</p>
              <div className="fallback-info">
                <strong>전시 위치:</strong>
                <br />
                서울 광진구 능동로 209
                <br />
                세종대학교 광개토관 지하 1층
                <br />
                세종뮤지엄 갤러리 3관
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="map-footer">
        <a href="https://kko.kakao.com/06QVExu0WP" target="_blank" rel="noopener noreferrer" className="map-link">
          📍 카카오맵에서 크게 보기
        </a>
      </div>
    </div>
  );
};

export default KakaoMapEmbed;
