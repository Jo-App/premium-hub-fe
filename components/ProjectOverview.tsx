import { getProjectStats, getProjectRows } from "@/app/lib/api";

export default async function ProjectOverview() {
  const [stats, rows] = await Promise.all([
    getProjectStats().catch(() => []),
    getProjectRows().catch(() => []),
  ]);

  return (
    <section id="overview" className="bg-[var(--surface)] py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* 통계 카드 */}
        {stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((s) => (
              <div key={s.id} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                <p className="text-xl md:text-2xl font-bold text-[var(--brand)]">
                  {s.value}
                  {s.unit && <span className="text-sm font-medium text-gray-500 ml-0.5">{s.unit}</span>}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* 섹션 라벨 */}
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest text-[var(--brand)] mb-2">PROJECT OUTLINE</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">사업개요</h2>
        </div>

        {/* 테이블 */}
        {rows.length > 0 && (
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            {rows.map((row, i) => (
              <div key={row.id} className={`flex flex-col sm:flex-row ${i !== rows.length - 1 ? "border-b border-gray-100" : ""}`}>
                <div className="sm:w-32 md:w-40 px-5 py-3.5 bg-gray-50 text-xs font-semibold text-gray-500 shrink-0">
                  {row.label}
                </div>
                <div className="px-5 py-3.5 text-sm text-[var(--foreground)]">{row.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
