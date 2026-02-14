import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import LayoutContent from "./components/LayoutContent";
import SplashWrapper from "./components/SplashWrapper";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HeartScript - Valentine Special",
  description: "Create beautiful love cards and code romantic algorithms.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased font-sans`}
      >
        <SplashWrapper>
          <Navbar />
          <LayoutContent>
            {children}
          </LayoutContent>
        </SplashWrapper>
      </body>
    </html>
  );
}
