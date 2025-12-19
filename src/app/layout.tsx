import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Fira_Code, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "linty.io - The daily coding challenge.",
  description:
    "The daily coding challenge. Solve puzzles, earn points, and level up your skills.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "linty.io - The daily coding challenge.",
    description:
      "The daily coding challenge. Solve puzzles, earn points, and level up your skills.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${firaCode.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
