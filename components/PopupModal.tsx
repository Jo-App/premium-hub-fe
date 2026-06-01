"use client";

import { useEffect, useState } from "react";
import type { Popup } from "@/app/lib/api";

const API = process.env.NEXT_PUBLIC_API_URL ?? "";
const DISMISS_KEY = "dismissed_popups";

function getDismissed(): number[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(DISMISS_KEY) ?? "[]"); } catch { return []; }
}

function dismiss(id: number) {
  const prev = getDismissed();
  localStorage.setItem(DISMISS_KEY, JSON.stringify([...new Set([...prev, id])]));
}

export default function PopupModal({ popups }: { popups: Popup[] }) {
  const [visible, setVisible] = useState<Popup[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const dismissed = getDismissed();
    const show = popups.filter(
      (p) => p.status === "active" && !dismissed.includes(p.id)
    );
    setVisible(show);
  }, [popups]);

  if (visible.length === 0) return null;

  const popup = visible[current];
  if (!popup) return null;

  function close(todayOnly = false) {
    if (todayOnly) dismiss(popup.id);
    if (current < visible.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      setVisible([]);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* 이미지 */}
        {popup.image_file && (
          <div className="relative w-full aspect-[4/3] bg-gray-100">
            <img
              src={`${API}${popup.image_file}`}
              alt={popup.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* 내용 */}
        <div className="p-5">
          <h3 className="font-bold text-[var(--foreground)] text-base mb-1">{popup.title}</h3>
          {visible.length > 1 && (
            <p className="text-xs text-gray-400 mb-3">{current + 1} / {visible.length}</p>
          )}

          {popup.link_url && (
            <a
              href={popup.link_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-[var(--brand)] text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-[var(--brand-dark)] transition-colors mb-3"
            >
              자세히 보기
            </a>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => close(true)}
              className="flex-1 py-2 text-xs text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              오늘 하루 보지 않기
            </button>
            <button
              onClick={() => close(false)}
              className="flex-1 py-2 text-xs text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors font-medium"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
