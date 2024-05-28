import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "./providers";

const robotoslab = Roboto_Slab({
  subsets: ["latin"],
  weight: "400",
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
          robotoslab.className
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
