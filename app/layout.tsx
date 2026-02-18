import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
