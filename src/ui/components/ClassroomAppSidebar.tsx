"use client"

import { Sidebar, SidebarContent, SidebarHeader, useSidebar } from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import AppImage from "../atoms/media/AppImage";
import { NavMain } from "./NavMain";
import { MainNavItemType } from "@/types";
import AppLoader from "../atoms/media/AppLoader";

type Props = {
    mainNav: MainNavItemType[]
    sideProps?: React.ComponentProps<typeof Sidebar>
}
export default function ClassroomAppSidebar({mainNav, ...sideProps}: Props) {
  const {open} = useSidebar()
  const { data: session, status } = useSession() as { data: { user: { image: string, name: string } } | null, status: string };
  return (
    <Sidebar collapsible="icon" {...sideProps} side="right">
      <SidebarHeader className="bg-primary">
        <div className="flex flex-col justify-center items-center gap-2">
                <div className="border-secondary shadow-xl border-2 p-1 rounded-full">
                {
                  status == 'loading' || !session ?
                  <AppLoader /> :
                  <AppImage src={session.user.image} alt="user" width={80} height={80} className="bg-white rounded-full shadow-lg" />
                }
                </div>
                {
                  (open == true && status == 'authenticated') && <h3 className="text-white ms-3 text-sm font-bold">{session?.user.name}</h3>
                }
                </div>
      </SidebarHeader>
      <SidebarContent className="bg-background">
          <NavMain items={mainNav} />
      </SidebarContent>
    </Sidebar>
  )
}