import { PagesName, RoutesName } from "@/core/utils/constants";
import { layoutHandler } from "@/core/lib/LayoutHandler";
import DefaultLayout from "../../_comp/DefaultLayout";
import { notFound } from "next/navigation";
import SubjectBody from "../../_comp/SubjectBody";
import { isSubjectOpen } from "@/core/lib/MainNavHelper";
import { SubjectEntity } from "@/types";

export default async function page({params} :  {
    params: Promise<{ id: string }>
  }) {
  const [layout, userData, subjects] = await layoutHandler();
  const { id } = await params;
  let subject: SubjectEntity | null = null;
  subjects.forEach((sub) => {
    if (sub.id.toString() === id) {
      subject = sub;
    }
  })
  if(!subject) {
    notFound()
  }
  return (
    <DefaultLayout
    layout={layout}
    userData={userData}
    subjects={subjects}
    pageTitle={(subject as SubjectEntity).title}
    currentRoute={RoutesName.subject + '/' + id}
    profileHeaderItems={[
      {
        text: PagesName.subject,
        href: RoutesName.subject + '/' + id
      }
    ]}
    def={<></>}
    pre={<></>}
    main={
      isSubjectOpen(parseInt(id), userData.learning_passed ?? 1) ?
      <SubjectBody subject={subject} /> : 
      <div className="flex justify-center items-center flex-col grow">
        <h1>لا يمكنك دراسة هذا الموضوع الأن ... يجب الإنتهاء أولًا من الموضوع السابق</h1>
      </div>
    }
    post={<></>}
    result={<></>}
    />
  );
}
