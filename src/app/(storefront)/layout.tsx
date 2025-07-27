import type { Metadata } from "next";
import { NavBar } from "@/components/navbar/navbar";

export const metadata: Metadata = {
  title: "Tracker",
  description: "crypto-tracker",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
