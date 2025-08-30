import React from "react";
import { useNavigate } from "react-router-dom";
import "./WorkDetail.css";

const WorkDetail = ({ workData, authors = [], backPath = "/" }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(backPath);
  };

  const handleDownload = () => {
    // 작품 보러가기 버튼 클릭 시 동작
    if (workData?.work_link) {
      window.open(workData.work_link, "_blank");
    } else {
      console.log("작품 링크가 없습니다.");
      console.log(workData);
    }
  };

  return (
    <div className="work-detail-container">
      {/* 뒤로가기 버튼 */}
      <button className="work-detail-back-button" onClick={handleBack}>
        ◀ Back
      </button>

      {/* 작품 정보 메인 섹션 */}
      <div className="work-detail-main-section">
        <div className="work-detail-main-section-container">
          {/* 작품 정보 */}
          <div className="work-detail-info-section">
            <div className="work-detail-left-section">
              <div className="work-detail-info-section-title">
                <h2 className="work-detail-title">{workData?.title || "작품 이름"}</h2>
                <p className="work-detail-subtitle">{workData?.subtitle || "부제목 · 스토리 | 2분 30초"}</p>
              </div>

              {/* 작품 이미지 */}
              <div className="work-detail-image-section">
                {workData?.imageUrl || workData?.image_url ? (
                  <img src={workData.imageUrl || workData.image_url} alt={workData.title} />
                ) : (
                  <div className="work-detail-image-placeholder">작품 이미지</div>
                )}
              </div>
            </div>

            <div className="work-detail-right-section">
              <div className="work-detail-description-box">
                <p className="work-detail-description">
                  {workData?.description ||
                    `작품을 설명하는 간단한 부가설명 내용입니다. 제목, 시간 등 간단한 제목이나, 메인정보를 여기에 적습니다. 아마도 짧은 요약이 적혀져 있습니다.`}
                </p>
              </div>

              <button className="work-detail-download-button work-detail-web-button" onClick={handleDownload}>
                ▷ 작품 보러가기
              </button>
            </div>
          </div>
        </div>

        {/* 작가소개 섹션 */}
        <div className="work-detail-authors-section">
          <h3 className="work-detail-authors-title">작가소개</h3>
          <div className="work-detail-authors-grid">
            {authors.length > 0 ? (
              authors.map((author, index) => (
                <div key={index} className="work-detail-author-card">
                  <h4 className="work-detail-author-name">{author.name}</h4>
                  <p className="work-detail-author-category">{author.category}</p>
                  <p className="work-detail-author-email">{author.email}</p>
                </div>
              ))
            ) : (
              // 기본 예시 데이터
              <>
                <div className="work-detail-author-card">
                  <h4 className="work-detail-author-name">최교식</h4>
                  <p className="work-detail-author-category">캐릭터</p>
                  <p className="work-detail-author-email">jxcojok@seoul.ac.kr</p>
                </div>
                <div className="work-detail-author-card">
                  <h4 className="work-detail-author-name">김가현</h4>
                  <p className="work-detail-author-category">배경</p>
                  <p className="work-detail-author-email">jxcojok@seoul.ac.kr</p>
                </div>
                <div className="work-detail-author-card">
                  <h4 className="work-detail-author-name">송시헌</h4>
                  <p className="work-detail-author-category">콘티</p>
                  <p className="work-detail-author-email">jxcojok@seoul.ac.kr</p>
                </div>
                <div className="work-detail-author-card">
                  <h4 className="work-detail-author-name">권미경</h4>
                  <p className="work-detail-author-category">성우</p>
                  <p className="work-detail-author-email">jxcojok@seoul.ac.kr</p>
                </div>
                <div className="work-detail-author-card">
                  <h4 className="work-detail-author-name">김영진</h4>
                  <p className="work-detail-author-category">음향</p>
                  <p className="work-detail-author-email">jxcojok@seoul.ac.kr</p>
                </div>
              </>
            )}
          </div>
          <div className="work-detail-container-mobile">
            <button className="work-detail-download-button work-detail-mobile-button" onClick={handleDownload}>
              ▷ 작품 보러가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkDetail;
