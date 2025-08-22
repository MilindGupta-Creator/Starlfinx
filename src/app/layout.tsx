import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import ErrorBoundary from "@/components/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Starlfinx - Premium E-commerce Store",
  description: "Discover amazing products at great prices with advanced search, filtering, and a seamless shopping experience",
  keywords: "e-commerce, online shopping, products, premium store, shopping cart",
  authors: [{ name: "Starlfinx Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          <CartProvider>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
          </CartProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
