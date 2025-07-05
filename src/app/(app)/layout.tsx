import type { Metadata } from "next";
import { Syne, Inter, Chivo } from "next/font/google";
import localFont from "next/font/local";
import QueryClientProvider from "@/components/QueryClientProvider";
import "./globals.css";
import PageTransition from "@/components/motion/PageTransition";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const chivo = Chivo({
  subsets: ["latin"],
  variable: "--font-chivo",
});

const ariom = localFont({
  src: "../../../public/fonts/Ariom-Bold/Ariom-Bold.ttf",
  variable: "--font-ariom",
});

const hellix = localFont({
  src: [
    {
      path: "../../../public/fonts/hellix/Hellix-Thin.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../../public/fonts/hellix/Hellix-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/hellix/Hellix-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/hellix/Hellix-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/hellix/Hellix-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/fonts/hellix/Hellix-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/hellix/Hellix-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../../public/fonts/hellix/Hellix-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-hellix",
});

export const metadata: Metadata = {
  title: "GEN – A new space for global minds",
  description:
    "Connect, discover, and tap into a global community — in person and across borders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`bg-black/90 ${ariom.variable} ${hellix.variable} ${syne.variable} ${inter.variable} ${chivo.variable}`}
    >
      <body className="antialiased h-screen sm:flex sm:items-center sm:max-w-md mx-auto">
        <QueryClientProvider>
          <PageTransition>{children}</PageTransition>
        </QueryClientProvider>
      </body>
    </html>
  );
}
