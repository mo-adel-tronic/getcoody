"use client"

import { Sidebar, SidebarContent, SidebarHeader, useSidebar } from "@/components/ui/sidebar";
import { RoutesName } from "@/core/utils/constants";
import { FileQuestionIcon, Home, Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import AppImage from "../atoms/media/AppImage";
import { NavMain } from "./NavMain";


// This is sample data.
const navMain = [
  {
    title: "الصفحة الرئيسية",
    url: RoutesName.home,
    icon: Home
  },
  {
    title: "البيانات الشخصية",
    url: RoutesName.profile,
    icon: FileQuestionIcon
  },
  {
    title: "الاختبارات القبلية",
    url: RoutesName.preExam,
    icon: FileQuestionIcon
  },
]

export function PreAppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {open} = useSidebar()
  const { data: session, status } = useSession() as { data: { user: { image: string, name: string } } | null, status: string };
  return (
    <Sidebar collapsible="icon" {...props} side="right">
      <SidebarHeader className="bg-primary">
        <div className="flex flex-col justify-center items-center gap-2">
        <div className="border-secondary shadow-xl border-2 p-1 rounded-full">
        {
          status == 'loading' || !session ?
          <Loader /> :
          <AppImage src={session.user.image} alt="user" width={80} height={80} className="bg-white rounded-full shadow-lg" />
        }
        </div>
        {
          (open == true && status == 'authenticated') && <h3 className="text-white ms-3 text-sm font-bold">{session?.user.name}</h3>
        }
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-background">
        <NavMain items={navMain} />
      </SidebarContent>
    </Sidebar>
  )
}
