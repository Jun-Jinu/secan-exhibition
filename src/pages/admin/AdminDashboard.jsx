import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { worksAPI } from "../../utils/supabase";
import WorkForm from "./WorkForm";
import WorksList from "./WorksList";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [works, setWorks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingWork, setEditingWork] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadWorks();
  }, []);

  const loadWorks = async () => {
    try {
      setIsLoading(true);
      const data = await worksAPI.getAllWorks();
      setWorks(data);
    } catch (error) {
      setError("작품 데이터를 불러오는데 실패했습니다.");
      console.error("Error loading works:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateWork = () => {
    setEditingWork(null);
    setShowForm(true);
  };

  const handleEditWork = (work) => {
    setEditingWork(work);
    setShowForm(true);
  };

  const handleDeleteWork = async (workId) => {
    if (!confirm("정말로 이 작품을 삭제하시겠습니까?")) {
      return;
    }

    try {
      await worksAPI.deleteWork(workId);
      await loadWorks();
    } catch (error) {
      setError("작품 삭제에 실패했습니다.");
      console.error("Error deleting work:", error);
    }
  };

  const handleFormSubmit = async () => {
    setShowForm(false);
    setEditingWork(null);
    await loadWorks();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingWork(null);
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>전시 관리자</h1>
          <div className="admin-header-actions">
            <span>안녕하세요, {user?.username}님</span>
            <button onClick={logout} className="logout-button">
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        <div className="admin-content">
          <div className="admin-section-header">
            <h2>작품 관리</h2>
            <button onClick={handleCreateWork} className="create-button">
              새 작품 추가
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          {showForm && (
            <div className="form-overlay">
              <WorkForm work={editingWork} onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
            </div>
          )}

          {isLoading ? (
            <div className="loading">작품 데이터를 불러오는 중...</div>
          ) : (
            <WorksList works={works} onEdit={handleEditWork} onDelete={handleDeleteWork} />
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
