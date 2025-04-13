import H1 from "@/ui/atoms/text/H1";
import DefaultLayout from "./_comp/DefaultLayout";
import { PagesName, RoutesName } from "@/core/utils/constants";
import ClassroomBody from "./_comp/ClassroomBody";
import { layoutHandler } from "@/core/lib/LayoutHandler";
import { notFound } from "next/navigation";
import { authOptions } from "@/core/utils/NextAuth";
import { getServerSession } from "next-auth";

export default async function page() {
  const [layout, userData, subjects] = await layoutHandler();
  const session = await getServerSession(authOptions)
  if (session && session.user?.email) {} else {notFound()}
  return (
    <DefaultLayout
    layout={layout}
    userData={userData}
    subjects={subjects}
    pageTitle="تحليلات عامة"
    currentRoute={RoutesName.classroom}
    profileHeaderItems={[
      {
        text: PagesName.classroom,
        href: RoutesName.classroom
      }
    ]}
    def={<div className="text-center px-3">
      <H1 mainText="لابد من إكتمال البيانات الشخصية الخاصة بك أولًا ثم الإنتهاء من المتطلبات القبلية لعرض محتوي الصفحة" />
    </div>}
    pre={<div className="text-center px-3">
      <H1 mainText="لابد من الإنتهاء من المتطلبات القبلية لعرض محتوي الصفحة" />
    </div>}
    main={<ClassroomBody user={userData} subjects={subjects} />}
    post={<ClassroomBody user={userData} subjects={subjects} />}
    result={<ClassroomBody user={userData} subjects={subjects} />}
    />
  );
}
