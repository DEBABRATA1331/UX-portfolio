import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata = {
  title: "Debabrata Sahoo Portfolio",
  description: "Product & UX Research Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} antialiased selection:bg-white/20 selection:text-white`}>
      <body className="font-sans bg-zinc-950 text-zinc-100">{children}</body>
    </html>
  );
}
