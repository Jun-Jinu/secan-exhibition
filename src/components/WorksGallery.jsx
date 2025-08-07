import React from "react";
import TitleWithColorBlocks from "./TitleWithColorBlocks";
import WorkCard from "./WorkCard";
import DetailButton from "./DetailButton";
import "./WorksGallery.css";

const WorksGallery = ({
  sub_title,
  main_title,
  works,
  onDetailClick,
  detailButtonText = "작품정보 자세히 보기",
  category,
  type,
}) => {
  return (
    <div className="works-gallery-container">
      <div className="works-gallery-content">
        {/* 상단 타이틀 */}
        <TitleWithColorBlocks sub_title={sub_title} main_title={main_title} />
        {/* 작품 그리드 */}
        <div className="works-grid-container">
          <div className="works-grid">
            {works.map((work, index) => (
              <WorkCard
                key={index}
                title={work.title}
                subtitle={work.subtitle}
                imageUrl={work.imageUrl || work.image_url}
                thumbnailUrl={work.thumbnailUrl || work.thumbnail_url}
                workId={work.id || `work-${index + 1}`}
                category={category}
                type={type}
              />
            ))}
          </div>
        </div>
        {/* 상세보기 버튼 */}
        <DetailButton text={detailButtonText} onClick={onDetailClick} />
      </div>
    </div>
  );
};

export default WorksGallery;
