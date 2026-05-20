import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "부산 프리미엄 민간임대 | Busan Private Rentals",
  description:
    "부산의 중심에서 누리는 고품격 민간임대 라이프. 사전 알림 신청 기간 중입니다.",
  keywords: "부산 민간임대, 프리미엄 임대아파트, 부산 아파트, 임대주택",
  openGraph: {
    title: "부산 프리미엄 민간임대",
    description: "부산의 중심에서 누리는 고품격 민간임대 라이프",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
