import ProfileHeader from "./ProfileHeader";
import { RoutesName } from "@/core/utils/constants";
import AppSection from "@/ui/atoms/blocks/AppSection";
import H2 from "@/ui/atoms/text/H2";
import ProfileDataForm from "./ProfileDataForm";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { UserEntity } from "@/types";

export default function DefaultLayout({ user }: { user: UserEntity }) {
  return (
      <SidebarProvider>
      <DefaultAppSidebar />
      <SidebarInset>
        <ProfileHeader
                items={[
                  {
                    text: "الرئيسية",
                    href: RoutesName.home,
                  },
                  {
                    text: "البيانات الشخصية",
                    href: RoutesName.editProfile,
                  },
                ]}
              />
              <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <AppSection withBG={true}>
                  <div className="w-2/3 mx-auto text-center">
                    <H2 text="تحديث البيانات الشخصية" />
                  </div>
                  <ProfileDataForm user={user} />
                </AppSection>
              </div>
      </SidebarInset>
    </SidebarProvider>
  )
}