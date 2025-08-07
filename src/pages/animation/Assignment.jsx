import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../layouts/Layout";
import WorksGallery from "../../components/WorksGallery";
import { worksAPI } from "../../utils/supabase";

const AnimationAssignment = () => {
  const navigate = useNavigate();
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        setLoading(true);
        const data = await worksAPI.getWorksByCategory("animation", false); // 과제작품만

        // WorksGallery 형식에 맞게 데이터 변환
        const formattedWorks = data.map((work) => ({
          id: work.id,
          title: work.title,
          subtitle: work.subtitle,
          imageUrl: work.image_url,
        }));

        setWorks(formattedWorks);
      } catch (err) {
        setError("작품을 불러오는데 실패했습니다.");
        console.error("Error fetching works:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

  const handleDetailClick = () => {
    // 졸업작품 페이지로 이동
    navigate("/animation/graduation");
  };

  if (loading) {
    return (
      <Layout>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            fontSize: "18px",
            color: "#666",
          }}
        >
          작품을 불러오는 중...
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            fontSize: "18px",
            color: "#dc3545",
          }}
        >
          {error}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <WorksGallery
        sub_title="애니메이션 과제작품"
        main_title="ANIMATION"
        works={works}
        onDetailClick={handleDetailClick}
        detailButtonText="졸업작품 보러가기"
        category="animation"
        type="assignment"
      />
    </Layout>
  );
};

export default AnimationAssignment;
