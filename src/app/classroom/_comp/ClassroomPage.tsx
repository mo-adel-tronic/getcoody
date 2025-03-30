import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  ProfileHeaderItemType,
  type MainNavItemType,
} from "@/types";
import ClassroomAppSidebar from "@/ui/components/ClassroomAppSidebar";
import ProfileHeader from "./ProfileHeader";
import AppSection from "@/ui/atoms/blocks/AppSection";
import H2 from "@/ui/atoms/text/H2";

type Props = {
  mainNav: MainNavItemType[];
  profileHeaderItems?: ProfileHeaderItemType[];
  pageTitle: string;
  children: React.ReactNode;
};

export default function ClassroomPage({
  pageTitle,
  mainNav,
  profileHeaderItems,
  children,
}: Props) {
  return (
    <SidebarProvider>
      <ClassroomAppSidebar mainNav={mainNav} />
      <SidebarInset>
        <ProfileHeader items={profileHeaderItems || []} />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <AppSection withBG={true}>
            <div className="w-2/3 mx-auto text-center">
              <H2 text={pageTitle} />
            </div>
            {children}
          </AppSection>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
