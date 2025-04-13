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
    pageTitle="الاستبيان القبلي"
    currentRoute={RoutesName.preServey}
    profileHeaderItems={[
      {
        text: PagesName.preServey,
        href: RoutesName.preServey
      }
    ]}
    def={<></>}
    pre={<AppFormFrame src="https://forms.office.com/r/UrM2vPMUNp?embed=true" />}
    main={<></>}
    post={<></>}
    result={<></>}
    />
  );
}
