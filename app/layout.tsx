import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anotador - Un sentimiento",
  description: "Crea y lleva el control de tus partidos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={clsx(roboto.className, "bg-black")}>
        <main className="w-[396px] h-[484px] mx-auto overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
