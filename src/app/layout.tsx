import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Talent Atmos",
  description: "Admin Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
