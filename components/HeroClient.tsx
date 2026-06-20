"use client";

import { useState } from "react";
import type { HeroSlide, HomeSettings } from "@/app/lib/api";

const API = process.env.NEXT_PUBLIC_API_URL ?? "";

const BG_GRADIENTS = [
  "from-slate-900/70 via-slate-800/60 to-slate-900/70",
  "from-sky-900/70 via-sky-800/60 to-sky-900/70",
  "from-teal-900/70 via-teal-800/60 to-teal-900/70",
];

export default function HeroClient({
  slides, settings, phone,
}: {
  slides: HeroSlide[];
  settings: HomeSettings | null;
  phone: string;
}) {
  const [current, setCurrent] = useState(0);

  const activeSlides = slides.length > 0 ? slides : [{
    id: 0, heading: "부산의 중심에서\n고품격 민간임대 라이프",
    sub_text: "부산 최고의 입지에서 새로운 삶의 방식을 경험하세요",
    image_file: null, sort_order: 0, is_active: true,
  }];

  const slide = activeSlides[current] ?? activeSlides[0];
  const bg = BG_GRADIENTS[current % BG_GRADIENTS.length];

  return (
    <section className="relative w-full h-[480px] md:h-[600px] lg:h-[680px] overflow-hidden">
      {/* 배경 */}
      <div className={`absolute inset-0 bg-gradient-to-br ${bg} bg-slate-800 transition-all duration-700`}>
        {slide.image_file ? (
          <img src={`${API}${slide.image_file}`} alt="히어로 배경" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        ) : (
          <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-60" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      </div>

      {/* 뱃지 */}
      <div className="absolute top-20 md:top-24 left-1/2 -translate-x-1/2 md:left-[calc(50%-220px)] md:translate-x-0 z-10">
        <span className="inline-block bg-[var(--brand)] text-white text-[10px] font-semibold tracking-widest px-3 py-1 rounded-sm">
          {settings?.hero_badge_text ?? "PREMIUM PRIVATE RENTAL"}
        </span>
      </div>

      {/* 공지 배너 */}
      {settings?.hero_notice_text && (
        <div className="absolute top-[68px] md:top-20 left-0 right-0 z-10 flex justify-center md:justify-start md:pl-[calc(50%-280px)]">
          <div className="bg-black/40 text-white text-xs px-4 py-1.5 rounded-full backdrop-blur-sm">
            📣 <span className="text-[var(--brand)] font-semibold">{settings.hero_notice_text}</span>
          </div>
        </div>
      )}

      {/* 본문 */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-snug drop-shadow-md whitespace-pre-line">
              {slide.heading}
            </h1>
            {slide.sub_text && (
              <p className="mt-4 text-sm md:text-base text-white/80 leading-relaxed whitespace-pre-line">
                {slide.sub_text}
              </p>
            )}
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={`tel:${phone}`}
                className="flex items-center gap-2 bg-[var(--brand)] text-white text-sm font-semibold px-5 py-3 rounded hover:bg-[var(--brand-dark)] transition-colors shadow-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                즉시 상담 전화하기
              </a>
              <a href="#contact" className="text-sm font-semibold border-2 border-white text-white px-5 py-3 rounded hover:bg-white/10 transition-colors">
                견학신청하기
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 슬라이더 점 */}
      {activeSlides.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {activeSlides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${i === current ? "bg-[var(--brand)] w-5" : "bg-white/50 w-2"}`}
              aria-label={`슬라이드 ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
