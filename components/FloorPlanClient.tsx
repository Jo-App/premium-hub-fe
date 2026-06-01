"use client";

import { useState } from "react";
import type { FloorPlan } from "@/app/lib/api";

const API = process.env.NEXT_PUBLIC_API_URL ?? "";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
      <span className="text-xs text-gray-400">{label}</span>
      <span className="text-sm font-semibold text-[var(--foreground)]">{value}</span>
    </div>
  );
}

export default function FloorPlanClient({ plans }: { plans: FloorPlan[] }) {
  const [activeId, setActiveId] = useState<number>(plans[0]?.id ?? 0);
  const [imgIdx, setImgIdx] = useState(0);

  if (plans.length === 0) return null;

  const plan = plans.find((p) => p.id === activeId) ?? plans[0];
  const images = plan.images ?? [];
  const mainImg = images.find((i) => i.is_main) ?? images[0];
  const currentImg = images[imgIdx] ?? mainImg;

  function handleTabChange(id: number) {
    setActiveId(id);
    setImgIdx(0);
  }

  return (
    <section id="floorplan" className="bg-[var(--surface)] py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest text-[var(--brand)] mb-2">FLOOR PLAN</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-2">평면안내</h2>
          <p className="text-sm text-gray-500">
            쾌적한 거주 공간과 최적화된 구조로 설계된 평면을 확인하세요.
          </p>
        </div>

        {/* 타입 탭 */}
        <div className="flex flex-wrap gap-2 mb-8">
          {plans.map((p) => (
            <button
              key={p.id}
              onClick={() => handleTabChange(p.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeId === p.id
                  ? "bg-[var(--brand)] text-white shadow-sm"
                  : "bg-white text-gray-500 border border-gray-200 hover:border-[var(--brand)] hover:text-[var(--brand)]"
              }`}
            >
              {plan.exclusive_area && activeId === p.id
                ? `${p.name} (${p.exclusive_area})`
                : p.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* 평면도 이미지 */}
          <div className="md:flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[280px] md:min-h-[380px]">
            {currentImg ? (
              <div className="relative w-full h-full min-h-[280px] md:min-h-[380px]">
                <img
                  src={`${API}${currentImg.image_file}`}
                  alt={`${plan.name} 평면도`}
                  className="w-full h-full object-contain"
                />
                {/* 이미지 네비게이션 */}
                {images.length > 1 && (
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                    {images.map((img, i) => (
                      <button
                        key={img.id}
                        onClick={() => setImgIdx(i)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i === imgIdx ? "bg-[var(--brand)] scale-125" : "bg-gray-300 hover:bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-full min-h-[280px] flex flex-col items-center justify-center gap-3 text-gray-300">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                </svg>
                <p className="text-sm">{plan.name} 평면도</p>
                <p className="text-xs">이미지 준비 중</p>
              </div>
            )}
          </div>

          {/* 평면 정보 */}
          <div className="md:w-72 flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-sm font-bold text-[var(--foreground)] mb-4">{plan.name} 타입</p>
              <div className="flex flex-col gap-0">
                {plan.exclusive_area && <InfoRow label="전용면적" value={plan.exclusive_area} />}
                {plan.supply_area && <InfoRow label="공급면적" value={plan.supply_area} />}
                {plan.composition && <InfoRow label="구성" value={plan.composition} />}
                {plan.price_range && <InfoRow label="예상 가격" value={plan.price_range} />}
              </div>
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 bg-[var(--brand)] text-white font-semibold py-3.5 rounded-xl hover:bg-[var(--brand-dark)] transition-colors text-sm shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              상담 신청하기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
