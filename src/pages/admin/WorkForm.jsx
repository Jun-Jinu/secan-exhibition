import React, { useState, useEffect } from "react";
import { worksAPI, uploadImage } from "../../utils/supabase";
import "./WorkForm.css";

const WorkForm = ({ work, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    category: "",
    genre: "",
    duration: "",
    description: "",
    work_link: "",
    image_url: "",
    thumbnail_url: "",
    is_graduation: false,
    authors: [{ name: "", role: "", email: "" }],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedThumbnailFile, setSelectedThumbnailFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (work) {
      setFormData({
        title: work.title || "",
        subtitle: work.subtitle || "",
        category: work.category || "",
        genre: work.genre || "",
        duration: work.duration || "",
        description: work.description || "",
        work_link: work.work_link || "",
        image_url: work.image_url || "",
        thumbnail_url: work.thumbnail_url || "",
        is_graduation: work.is_graduation || false,
        authors:
          work.authors?.length > 0
            ? work.authors.map((author) => ({
                name: author.author_name,
                role: author.author_role,
                email: author.author_email,
              }))
            : [{ name: "", role: "", email: "" }],
      });
    }
  }, [work]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 이미지 파일 유효성 검사
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError("이미지 파일만 업로드 가능합니다. (JPEG, PNG, GIF, WebP)");
        return;
      }

      // 파일 크기 검사 (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("파일 크기는 10MB 이하로 제한됩니다.");
        return;
      }

      setSelectedFile(file);
      setError("");
    }
  };

  const handleThumbnailFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 이미지 파일 유효성 검사
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError("썸네일은 이미지 파일만 업로드 가능합니다. (JPEG, PNG, GIF, WebP)");
        return;
      }

      // 파일 크기 검사 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("썸네일 파일 크기는 5MB 이하로 제한됩니다.");
        return;
      }

      setSelectedThumbnailFile(file);
      setError("");
    }
  };

  const handleAuthorChange = (index, field, value) => {
    const newAuthors = [...formData.authors];
    newAuthors[index] = {
      ...newAuthors[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      authors: newAuthors,
    }));
  };

  const addAuthor = () => {
    setFormData((prev) => ({
      ...prev,
      authors: [...prev.authors, { name: "", role: "", email: "" }],
    }));
  };

  const removeAuthor = (index) => {
    if (formData.authors.length > 1) {
      const newAuthors = formData.authors.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        authors: newAuthors,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      let imageUrl = formData.image_url;
      let thumbnailUrl = formData.thumbnail_url;

      // 새 메인 이미지 파일이 선택된 경우 업로드
      if (selectedFile) {
        setIsUploading(true);
        imageUrl = await uploadImage(selectedFile, formData.category);
      }

      // 새 썸네일 파일이 선택된 경우 업로드
      if (selectedThumbnailFile) {
        setIsUploading(true);
        thumbnailUrl = await uploadImage(selectedThumbnailFile, `${formData.category}/thumbnails`);
      }

      setIsUploading(false);

      // 메인 이미지 검증
      if (!work && !selectedFile && !formData.image_url) {
        // 신규 작품인 경우 메인 이미지 필수
        setError("작품 이미지를 업로드해주세요.");
        return;
      }

      // 썸네일 검증
      if (!work && !selectedThumbnailFile) {
        // 신규 작품인 경우 썸네일 필수
        setError("썸네일 이미지를 업로드해주세요.");
        return;
      }

      if (work && !formData.thumbnail_url && !selectedThumbnailFile) {
        // 기존 작품 수정 시 기존 썸네일이 없고 새로운 썸네일도 없는 경우만 에러
        setError("썸네일 이미지를 업로드해주세요.");
        return;
      }

      // 작가 정보 검증
      const validAuthors = formData.authors.filter(
        (author) => author.name.trim() && author.role.trim() && author.email.trim()
      );

      if (validAuthors.length === 0) {
        setError("최소 한 명의 작가 정보(이름, 역할, 이메일)를 입력해주세요.");
        return;
      }

      const submitData = {
        ...formData,
        image_url: imageUrl,
        thumbnail_url: thumbnailUrl,
        authors: validAuthors,
      };

      if (work) {
        await worksAPI.updateWork(work.id, submitData);
      } else {
        await worksAPI.createWork(submitData);
      }

      onSubmit();
    } catch (error) {
      setError("작품 저장에 실패했습니다: " + error.message);
      console.error("Error saving work:", error);
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  return (
    <div className="work-form-container">
      <div className="work-form">
        <h3>{work ? "작품 수정" : "새 작품 추가"}</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">작품명 *</label>
              <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="subtitle">부제목 *</label>
              <input
                type="text"
                id="subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">작품 카테고리 *</label>
              <select id="category" name="category" value={formData.category} onChange={handleInputChange} required>
                <option value="">카테고리 선택</option>
                <option value="animation">애니메이션</option>
                <option value="comics">만화</option>
                <option value="artwork">아트워크</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="genre">장르 카테고리 *</label>
              <input
                type="text"
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                placeholder="예: 액션, 로맨스, SF 등"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="duration">시간/길이 *</label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="예: 3분 30초, 10페이지 등"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="work_link">작품 링크 *</label>
              <input
                type="url"
                id="work_link"
                name="work_link"
                value={formData.work_link}
                onChange={handleInputChange}
                placeholder="https://..."
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image_file">작품 이미지 {work && formData.image_url ? "" : "*"}</label>
            <input type="file" id="image_file" accept="image/*" onChange={handleFileChange} className="file-input" />
            {selectedFile && <div className="file-info">선택된 파일: {selectedFile.name}</div>}
            {formData.image_url && !selectedFile && (
              <div className="current-image">
                <span>현재 이미지:</span>
                <img src={formData.image_url} alt="현재 이미지" className="current-image-preview" />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="thumbnail_file">썸네일 이미지 {work && formData.thumbnail_url ? "" : "*"}</label>
            <input
              type="file"
              id="thumbnail_file"
              accept="image/*"
              onChange={handleThumbnailFileChange}
              className="file-input"
              required={!work || !formData.thumbnail_url}
            />
            {selectedThumbnailFile && <div className="file-info">선택된 썸네일: {selectedThumbnailFile.name}</div>}
            {formData.thumbnail_url && !selectedThumbnailFile && (
              <div className="current-image">
                <span>현재 썸네일:</span>
                <img src={formData.thumbnail_url} alt="현재 썸네일" className="current-image-preview" />
              </div>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="is_graduation"
                  name="is_graduation"
                  checked={formData.is_graduation}
                  onChange={handleInputChange}
                />
                <label htmlFor="is_graduation">졸업작품</label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">작품 설명 *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              placeholder="작품에 대한 설명을 입력하세요..."
              required
            />
          </div>

          <div className="form-group">
            <label>작가 정보 * (모든 필드 필수)</label>
            {formData.authors.map((author, index) => (
              <div key={index} className="author-section">
                <div className="author-header">
                  <h4>작가 {index + 1}</h4>
                  {formData.authors.length > 1 && (
                    <button type="button" onClick={() => removeAuthor(index)} className="remove-author-button">
                      삭제
                    </button>
                  )}
                </div>
                <div className="author-fields">
                  <div className="author-field">
                    <label>이름 *</label>
                    <input
                      type="text"
                      value={author.name}
                      onChange={(e) => handleAuthorChange(index, "name", e.target.value)}
                      placeholder="작가 이름"
                      required
                    />
                  </div>
                  <div className="author-field">
                    <label>역할 *</label>
                    <input
                      type="text"
                      value={author.role}
                      onChange={(e) => handleAuthorChange(index, "role", e.target.value)}
                      placeholder="예: 감독, 작화, 시나리오 등"
                      required
                    />
                  </div>
                  <div className="author-field">
                    <label>이메일 *</label>
                    <input
                      type="email"
                      value={author.email}
                      onChange={(e) => handleAuthorChange(index, "email", e.target.value)}
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
            <button type="button" onClick={addAuthor} className="add-author-button">
              작가 추가
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="cancel-button" disabled={isSubmitting}>
              취소
            </button>
            <button type="submit" className="submit-button" disabled={isSubmitting || isUploading}>
              {isUploading ? "이미지 업로드 중..." : isSubmitting ? "저장 중..." : work ? "수정하기" : "추가하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkForm;
