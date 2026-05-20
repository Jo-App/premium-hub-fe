"use client";

import { useState } from "react";

const locationTags = [
  {
    id: "01",
    label: "대중교통",
    items: ["지하철 2호선 광안역 5분", "버스 정류장 도보 2분", "BRT 광안대로 진입 편리"],
  },
  {
    id: "02",
    label: "교육",
    items: ["초·중·고등학교 인근", "수영구 학원가 밀집", "명지대 부산캠퍼스 근접"],
  },
  {
    id: "03",
    label: "의료/편의",
    items: ["대형마트 도보 5분", "종합병원 차량 10분", "대형 쇼핑몰 근접"],
  },
  {
    id: "04",
    label: "여가",
    items: ["광안리 해수욕장 차량 5분", "BIFF 광장 접근 용이", "수영만 요트경기장 인접"],
  },
];

export default function LocationSection() {
  const [active, setActive] = useState("01");
  const current = locationTags.find((t) => t.id === active)!;

  return (
    <section id="location" className="bg-white py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest text-[var(--brand)] mb-2">LOCATION</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-2">입지환경</h2>
          <p className="text-sm text-gray-500">
            부산의 교통 요충지에 위치하여 어디서든 편리한 이동이 가능합니다.
            <br className="hidden md:block" />
            교육환경과 생활 인프라를 동시에 누릴 수 있는 최적의 입지입니다.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Map placeholder */}
          <div className="lg:flex-1 bg-gray-100 rounded-2xl overflow-hidden relative min-h-[280px] md:min-h-[380px]">
            <div className="absolute inset-0 bg-[url('/images/map.jpg')] bg-cover bg-center" />
            {/* Map overlay — brand pin */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-xl shadow-xl px-5 py-3 text-center">
                <p className="text-xs text-gray-400 mb-0.5">FORENA</p>
                <p className="text-sm font-bold text-[var(--foreground)]">부산 민간임대</p>
              </div>
            </div>
            {/* Placeholder label if no image */}
            <div className="absolute bottom-4 left-4 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
              지도 이미지 교체 필요
            </div>
          </div>

          {/* Location info */}
          <div className="lg:w-72 flex flex-col gap-3">
            {/* Tabs */}
            <div className="grid grid-cols-2 gap-2">
              {locationTags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setActive(tag.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                    active === tag.id
                      ? "bg-[var(--brand)] text-white"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span
                    className={`text-[10px] font-bold ${
                      active === tag.id ? "text-white/70" : "text-[var(--brand)]"
                    }`}
                  >
                    {tag.id}
                  </span>
                  {tag.label}
                </button>
              ))}
            </div>

            {/* Detail */}
            <div className="bg-gray-50 rounded-xl p-4 flex-1">
              <p className="text-xs font-semibold text-[var(--brand)] mb-3">
                {current.id}. {current.label}
              </p>
              <ul className="flex flex-col gap-2">
                {current.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#contact"
              className="text-center text-sm font-semibold bg-[var(--brand)] text-white py-3 rounded-lg hover:bg-[var(--brand-dark)] transition-colors"
            >
              현장 방문 예약하기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
