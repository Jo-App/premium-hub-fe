const rows = [
  { label: "사업명", value: "부산 신규 민간임대아파트(가칭)" },
  { label: "위치", value: "부산광역시 일원" },
  { label: "세대수", value: "1,240세대" },
  { label: "규모", value: "지하 4층 ~ 지상 49층, 4개동" },
  { label: "주거전용", value: "84㎡ / 94㎡ / 104㎡ / 114㎡" },
  { label: "착공", value: "2026년 하반기 예정" },
  { label: "준공", value: "2029년 예정" },
  { label: "건설사", value: "부산건설(주) 외 1사" },
];

const stats = [
  { label: "적지", value: "49호", unit: "" },
  { label: "총 세대수", value: "1,240", unit: "세대" },
  { label: "대지면적", value: "1.3만", unit: "㎡" },
  { label: "전용면적", value: "84 / 94", unit: "㎡" },
];

export default function ProjectOverview() {
  return (
    <section id="overview" className="bg-[var(--surface)] py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Stats bar — mobile prominent */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100"
            >
              <p className="text-xs text-gray-400 mb-1">{s.label}</p>
              <p className="text-xl md:text-2xl font-bold text-[var(--brand)]">
                {s.value}
                <span className="text-sm font-medium text-gray-500 ml-0.5">{s.unit}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Section label + title */}
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest text-[var(--brand)] mb-2">
            PROJECT OUTLINE
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">사업개요</h2>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`flex flex-col sm:flex-row ${
                i !== rows.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className="sm:w-32 md:w-40 px-5 py-3.5 bg-gray-50 text-xs font-semibold text-gray-500 shrink-0">
                {row.label}
              </div>
              <div className="px-5 py-3.5 text-sm text-[var(--foreground)]">{row.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
