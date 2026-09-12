import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bullseye FX",
  description: "AI Trading that runs itself 24/7",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-[#050507] text-white antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
