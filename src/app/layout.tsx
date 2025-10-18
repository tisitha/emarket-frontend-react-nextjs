import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "E-Market",
  description: "Online Shopping : Clothes, Electronics & Phones..",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <main>{children}</main>
        <Toaster richColors expand={true} position="top-right" />
      </body>
    </html>
  );
}
