const quickLinks = ["분양안내", "단지안내", "평면안내", "오시는길"];
const infoLinks = ["이용약관", "개인정보처리방침", "분양정보"];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white/60 text-xs py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 pb-8 border-b border-white/10">
          {/* Brand */}
          <div className="md:w-56 shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-[var(--brand)] flex items-center justify-center">
                <span className="text-white text-xs font-bold">B</span>
              </div>
              <span className="text-white text-sm font-semibold">Busan Private Rentals</span>
            </div>
            <p className="leading-relaxed text-white/40">
              부산의 중심에서 누리는
              <br />
              고품격 민간임대 라이프
            </p>
          </div>

          {/* Company info */}
          <div className="flex-1">
            <p className="text-white/80 font-medium mb-2">부산프라이빗임대(주)</p>
            <p className="leading-relaxed">
              사업자등록번호: 000-00-00000 | 대표자: 홍길동
              <br />
              주소: 부산광역시 수영구 일원
              <br />
              대표전화: 1588-0000 | 이메일: info@busanprivate.kr
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-1">
            <p className="text-white/80 font-medium mb-2">바로가기</p>
            {quickLinks.map((l) => (
              <a key={l} href="#" className="hover:text-white transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-white/30">
            © 2026 Busan Private Rentals. All rights reserved.
          </p>
          <div className="flex gap-4">
            {infoLinks.map((l) => (
              <a key={l} href="#" className="hover:text-white transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
