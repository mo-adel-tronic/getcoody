import { PagesName, RoutesName } from "@/core/utils/constants";
import { layoutHandler } from "@/core/lib/LayoutHandler";
import DefaultLayout from "../_comp/DefaultLayout";
import AppFormFrame from "@/ui/atoms/blocks/AppFormFrame";

export default async function page() {
  const [layout, userData, subjects] = await layoutHandler();
  return (
    <DefaultLayout
    layout={layout}
    userData={userData}
    subjects={subjects}
    pageTitle="الإختبار القبلي"
    currentRoute={RoutesName.preExam}
    profileHeaderItems={[
      {
        text: PagesName.preExam,
        href: RoutesName.preExam
      }
    ]}
    def={<></>}
    pre={<AppFormFrame src="https://forms.office.com/Pages/ResponsePage.aspx?id=zZ541qgBl0-fhapIKR9VcNSrYWLptQZNsjgRxkD3LUJUMTYzU1FLTjQ2WUxNMVZXVUJDUEhJNkpLUy4u&embed=true" />}
    main={<></>}
    post={<></>}
    result={<></>}
    />
  );
}
