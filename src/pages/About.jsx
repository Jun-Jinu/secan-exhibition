import React from "react";
import { Link } from "react-router-dom";
import Layout from "../layouts/Layout";

const About = () => {
  // 예시: 이미지 배경 사용 (실제 이미지 경로로 변경하세요)
  // const backgroundImage = '/path/to/your/image.jpg';

  return (
    <Layout
    // backgroundImage={backgroundImage}  // 이미지 배경 사용시 주석 해제
    // overlay={true}                     // 오버레이 사용시 주석 해제
    // overlayType="dark"                 // 'dark' 또는 'light'
    >
      <div className="container">
        <div style={{ paddingTop: "60px" }}>
          <h1>About Us</h1>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <p>이 페이지는 About 페이지입니다. 이미지 배경을 사용하려면 Layout 컴포넌트의 props를 활용하세요.</p>

            <h2>이미지 배경 사용 방법:</h2>
            <div style={{ backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
              <h3>1. 기본 이미지 배경:</h3>
              <code style={{ backgroundColor: "#e8e8e8", padding: "4px 8px", borderRadius: "4px" }}>
                {'<Layout backgroundImage="/path/to/image.jpg">'}
              </code>

              <h3>2. 오버레이가 있는 이미지 배경:</h3>
              <code
                style={{
                  backgroundColor: "#e8e8e8",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  display: "block",
                  marginTop: "8px",
                }}
              >
                {'<Layout backgroundImage="/path/to/image.jpg" overlay={true} overlayType="dark">'}
              </code>

              <h3>3. CSS 클래스로 직접 적용:</h3>
              <code
                style={{
                  backgroundColor: "#e8e8e8",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  display: "block",
                  marginTop: "8px",
                }}
              >
                {'<div className="bg-image" style={{backgroundImage: "url(/path/to/image.jpg)"}}>'}
              </code>
            </div>

            <h2>사용 가능한 CSS 클래스들:</h2>
            <ul>
              <li>
                <code>.bg-image</code> - 기본 이미지 배경 (cover)
              </li>
              <li>
                <code>.bg-image-contain</code> - 이미지 전체 표시 (contain)
              </li>
              <li>
                <code>.bg-image-fixed</code> - 고정된 배경 이미지
              </li>
              <li>
                <code>.bg-overlay</code> - 어두운 오버레이
              </li>
              <li>
                <code>.bg-overlay-light</code> - 밝은 오버레이
              </li>
              <li>
                <code>.container</code> - 반응형 컨테이너
              </li>
              <li>
                <code>.flex-center</code> - 중앙 정렬
              </li>
              <li>
                <code>.full-height</code> - 전체 높이
              </li>
            </ul>

            <Link to="/">
              <button style={{ marginTop: "20px" }}>홈으로 돌아가기</button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
