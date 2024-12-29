import type { Metadata } from "next";

import { Geist, Geist_Mono, Lato, Fjalla_One, Poppins, Caudex } from "next/font/google";
import "./globals.css";
import StoreProvider from "./storeProvider";
import { Footer, Header } from "@/components";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthLayout from "@/components/AuthLayout";

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

const caudex = Caudex({
  variable: "--font-caudex",
  subsets: ["latin"],
  weight: "400",
  style: "normal",
})

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
      <head>
        <script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${caudex.variable} ${flajallaOne.variable} ${lato.variable} antialiased bg-white dark:bg-[#020617] font-poppins `}
      >
        <GoogleOAuthProvider clientId={process.env.VITE_GOOGLE_CLIENT_ID!}>
          <StoreProvider>
            <AuthLayout>
              <Header />
              {children}
              <Footer />
            </AuthLayout>
          </StoreProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
