import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WorkDetail from "../components/WorkDetail";
import { worksAPI } from "../utils/supabase";
import "./WorkDetailPage.css";

const WorkDetailPage = () => {
  const { category, type, id } = useParams();
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWork = async () => {
      try {
        setLoading(true);
        const workData = await worksAPI.getWorkById(id);
        setWork(workData);
      } catch (err) {
        setError("작품을 불러오는데 실패했습니다.");
        console.error("Error fetching work:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchWork();
    }
  }, [id]);

  // 뒤로가기 경로 설정
  const backPath = `/${category}/${type}`;

  if (loading) {
    return <div className="work-detail-loading">작품 정보를 불러오는 중...</div>;
  }

  if (error || !work) {
    return <div className="work-detail-error">{error || "작품을 찾을 수 없습니다."}</div>;
  }

  // Supabase 데이터를 WorkDetail 컴포넌트 형식에 맞게 변환
  const workData = {
    title: work.title,
    subtitle: `${work.subtitle} · ${work.genre} | ${work.duration}`,
    description: work.description,
    imageUrl: work.image_url,
    work_link: work.work_link,
  };

  // 작가 정보를 WorkDetail 컴포넌트 형식에 맞게 변환
  const authors = work.authors.map((author) => ({
    category: author.author_role,
    name: author.author_name,
    role: author.author_role,
    email: author.author_email,
  }));

  return (
    <div className="work-detail-page-container">
      <WorkDetail workData={workData} authors={authors} backPath={backPath} />
    </div>
  );
};

export default WorkDetailPage;
