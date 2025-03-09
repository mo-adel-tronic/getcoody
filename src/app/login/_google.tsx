'use client'
import { RoutesName } from "@/core/utils/constants";
import AppBtn from "@/ui/atoms/controls/AppBtn";
import { signIn } from "next-auth/react";

export default function GoogleSignInPage() {
  return (
    <div>
      <div className="flex justify-center">
      <AppBtn
        className="bg-red-500"
        onClick={
          () => {
            signIn("google",{
              redirect: true,
              callbackUrl: RoutesName.editProfile
            });
            
          }
        }
      >
        <div className="flex justify-center gap-x-2 items-center">
          تسجيل الدخول بواسطة جوجل
        </div>
      </AppBtn>
    </div>
    <div className="text-center mt-4">
    </div>
    </div>
  );
}
