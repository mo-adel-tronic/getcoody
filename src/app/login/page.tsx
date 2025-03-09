import { Metadata } from "next";
import React from "react";
import GoogleSignInPage from "./_google";
import H3 from "@/ui/atoms/text/H3";

export const metadata: Metadata = {
  title: "login page",
};
export default function LoginPage() {
  return (
    <>
      <div className="mb-4">
        <H3 text="تسجيل الدخول عبر حسابك الشخصي علي جوجل" centered={true} />
      </div>
      <GoogleSignInPage />
    </>
  );
}
