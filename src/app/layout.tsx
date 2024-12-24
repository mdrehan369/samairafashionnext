import type { Metadata } from "next";
import { Geist, Geist_Mono, Lato, Fjalla_One, Poppins } from "next/font/google";
import "./globals.css";
import StoreProvider from "./storeProvider";
import { Footer, Header } from "@/components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: "400",
  style: "normal",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "400",
  style: "normal",
});

const flajallaOne = Fjalla_One({
  variable: "--font-fjalla-one",
  subsets: ["latin"],
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Samaira Fashion",
  description: "Your one stop shop for Abayas, Hijabs, and more!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${flajallaOne.variable} ${lato.variable} antialiased bg-white dark:bg-[#020617] font-poppins`}
      >
        <StoreProvider>
          <Header />
          {children}
        </StoreProvider>
        <Footer />
      </body>
    </html>
  );
}
