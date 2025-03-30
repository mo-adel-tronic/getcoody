import { PagesName, RoutesName } from "@/core/utils/constants";
import { layoutHandler } from "@/core/lib/LayoutHandler";
import DefaultLayout from "../_comp/DefaultLayout";
import ProfileDataForm from "../_comp/ProfileDataForm";

export default async function page() {
  const [layout, userData, subjects] = await layoutHandler();
  return (
    <DefaultLayout
    layout={layout}
    userData={userData}
    subjects={subjects}
    pageTitle="البيانات الشخصية"
    currentRoute={RoutesName.profile}
    profileHeaderItems={[
      {
        text: PagesName.profile,
        href: RoutesName.profile
      }
    ]}
    def={<ProfileDataForm user={userData}
    api_k={process.env.NEXTAUTH_SECRET || ''} />}
    pre={<ProfileDataForm user={userData} 
    api_k={process.env.NEXTAUTH_SECRET || ''} />}
    main={<ProfileDataForm user={userData} 
    api_k={process.env.NEXTAUTH_SECRET || ''} />}
    post={<ProfileDataForm user={userData} 
    api_k={process.env.NEXTAUTH_SECRET || ''} />}
    result={<ProfileDataForm user={userData} 
    api_k={process.env.NEXTAUTH_SECRET || ''} />}
    />
  );
}
