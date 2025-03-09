import type { Metadata, Viewport } from "next";
import "./globals.css";
import { appViewport, DESCRIBTION, ICON } from "@/core/utils/meta";
import { getServerSession } from "next-auth";
import { authOptions } from "@/core/utils/NextAuth";
import AppSession from "@/ui/providers/AppSession";

export const metadata: Metadata = {
  title: {
    default: 'GetCoody',
    template: '%s | GetCoody'
  },
  description: DESCRIBTION,
  icons: ICON
};
export const viewport: Viewport = appViewport

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = getServerSession(authOptions); 
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`font-tajawal antialiased text-[20px] md:text-[16]`}
      >
        <AppSession session={await session}>
          {children}
        </AppSession>
      </body>
    </html>
  );
}