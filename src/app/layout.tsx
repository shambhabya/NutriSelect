import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DietDataProvider } from "@/context/dietDataContext";
import { DietProvider } from "@/context/myDietContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Indian Diet",
  description: "Diet Recommendation App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DietDataProvider>
          <DietProvider>{children}</DietProvider>
        </DietDataProvider>
      </body>
    </html>
  );
}
