import React from "react";
import { useNavigate } from "react-router-dom";
import "./WorkCard.css";

const WorkCard = ({ title, subtitle, thumbnailUrl, children, onClick, workId, category, type }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (workId && category && type) {
      // 작품 상세 페이지로 이동
      navigate(`/${category}/${type}/${workId}`);
    }
  };

  return (
    <div className="work-card" onClick={handleClick}>
      {children || (
        <>
          {/* 이미지 영역 */}
          <div className="work-image">
            {thumbnailUrl ? <img src={thumbnailUrl} alt={title} /> : <div className="work-image-placeholder"></div>}
          </div>
          {/* <div className="work-image">
            {thumbnailUrl || imageUrl ? (
              <img src={thumbnailUrl || imageUrl} alt={title} />
            ) : (
              <div className="work-image-placeholder"></div>
            )}
          </div> */}

          {/* 제목 및 부제목 영역 */}
          <div className="work-card-info">
            <div className="work-card-title">{title}</div>
            {subtitle && <div className="work-card-subtitle">{subtitle}</div>}
          </div>
        </>
      )}
    </div>
  );
};

export default WorkCard;
