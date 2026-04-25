import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import AppHeader from "@/components/AppHeader";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PostApp",
  description: "A fullstack Next.js posts application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <AppHeader />
        <main className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </main>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}