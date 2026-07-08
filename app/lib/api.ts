const BASE = process.env.NEXT_PUBLIC_API_URL;

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
  return get<SiteMenu[]>("/v1/site-menus/public");
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
  return get<Popup[]>("/v1/popups/public");
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
  return get<FloorPlan[]>("/v1/floorplans/public");
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
    return await get<ContactConfig>("/v1/contact-config/public");
  } catch {
    // API 오류 시 기본값 폴백
    return { main_phone: "1600-0000", agent_phone: null, business_summary: null, notice: null };
  }
}

// ── Home Content ────────────────────────────────────────────────
export interface HeroSlide {
  id: number;
  heading: string;
  sub_text: string | null;
  image_file: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface HomeFeature {
  id: number;
  icon_key: string;
  title: string;
  description: string | null;
  sort_order: number;
}

export interface ProjectStat {
  id: number;
  label: string;
  value: string;
  unit: string | null;
  sort_order: number;
}

export interface ProjectRow {
  id: number;
  label: string;
  value: string;
  sort_order: number;
}

export interface LocationCategory {
  id: number;
  label: string;
  items: string[];
  sort_order: number;
  is_active: boolean;
}

export interface HomeSettings {
  map_image_file: string | null;
  hero_badge_text: string | null;
  hero_notice_text: string | null;
  location_title: string | null;
  location_desc: string | null;
}

export const getHeroSlides = () => get<HeroSlide[]>("/v1/home/public/hero-slides");
export const getHomeFeatures = () => get<HomeFeature[]>("/v1/home/public/home-features");
export const getProjectStats = () => get<ProjectStat[]>("/v1/home/public/project-stats");
export const getProjectRows = () => get<ProjectRow[]>("/v1/home/public/project-rows");
export const getLocationCategories = () => get<LocationCategory[]>("/v1/home/public/location-categories");
export const getHomeSettings = () => get<HomeSettings>("/v1/home/public/home-settings");

// ── Consultation Submit ─────────────────────────────────────────
export interface ConsultationSubmitBody {
  name: string;
  phone: string;
  inquiry_type: string;
  message?: string;
}

export function submitConsultation(body: ConsultationSubmitBody) {
  return post<{ id: number }>("/v1/consultations/submit", body);
}
