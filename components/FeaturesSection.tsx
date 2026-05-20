const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "프리미엄 입지",
    desc: "부산의 핵심입지에 위치한 편리한 교통환경과 프리미엄 인프라를 누리세요.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "대단지 프리미엄",
    desc: "대규모 단지가 제공하는 다양한 커뮤니티 시설과 쾌적한 주거환경을 경험하세요.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "직사 방문 상담",
    desc: "전 세대 84㎡이상 전용 주거공간으로 쾌적하고 편리한 라이프를 제공합니다.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-white py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col items-center text-center gap-4 p-6 rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 rounded-full bg-[var(--brand-light)] text-[var(--brand)] flex items-center justify-center shrink-0">
                {f.icon}
              </div>
              <div>
                <h3 className="text-base font-bold text-[var(--foreground)] mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
