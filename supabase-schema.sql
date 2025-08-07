-- 관리자 사용자 테이블
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL, -- 실제 프로덕션에서는 해시된 비밀번호 사용
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 작품 테이블
CREATE TABLE IF NOT EXISTS works (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL, -- 'animation', 'comics', 'artwork'
  genre VARCHAR(100) NOT NULL,
  duration VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  work_link VARCHAR(500) NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  thumbnail_url VARCHAR(500) NOT NULL, -- 썸네일 이미지 URL (필수)
  is_graduation BOOLEAN NOT NULL DEFAULT false, -- 졸업작품 여부
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 작품 작가 테이블 (다대다 관계) - 확장된 정보
CREATE TABLE IF NOT EXISTS work_authors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  work_id UUID REFERENCES works(id) ON DELETE CASCADE,
  author_name VARCHAR(255) NOT NULL,
  author_role VARCHAR(255) NOT NULL, -- 역할 (예: 감독, 작화, 시나리오 등)
  author_email VARCHAR(255) NOT NULL, -- 이메일
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_works_category ON works(category);
CREATE INDEX IF NOT EXISTS idx_works_created_at ON works(created_at);
CREATE INDEX IF NOT EXISTS idx_works_is_graduation ON works(is_graduation);
CREATE INDEX IF NOT EXISTS idx_work_authors_work_id ON work_authors(work_id);

-- RLS (Row Level Security) 설정 (선택사항)
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE works ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_authors ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 작품을 읽을 수 있도록 정책 설정
CREATE POLICY "Anyone can read works" ON works FOR SELECT USING (true);
CREATE POLICY "Anyone can read work_authors" ON work_authors FOR SELECT USING (true);

-- 관리자만 작품을 수정할 수 있도록 정책 설정 (실제 구현 시 인증 로직 필요)
-- CREATE POLICY "Admins can manage works" ON works FOR ALL USING (auth.uid() IN (SELECT id FROM admin_users));

-- 샘플 관리자 사용자 추가 (비밀번호: admin123)
INSERT INTO admin_users (username, password) VALUES ('admin', 'admin123') ON CONFLICT (username) DO NOTHING;

-- Storage 버킷 생성 (Supabase 대시보드에서 수동으로 생성하거나 아래 SQL 실행)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('secan', 'secan', true) ON CONFLICT DO NOTHING;
