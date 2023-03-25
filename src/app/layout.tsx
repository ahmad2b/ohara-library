import "./globals.css";
import Header from "@/components/Header";

import { Roboto_Slab } from "next/font/google";

const roboto = Roboto_Slab({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-roboto",
  subsets: ["latin-ext"],
  display: "swap",
});

export const metadata = {
  title: "Ohara Library",
  description: "Created using Simple Book API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${roboto.className}`}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
