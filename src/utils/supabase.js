import { createClient } from "@supabase/supabase-js";

// 환경변수 또는 직접 설정 (실제 프로젝트에서는 환경변수 사용 권장)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "YOUR_SUPABASE_URL";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "YOUR_SUPABASE_ANON_KEY";

export const supabase = createClient(supabaseUrl, supabaseKey);

// 이미지 업로드 함수
export const uploadImage = async (file, category = "works") => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `${category}/${fileName}`;

  const { data, error } = await supabase.storage.from("secan").upload(filePath, file);

  if (error) {
    throw error;
  }

  // 공개 URL 가져오기
  const { data: urlData } = supabase.storage.from("secan").getPublicUrl(filePath);

  return urlData.publicUrl;
};

// 작품 관련 API 함수들
export const worksAPI = {
  // 모든 작품 가져오기
  async getAllWorks() {
    const { data, error } = await supabase
      .from("works")
      .select(
        `
        *,
        authors:work_authors(
          author_name,
          author_role,
          author_email
        )
      `
      )
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  // 특정 작품 가져오기
  async getWorkById(id) {
    const { data, error } = await supabase
      .from("works")
      .select(
        `
        *,
        authors:work_authors(
          author_name,
          author_role,
          author_email
        )
      `
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  // 카테고리별 작품 가져오기
  async getWorksByCategory(category, isGraduation = null) {
    let query = supabase
      .from("works")
      .select(
        `
        *,
        authors:work_authors(
          author_name,
          author_role,
          author_email
        )
      `
      )
      .eq("category", category)
      .order("created_at", { ascending: false });

    // 졸업작품 여부로 필터링
    if (isGraduation !== null) {
      query = query.eq("is_graduation", isGraduation);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  },

  // 작품 추가
  async createWork(workData) {
    const { authors, ...workFields } = workData;

    // 작품 데이터 삽입
    const { data: work, error: workError } = await supabase.from("works").insert(workFields).select().single();

    if (workError) throw workError;

    // 작가 정보 삽입 (복수 가능)
    if (authors && authors.length > 0) {
      const authorsData = authors.map((author) => ({
        work_id: work.id,
        author_name: author.name,
        author_role: author.role,
        author_email: author.email,
      }));

      const { error: authorsError } = await supabase.from("work_authors").insert(authorsData);

      if (authorsError) throw authorsError;
    }

    return work;
  },

  // 작품 수정
  async updateWork(id, workData) {
    const { authors, ...workFields } = workData;

    // 작품 데이터 업데이트
    const { data: work, error: workError } = await supabase
      .from("works")
      .update(workFields)
      .eq("id", id)
      .select()
      .single();

    if (workError) throw workError;

    // 기존 작가 정보 삭제 후 새로 추가
    if (authors) {
      await supabase.from("work_authors").delete().eq("work_id", id);

      if (authors.length > 0) {
        const authorsData = authors.map((author) => ({
          work_id: id,
          author_name: author.name,
          author_role: author.role,
          author_email: author.email,
        }));

        const { error: authorsError } = await supabase.from("work_authors").insert(authorsData);

        if (authorsError) throw authorsError;
      }
    }

    return work;
  },

  // 작품 삭제
  async deleteWork(id) {
    // 연관된 작가 정보 먼저 삭제
    await supabase.from("work_authors").delete().eq("work_id", id);

    // 작품 삭제
    const { error } = await supabase.from("works").delete().eq("id", id);

    if (error) throw error;
  },
};

// 간단한 관리자 인증 함수들
export const adminAPI = {
  // 로그인 (간단한 ID/PW 체크)
  async login(username, password) {
    // 실제 프로젝트에서는 더 안전한 인증 방식 사용 권장
    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("username", username)
      .eq("password", password) // 실제로는 해시된 비밀번호 사용
      .single();

    if (error) throw error;
    return data;
  },
};
