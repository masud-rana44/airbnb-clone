import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import { Navbar } from "@/components/navbar/Navbar";
import { RegisterModal } from "@/components/modals/RegisterModal";
import { ClientOnly } from "@/components/ClientOnly";
import ToasterProvider from "@/providers/ToasterProvider";
import { LoginModal } from "@/components/modals/LoginModal";

import "./globals.css";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { RentModal } from "@/components/modals/RentModal";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <ToasterProvider />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
