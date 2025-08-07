import React from "react";
import "./WorksList.css";

const WorksList = ({ works, onEdit, onDelete }) => {
  if (works.length === 0) {
    return (
      <div className="works-list-empty">
        <p>등록된 작품이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="works-list">
      <div className="works-table">
        <div className="table-header">
          <div className="table-cell">썸네일</div>
          <div className="table-cell">작품명</div>
          <div className="table-cell">카테고리</div>
          <div className="table-cell">장르</div>
          <div className="table-cell">작가</div>
          <div className="table-cell">시간</div>
          <div className="table-cell">졸업작품</div>
          <div className="table-cell">작업</div>
        </div>

        {works.map((work) => (
          <div key={work.id} className="table-row">
            <div className="table-cell thumbnail-cell">
              {work.thumbnail_url || work.image_url ? (
                <img src={work.thumbnail_url || work.image_url} alt={work.title} className="work-thumbnail" />
              ) : (
                <div className="no-image">이미지 없음</div>
              )}
            </div>

            <div className="table-cell">
              <div className="work-title">
                {work.title}
                {work.subtitle && <div className="work-subtitle">{work.subtitle}</div>}
              </div>
            </div>

            <div className="table-cell">
              <span className={`category-badge ${work.category}`}>
                {work.category === "animation" && "애니메이션"}
                {work.category === "comics" && "만화"}
                {work.category === "artwork" && "아트워크"}
              </span>
            </div>

            <div className="table-cell">{work.genre || "-"}</div>

            <div className="table-cell">
              {work.authors && work.authors.length > 0 ? (
                <div className="authors-list">
                  {work.authors.map((author, index) => (
                    <div key={index} className="author-info">
                      <span className="author-name">{author.author_name}</span>
                      <span className="author-role">({author.author_role})</span>
                      <span className="author-email">{author.author_email}</span>
                    </div>
                  ))}
                </div>
              ) : (
                "-"
              )}
            </div>

            <div className="table-cell">{work.duration || "-"}</div>

            <div className="table-cell">
              <span className={`graduation-badge ${work.is_graduation ? "graduation" : "assignment"}`}>
                {work.is_graduation ? "졸업작품" : "과제작품"}
              </span>
            </div>

            <div className="table-cell">
              <div className="action-buttons">
                <button onClick={() => onEdit(work)} className="edit-button">
                  수정
                </button>
                <button onClick={() => onDelete(work.id)} className="delete-button">
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorksList;
