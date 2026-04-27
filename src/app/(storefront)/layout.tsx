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
    <div className="h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
