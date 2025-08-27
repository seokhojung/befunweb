import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { config } from "@/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Befun - 당신만의 특별한 공간을 만들어보세요",
  description: "Befun 구성기를 사용하여 색상, 재질, 크기를 자유롭게 선택하고 완벽한 제품을 만들어보세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* GA4 스크립트 */}
        {config.analytics.enabled && config.analytics.measurementId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${config.analytics.measurementId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${config.analytics.measurementId}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)]`}
      >
        {children}
      </body>
    </html>
  );
}
