import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { BackgroundEffects } from "@/components/features/BackgroundEffects";
import { ThemeToggle } from "@/components/features/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechnoWeb Flashcards",
  description: "Révision moderne et premium pour TechnoWeb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="flex flex-col relative overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BackgroundEffects />
          
          <header className="fixed top-0 w-full z-50 p-4 flex justify-end items-center">
            <ThemeToggle />
          </header>

          <main className="flex-1 flex flex-col pt-16">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
