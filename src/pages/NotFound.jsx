import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      {/* 404 메인 타이틀 */}
      <div className="notfound-title">
        <h1 className="error-code">404</h1>
        <h2 className="error-message">편의점에서 길을 잃었나요?</h2>
        <p className="error-description">
          앗! 찾으시는 페이지가 편의점에서 품절되었어요.
          <br />
          다른 상품들을 구경해보시겠어요?
        </p>
      </div>

      {/* 캐릭터 영역 */}
      <div className="notfound-character">
        <div className="character-speech-bubble">
          <p>"어라? 여기에 뭐가 있었는데..."</p>
        </div>
        <img src="/images/dog_image.png" alt="강아지 캐릭터" className="character-image" />
      </div>

      {/* 네비게이션 버튼들 */}
      <div className="notfound-navigation">
        <Link to="/" className="nav-button home-button">
          홈으로 가기
        </Link>
        <Link to="/info/exhibition" className="nav-button exhibition-button">
          전시 정보 보기
        </Link>
        <Link to="/comics/graduation" className="nav-button works-button">
          작품 구경하기
        </Link>
      </div>

      {/* 편의점 선반 효과 */}
      <div className="convenience-store-shelves">
        <div className="shelf shelf-1"></div>
        <div className="shelf shelf-2"></div>
        <div className="shelf shelf-3"></div>
      </div>

      {/* 배경 효과 */}
      <div className="background-effects">
        <div className="floating-item item-1">🍪</div>
        <div className="floating-item item-2">🥤</div>
        <div className="floating-item item-3">🍙</div>
        <div className="floating-item item-4">🍰</div>
        <div className="floating-item item-5">🥛</div>
      </div>
    </div>
  );
};

export default NotFound;
