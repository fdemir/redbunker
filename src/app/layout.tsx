import type { Metadata } from "next";
import { Reddit_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "./providers";

const redditmono = Reddit_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Redbunker",
  description: "Create book summary by using generative AI. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          redditmono.className
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
