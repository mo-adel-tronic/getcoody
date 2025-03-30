import H1 from "@/ui/atoms/text/H1";
import DefaultLayout from "./_comp/DefaultLayout";
import { PagesName, RoutesName } from "@/core/utils/constants";
import ClassroomBody from "./_comp/ClassroomBody";
import { layoutHandler } from "@/core/lib/LayoutHandler";

export default async function page() {
  const [layout, userData, subjects] = await layoutHandler();
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
