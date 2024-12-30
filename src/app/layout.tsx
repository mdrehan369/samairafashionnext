import type { Metadata } from "next";

import {
  Geist,
  Geist_Mono,
  Lato,
  Fjalla_One,
  Poppins,
  Caudex,
} from "next/font/google";
import "./globals.css";
import StoreProvider from "./storeProvider";
import { Footer, Header } from "@/components";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthLayout from "@/components/AuthLayout";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  preload: true,
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  preload: true,
});

const flajallaOne = Fjalla_One({
  variable: "--font-fjalla-one",
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  preload: true,
});

const caudex = Caudex({
  variable: "--font-caudex",
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  preload: true,
});

export const metadata: Metadata = {
  title: "Samaira Fashion",
  description: "Your one stop shop for Abayas, Hijabs, and more!",
  applicationName: "Samaira Fashion",
  category: "Shopping",
  openGraph: {
    type: "website",
    description: "Your one stop shop for Abayas, Hijabs, and more!",
    siteName: "Samaira Fashion",
    title: "Samaira Fashion",
    url: "https://samairafashion.in",
    emails: "shop.samaira@gmail.com",
    phoneNumbers: ["+971521660581"],
  },
  keywords: [
    "Samaira Fashion",
    "abaya",
    "abaya shop",
    "abaya online",
    "modest fashion",
    "Islamic clothing",
    "modest wear",
    "hijab fashion",
    "abaya styles",
    "women's abayas",
    "buy abaya online",
    "modern abaya",
    "traditional abaya",
    "luxury abaya",
    "casual abaya",
    "party abaya",
    "embroidered abaya",
    "open abaya",
    "closed abaya",
    "black abaya",
    "colored abaya",
    "silk abaya",
    "chiffon abaya",
    "cotton abaya",
    "linen abaya",
    "jersey abaya",
    "crepe abaya",
    "velvet abaya",
    "abaya UAE",
    "abaya Saudi Arabia",
    "abaya Qatar",
    "abaya UK",
    "abaya USA",
    "abaya Australia",
    "evening abaya",
    "Ramadan abaya",
    "Eid abaya",
    "wedding abaya",
    "formal abaya",
    "everyday abaya",
    "affordable abaya",
    "luxury abaya",
    "abaya sale",
    "custom abaya",
    "tailored abaya",
    "abaya deals",
    "abaya discounts",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js"
        ></script>
      </head>
      <body
        className={`${poppins.variable} ${caudex.variable} ${flajallaOne.variable} ${lato.variable} antialiased bg-white dark:bg-[#020617] font-poppins overflow-x-hidden`}
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
