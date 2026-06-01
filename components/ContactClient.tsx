"use client";

import { useState } from "react";
import { submitConsultation } from "@/app/lib/api";

const INQUIRY_TYPES = ["분양문의", "임대문의", "평면문의", "기타"];

export default function ContactClient({ phone }: { phone: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    inquiry_type: "",
    message: "",
    agree: false,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.agree) return;
    setSubmitting(true);
    setError(null);
    try {
      await submitConsultation({
        name: form.name,
        phone: form.phone,
        inquiry_type: form.inquiry_type || "기타",
        message: form.message || undefined,
      });
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "제출 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="bg-[var(--foreground)] py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
          {/* Left */}
          <div className="md:flex-1 text-white">
            <p className="text-xs font-semibold tracking-widest text-[var(--brand)] mb-2">CONTACT</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              전문 상담사와 만나보세요
            </h2>
            <p className="text-sm text-white/70 leading-relaxed mb-8">
              궁금한 사항이 있으시면 언제든지 문의해 주세요.
              <br />
              평일 9시 ~ 18시 전문 상담사가 친절하게 안내드립니다.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[var(--brand)]/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[var(--brand)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-white/50">전화 상담</p>
                  <a href={`tel:${phone}`} className="text-lg font-bold text-[var(--brand)] hover:text-[var(--brand-light)] transition-colors">
                    {phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[var(--brand)]/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[var(--brand)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-white/50">상담 시간</p>
                  <p className="text-sm text-white">평일 09:00 ~ 18:00 (주말 10:00~17:00)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:w-96 w-full bg-white rounded-2xl p-6 shadow-xl">
            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <div className="w-14 h-14 rounded-full bg-[var(--brand-light)] flex items-center justify-center">
                  <svg className="w-7 h-7 text-[var(--brand)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-bold text-[var(--foreground)]">신청이 완료되었습니다!</p>
                <p className="text-sm text-gray-500">담당자가 빠른 시일 내에 연락드리겠습니다.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", inquiry_type: "", message: "", agree: false }); }}
                  className="text-xs text-[var(--brand)] hover:underline"
                >
                  다시 작성하기
                </button>
              </div>
            ) : (
              <>
                <p className="font-bold text-[var(--foreground)] mb-1">관심고객 등록</p>
                <p className="text-xs text-gray-400 mb-5">정보를 입력하시면 우선 안내를 드립니다</p>

                {error && (
                  <div className="text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2 mb-4">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="성함 *"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[var(--brand)] transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="연락처 (010-0000-0000) *"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[var(--brand)] transition-colors"
                  />
                  <select
                    value={form.inquiry_type}
                    onChange={(e) => setForm({ ...form, inquiry_type: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-500 focus:outline-none focus:border-[var(--brand)] transition-colors bg-white"
                  >
                    <option value="">문의 유형 선택</option>
                    {INQUIRY_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <textarea
                    placeholder="문의 내용 (선택)"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[var(--brand)] transition-colors resize-none"
                  />
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.agree}
                      onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                      required
                      className="mt-0.5 accent-[var(--brand)]"
                    />
                    <span className="text-xs text-gray-400 leading-relaxed">
                      개인정보 수집 및 이용에 동의합니다.
                    </span>
                  </label>
                  <button
                    type="submit"
                    disabled={submitting || !form.agree}
                    className="w-full bg-[var(--brand)] text-white font-semibold py-3.5 rounded-lg hover:bg-[var(--brand-dark)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm mt-1 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>신청 중...</>
                    ) : "관심고객 등록하기"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
