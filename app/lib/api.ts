const BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.detail ?? `API Error ${res.status}`);
  }
  return res.json();
}

// ── SiteMenu ────────────────────────────────────────────────────
export interface SiteMenu {
  id: number;
  name: string;
  link_url: string;
  sort_order: number;
  is_active: boolean;
}

export function getSiteMenus(): Promise<SiteMenu[]> {
  return get<SiteMenu[]>("/api/v1/site-menus/public");
}

// ── Popup ───────────────────────────────────────────────────────
export interface Popup {
  id: number;
  title: string;
  image_file: string | null;
  link_url: string | null;
  start_date: string | null;
  end_date: string | null;
  priority: number;
  is_active: boolean;
  status: "active" | "pending" | "ended";
}

export function getActivePopups(): Promise<Popup[]> {
  return get<Popup[]>("/api/v1/popups/public");
}

// ── FloorPlan ───────────────────────────────────────────────────
export interface FloorPlanImage {
  id: number;
  image_file: string;
  is_main: boolean;
  sort_order: number;
}

export interface FloorPlan {
  id: number;
  name: string;
  exclusive_area: string | null;
  supply_area: string | null;
  composition: string | null;
  price_range: string | null;
  sort_order: number;
  is_active: boolean;
  images: FloorPlanImage[];
}

export function getFloorPlans(): Promise<FloorPlan[]> {
  return get<FloorPlan[]>("/api/v1/floorplans/public");
}

// ── ContactConfig ───────────────────────────────────────────────
export interface ContactConfig {
  main_phone: string;
  agent_phone: string | null;
  business_summary: string | null;
  notice: string | null;
}

// contact-config는 인증이 필요해서 퍼블릭 엔드포인트를 통해 제공받거나
// 환경변수 폴백을 사용합니다.
export async function getContactConfig(): Promise<ContactConfig> {
  try {
    return await get<ContactConfig>("/api/v1/contact-config/public");
  } catch {
    // API 오류 시 기본값 폴백
    return { main_phone: "1600-0000", agent_phone: null, business_summary: null, notice: null };
  }
}

// ── Consultation Submit ─────────────────────────────────────────
export interface ConsultationSubmitBody {
  name: string;
  phone: string;
  inquiry_type: string;
  message?: string;
}

export function submitConsultation(body: ConsultationSubmitBody) {
  return post<{ id: number }>("/api/v1/consultations/submit", body);
}
