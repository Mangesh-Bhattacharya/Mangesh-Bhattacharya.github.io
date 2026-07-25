import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mangesh Bhattacharya | Cybersecurity Engineer & AI Threat Detection Specialist",
  description:
    "Cybersecurity Engineer and MITS-AI graduate student specializing in cloud security (AWS & Azure), AI-driven threat detection, DevSecOps, and offensive security. Open for opportunities.",
  keywords: [
    "Mangesh Bhattacharya",
    "Cybersecurity Engineer",
    "Penetration Tester",
    "Cloud Security",
    "AWS Security",
    "Azure Security",
    "AI Threat Detection",
    "DevSecOps",
    "Bug Bounty",
  ],
  authors: [{ name: "Mangesh Bhattacharya" }],
  openGraph: {
    title: "Mangesh Bhattacharya | Cybersecurity Engineer & AI Threat Detection Specialist",
    description:
      "Cloud Security (AWS & Azure), AI Threat Detection, and DevSecOps. Explore projects, experience, and get in touch.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
