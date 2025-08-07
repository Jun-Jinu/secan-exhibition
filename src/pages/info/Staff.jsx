import React from "react";
import Layout from "../../layouts/Layout";
import StaffListItem from "../../components/StaffListItem";
import "./Staff.css";

const Staff = () => {
  // 스태프 데이터 구조
  const staffData = [
    // 졸업준비위원회
    {
      section: "졸업준비위원회",
      members: [
        { role: "졸업위원장", name: "안채연" },
        { role: "부졸준위원장", name: "박정빈" },
        { role: "총 무", name: "최수아" },
        { role: "사무부", name: "이상은" },
        { role: "졸작부", name: "박수아 윤지현 이현진\n오지윤 조효상" },
        { role: "전시부", name: "김나영 김미소 박채연\n송하은 원지영 유나민\n윤승주 전지우 최기표\n최여진" },
      ],
    },
    // 학생회
    {
      section: "학생회",
      members: [
        { role: "학생회장", name: "어태규" },
        { role: "부학생회장", name: "홍채원" },
        { role: "사무부", name: "정지인 최재희 김 진\n백해원 심연경" },
        { role: "홍보부", name: "박경서 안솔이" },
        { role: "만화부", name: "김민경 천지혜\n박소연 차수민" },
        { role: "기자재부", name: "이수나 홍용원 박다빈" },
        { role: "애니메이션부", name: "조은결 안준범 김하은" },
        { role: "디지인부", name: "최서원 김연우 이미래" },
      ],
    },
  ];

  return (
    <Layout>
      <div className="staff-container">
        <div className="staff-content">
          {/* 메인 타이틀 */}
          <h1 className="main-title">2025 SECAN</h1>

          {/* 기본 정보 */}
          <div className="staff-info">
            <p>세종대학교 만화애니메이션학과 졸업/과제작품 전시회</p>
          </div>

          <div className="staff-location">
            <div>장소: 서울특별시 광진구 능동로 209 세종대학교</div>
            <div style={{ marginLeft: "40px" }}>광개토관 지하1층 세종뮤지엄갤러리3관</div>
            <div style={{ marginLeft: "40px" }}>https://secan-exhibition.com/</div>
          </div>

          <div className="staff-date">
            <div>개최일시: 25.10.20-10.27</div>
          </div>

          {/* 스태프 리스트 */}
          <div className="staff-list">
            {staffData.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <StaffListItem role={section.section} isSection={true} />
                {section.members.map((member, memberIndex) => (
                  <StaffListItem key={memberIndex} role={member.role} name={member.name} />
                ))}
                {sectionIndex !== staffData.length - 1 && <div className="staff-divider"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Staff;
