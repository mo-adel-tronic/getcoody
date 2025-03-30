'use client'

import { signOut, useSession } from "next-auth/react";
import AppBtn from "@/ui/atoms/controls/AppBtn";
import { useTransition } from "react";
import useRevalidate from "@/hooks/useRevalidate";


type Props = {
  api_k: string
}

export default function SignoutBtn({api_k}: Props) {
    const [isPending, startTransition] = useTransition();
    const { data: session, status } = useSession() as { data: { user: { email: string } } | null, status: string };
    const revalidate = useRevalidate(session?.user.email!, api_k)
    const handleLogout = async () => {
        if (status == 'authenticated') {
          startTransition(async () => {
            await revalidate()
          });
          await signOut()
        }
      };
  return (
    <AppBtn
      className="bg-red-500 hover:bg-red-700 text-sm font-bold"
      disabled={isPending}
      onClick={handleLogout}
      >
        {isPending ? 'جاري تسجيل الخروج': 'تسجيل خروج'}
      </AppBtn>
  )
}