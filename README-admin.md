# 관리자 페이지 설정 가이드

## 1. Supabase 프로젝트 설정

1. [Supabase](https://supabase.com/)에서 새 프로젝트를 생성합니다.
2. 프로젝트 대시보드에서 **Settings** > **API**로 이동합니다.
3. **Project URL**과 **anon public** API 키를 복사합니다.

## 2. 환경 변수 설정

1. 프로젝트 루트에 `.env` 파일을 생성합니다:

```bash
cp .env.example .env
```

2. `.env` 파일을 열고 Supabase 정보를 입력합니다:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 3. 데이터베이스 및 Storage 설정

1. Supabase 대시보드에서 **SQL Editor**로 이동합니다.
2. `supabase-schema.sql` 파일의 내용을 복사하여 실행합니다.
3. **Storage**에서 `secan`이라는 이름의 버킷을 생성합니다:
   - Storage > Buckets > New bucket
   - Name: `secan`
   - Public: true (체크)
4. 이렇게 하면 다음 테이블들이 생성됩니다:
   - `admin_users`: 관리자 계정
   - `works`: 작품 정보 (졸업작품 여부 포함)
   - `work_authors`: 작품별 작가 정보 (이름, 역할, 이메일)

## 4. 관리자 페이지 접근

1. 개발 서버를 시작합니다:

```bash
npm run dev
```

2. 브라우저에서 `http://localhost:5173/admin`으로 이동합니다.

3. 기본 관리자 계정으로 로그인합니다:
   - **아이디**: admin
   - **비밀번호**: admin123

## 5. 작품 관리 기능

관리자 페이지에서 다음 기능을 사용할 수 있습니다:

### 작품 추가/수정 (모든 필드 필수)

- **작품명**: 필수 입력
- **부제목**: 필수 입력
- **작품 카테고리**: animation, comics, artwork 중 선택 (필수)
- **장르 카테고리**: 필수 입력 (예: 액션, 로맨스, SF 등)
- **시간/길이**: 필수 입력 (예: 3분 30초, 10페이지 등)
- **작품 설명**: 필수 입력
- **작품 링크**: URL 형식 (필수)
- **작품 이미지**: 파일 업로드 (필수) - JPEG, PNG, GIF, WebP 지원, 최대 10MB
- **졸업작품 여부**: 체크박스로 선택
- **작가 정보**: 복수 입력 가능, 각 작가별로 이름, 역할, 이메일 모두 필수

### 작품 목록 관리

- 등록된 모든 작품 목록 조회
- 썸네일, 제목, 카테고리, 장르, 작가(이름, 역할, 이메일), 시간, 졸업작품 여부 표시
- 수정/삭제 기능
- 졸업작품/과제작품 구분 표시

## 6. 보안 주의사항

⚠️ **중요**: 현재 구현은 개발/테스트 목적으로, 실제 프로덕션 환경에서는 다음 사항들을 개선해야 합니다:

1. **비밀번호 해싱**: 현재는 평문 비밀번호를 사용하므로, bcrypt 등을 사용한 해싱 구현 필요
2. **세션 관리**: JWT 토큰 또는 Supabase Auth 사용 권장
3. **환경 변수**: 민감한 정보는 환경 변수로 관리
4. **RLS 정책**: Supabase Row Level Security 정책 강화

## 7. 데이터 구조

### works 테이블

```sql
- id: UUID (Primary Key)
- title: 작품명 (필수)
- subtitle: 부제목 (필수)
- category: 카테고리 (animation/comics/artwork) (필수)
- genre: 장르 (필수)
- duration: 시간/길이 (필수)
- description: 작품 설명 (필수)
- work_link: 작품 링크 (필수)
- image_url: 이미지 URL (필수)
- is_graduation: 졸업작품 여부 (boolean) (필수)
- created_at: 생성일
- updated_at: 수정일
```

### work_authors 테이블

```sql
- id: UUID (Primary Key)
- work_id: 작품 ID (Foreign Key)
- author_name: 작가명 (필수)
- author_role: 역할 (필수)
- author_email: 이메일 (필수)
- created_at: 생성일
```

## 8. 새로운 기능들

### 이미지 업로드

- Supabase Storage의 `secan` 버킷을 사용하여 이미지 파일을 직접 업로드
- 지원 형식: JPEG, PNG, GIF, WebP
- 최대 파일 크기: 10MB
- 자동으로 고유한 파일명 생성 및 공개 URL 반환

### 졸업작품 구분

- 각 작품을 졸업작품 또는 과제작품으로 구분
- 관리자 목록에서 배지로 시각적 구분 표시

### 확장된 작가 정보

- 기존: 작가 이름만
- 현재: 작가 이름, 역할, 이메일 모두 필수
- 복수 작가 지원으로 협업 작품 관리 가능

## 9. WorksGallery 컴포넌트와의 연동

관리자 페이지에서 추가한 작품 데이터는 `src/utils/supabase.js`의 `worksAPI.getAllWorks()` 함수를 통해 기존 `WorksGallery` 컴포넌트에서 사용할 수 있습니다.

확장된 데이터 구조:

```javascript
{
  id: "uuid",
  title: "작품명",
  subtitle: "부제목",
  category: "animation",
  genre: "장르",
  duration: "3분 30초",
  description: "작품 설명",
  work_link: "https://...",
  image_url: "https://supabase.storage.../secan/works/...",
  is_graduation: true,
  authors: [
    {
      author_name: "김철수",
      author_role: "감독",
      author_email: "kim@example.com"
    }
  ]
}
```
