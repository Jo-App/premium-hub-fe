"use client";

import { useState } from "react";
import type { LocationCategory, HomeSettings } from "@/app/lib/api";

const API = process.env.NEXT_PUBLIC_API_URL ?? "";

export default function LocationClient({
  categories, settings,
}: {
  categories: LocationCategory[];
  settings: HomeSettings | null;
}) {
  const [activeId, setActiveId] = useState<number>(categories[0]?.id ?? 0);

  const current = categories.find((c) => c.id === activeId) ?? categories[0];

  return (
    <section id="location" className="bg-white py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest text-[var(--brand)] mb-2">LOCATION</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-2">
            {settings?.location_title ?? "입지환경"}
          </h2>
          {settings?.location_desc && (
            <p className="text-sm text-gray-500 whitespace-pre-line">{settings.location_desc}</p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* 지도 영역 */}
          <div className="lg:flex-1 bg-gray-100 rounded-2xl overflow-hidden relative min-h-[280px] md:min-h-[380px]">
            {settings?.map_image_file ? (
              <img src={`${API}${settings.map_image_file}`} alt="위치 지도" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 bg-[url('/images/map.jpg')] bg-cover bg-center" />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-xl shadow-xl px-5 py-3 text-center">
                <p className="text-xs text-gray-400 mb-0.5">FORENA</p>
                <p className="text-sm font-bold text-[var(--foreground)]">부산 민간임대</p>
              </div>
            </div>
            {!settings?.map_image_file && (
              <div className="absolute bottom-4 left-4 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
                지도 이미지 교체 필요
              </div>
            )}
          </div>

          {/* 입지 정보 */}
          {categories.length > 0 && (
            <div className="lg:w-72 flex flex-col gap-3">
              {/* 탭 */}
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat, idx) => (
                  <button key={cat.id} onClick={() => setActiveId(cat.id)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                      activeId === cat.id
                        ? "bg-[var(--brand)] text-white"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className={`text-[10px] font-bold ${activeId === cat.id ? "text-white/70" : "text-[var(--brand)]"}`}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* 항목 목록 */}
              {current && (
                <div className="bg-gray-50 rounded-xl p-4 flex-1">
                  <p className="text-xs font-semibold text-[var(--brand)] mb-3">{current.label}</p>
                  <ul className="flex flex-col gap-2">
                    {current.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <a href="#contact"
                className="text-center text-sm font-semibold bg-[var(--brand)] text-white py-3 rounded-lg hover:bg-[var(--brand-dark)] transition-colors">
                현장 방문 예약하기
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
