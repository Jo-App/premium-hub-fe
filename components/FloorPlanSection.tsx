"use client";

import { useState } from "react";

const types = [
  {
    id: "84A",
    label: "84㎡ A",
    area: "84.95㎡",
    supplyArea: "113.26㎡",
    rooms: 3,
    baths: 2,
    balcony: 1,
  },
  {
    id: "84B",
    label: "84㎡ B",
    area: "84.36㎡",
    supplyArea: "112.84㎡",
    rooms: 3,
    baths: 2,
    balcony: 1,
  },
  {
    id: "94",
    label: "94㎡",
    area: "94.20㎡",
    supplyArea: "124.15㎡",
    rooms: 3,
    baths: 2,
    balcony: 2,
  },
  {
    id: "55",
    label: "55㎡",
    area: "55.95㎡",
    supplyArea: "75.80㎡",
    rooms: 2,
    baths: 1,
    balcony: 1,
  },
];

export default function FloorPlanSection() {
  const [active, setActive] = useState("84A");
  const plan = types.find((t) => t.id === active)!;

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

        {/* Type tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {types.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === t.id
                  ? "bg-[var(--brand)] text-white shadow-sm"
                  : "bg-white text-gray-500 border border-gray-200 hover:border-[var(--brand)] hover:text-[var(--brand)]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Plan image placeholder */}
          <div className="md:flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center min-h-[280px] md:min-h-[380px] relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/floorplan-84a.jpg')] bg-cover bg-center opacity-20" />
            <div className="relative z-10 flex flex-col items-center gap-3 text-gray-300">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              </svg>
              <p className="text-sm">{plan.label} 평면도</p>
              <p className="text-xs">이미지 교체 필요</p>
            </div>
          </div>

          {/* Plan info */}
          <div className="md:w-72 flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-sm font-bold text-[var(--foreground)] mb-4">{plan.label} 타입</p>
              <div className="flex flex-col gap-3">
                <InfoRow label="전용면적" value={plan.area} />
                <InfoRow label="공급면적" value={plan.supplyArea} />
                <InfoRow label="침실" value={`${plan.rooms}개`} />
                <InfoRow label="욕실" value={`${plan.baths}개`} />
                <InfoRow label="발코니" value={`${plan.balcony}개`} />
              </div>
            </div>

            {/* CTA */}
            <a
              href="tel:1588-0000"
              className="flex items-center justify-center gap-2 bg-[var(--brand)] text-white font-semibold py-3.5 rounded-xl hover:bg-[var(--brand-dark)] transition-colors text-sm shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              전화 상담 (1588-0000)
            </a>

            <button className="border-2 border-[var(--brand)] text-[var(--brand)] font-semibold py-3 rounded-xl hover:bg-[var(--brand-light)] transition-colors text-sm">
              상담신청하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
      <span className="text-xs text-gray-400">{label}</span>
      <span className="text-sm font-semibold text-[var(--foreground)]">{value}</span>
    </div>
  );
}
