import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import About from "./pages/About";

// INFO 페이지들
import Exhibition from "./pages/info/Exhibition";
import OpeningAni from "./pages/info/OpeningAni";
import Staff from "./pages/info/Staff";

// ANIMATION 페이지들
import AnimationGraduation from "./pages/animation/Graduation";
import AnimationAssignment from "./pages/animation/Assignment";

// COMICS 페이지들
import ComicsGraduation from "./pages/comics/Graduation";
import ComicsAssignment from "./pages/comics/Assignment";

// ARTWORK 페이지들
import ArtworkGraduation from "./pages/artwork/Graduation";
import ArtworkAssignment from "./pages/artwork/Assignment";

// 작품 상세 페이지
import WorkDetailPage from "./pages/WorkDetailPage";

// 404 페이지
import NotFound from "./pages/NotFound";

// 관리자 페이지
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* 관리자 페이지 라우트 - 별도 레이아웃 */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 일반 사용자 페이지들 - 기존 레이아웃 */}
            <Route
              path="/*"
              element={
                <>
                  <Navigation />
                  <main>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />

                      {/* INFO 라우트들 */}
                      <Route path="/info/exhibition" element={<Exhibition />} />
                      <Route path="/info/opening-ani" element={<OpeningAni />} />
                      <Route path="/info/staff" element={<Staff />} />

                      {/* ANIMATION 라우트들 */}
                      <Route path="/animation/graduation" element={<AnimationGraduation />} />
                      <Route path="/animation/assignment" element={<AnimationAssignment />} />

                      {/* COMICS 라우트들 */}
                      <Route path="/comics/graduation" element={<ComicsGraduation />} />
                      <Route path="/comics/assignment" element={<ComicsAssignment />} />

                      {/* ARTWORK 라우트들 */}
                      <Route path="/artwork/graduation" element={<ArtworkGraduation />} />
                      <Route path="/artwork/assignment" element={<ArtworkAssignment />} />

                      {/* 작품 상세 페이지 라우트 */}
                      <Route path="/:category/:type/:id" element={<WorkDetailPage />} />

                      {/* 404 페이지 - 마지막에 배치 */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
