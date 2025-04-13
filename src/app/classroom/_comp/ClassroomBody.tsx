import { SubjectEntity, UserEntity } from "@/types";
import AppSection from "@/ui/atoms/blocks/AppSection";
import PieChartWithCustomizedLabel from "./totalSubject";
import React from "react";
import AppSmallCard from "@/ui/atoms/blocks/AppSmallCard";
import { BookOpen, ListTodo, Paperclip, Repeat } from "lucide-react";
import {
  getCurrentLesson,
  getUserTracking
} from "@/api/lessons";

interface Props {
  user: UserEntity;
  subjects: SubjectEntity[];
}

function Box({ txt, chart }: { txt: string; chart: React.ReactElement }) {
  return (
    <AppSection>
      <div className="flex flex-col md:flex-row text-center justify-around items-center">
        <div className="w-1/2 bg-gray-200 shadow-lg border-x-2 border-secondary-hover rounded-md">
          <div className="bg-primary text-white text-2xl rounded-t-md py-2">
            {txt}
          </div>
          <div>{chart}</div>
        </div>
      </div>
    </AppSection>
  );
}

export default async function ClassroomBody({ user, subjects }: Props) {
  const currentSubject: SubjectEntity | undefined = subjects.find(
    (sub) => sub.id == user.learning_passed
  );
  const currentLesson: {
    lessonID: number;
    title: string;
    task_details: string;
    activity_details: string
  } = (await getCurrentLesson(currentSubject?.id || 0, user.id || 0)).data[0];
  const tarcking = currentLesson ? (
    await getUserTracking(currentLesson.lessonID || 0, user.id || 0)
  ).data[0] : null;
  return (
    <div className="flex flex-1 flex-col p-4 pt-0">
      <Box
        txt="تحليل مستوى التقدم في دراسة الموضوعات"
        chart={
          <PieChartWithCustomizedLabel
            data={[
              {
                name: "موضوعات أنهيتها",
                value: user.learning_passed! - 1,
              },
              {
                name: "موضوعات متبقية لك",
                value: subjects.length + 1 - user.learning_passed!,
              },
            ]}
            colors={["#2DAA9E", "#A31D1D"]}
          />
        }
      />

      <Box
        txt="الموضوع الذي تقوم بدراسته الأن"
        chart={
          <>
            <AppSmallCard
              title={
                currentSubject?.title_prefix + ": " + currentSubject?.title ||
                ""
              }
              body=""
              icon={<Paperclip className="text-secondary-hover" />}
            />
          </>
        }
      />

      <Box
        txt="الدرس الذي تقوم بدراسته الأن"
        chart={
          <>
            <AppSmallCard
              title={currentLesson?.title || ""}
              body=""
              icon={<BookOpen className="text-secondary-hover" />}
            />
          </>
        }
      />

      <Box
        txt="تكليف الدرس الحالي"
        chart={
          <>
            <AppSmallCard
              title={
                currentLesson?.task_details == null || tarcking == null
                  ? "لا يوجد تكليف لهذا الدرس"
                  : tarcking.task == 0
                  ? "لم تقم بإرسال التكليف حتى الأن"
                  : tarcking.task == 1
                  ? "تم عمل التكليف بنجاح"
                  : "تم إرسال التكليف ولكن يوجد بعض التعديلات"
              }
              body=""
              icon={<ListTodo className="text-secondary-hover" />}
            />
          </>
        }
      />

      <Box
        txt="نشاط الدرس الحالي"
        chart={
          <>
            <AppSmallCard
              title={
                currentLesson?.activity_details == null || tarcking == null
                  ? "لا يوجد نشاط لهذا الدرس"
                  : "عدد محاولاتك في هذا النشاط : " + `${tarcking.activity_attempts}`
              }
              body=""
              icon={<Repeat className="text-secondary-hover" />}
            />
          </>
        }
      />

      {/* <AppSection>
        <div className="md:w-2/3 w-11/12 mx-auto text-center bg-primary text-white my-6 py-3 font-bold rounded-lg">
          <h2>التكليفات</h2>
          </div>
          <div className="flex flex-col md:flex-row text-center justify-around items-center gap-y-6">
            
            <AppColoredCard bgClass="bg-green-600" title="التكليفات المقبولة" body="0" />
            <AppColoredCard bgClass="bg-red-600" title="التكليفات المرفوضة" body="0" />
          </div>
        </AppSection> */}

      {/* <AppSection>
        <div className="md:w-2/3 w-11/12 mx-auto text-center bg-primary text-white my-6 py-3 font-bold rounded-lg">
          <h2>المشاركات الإجتماعية</h2>
          </div>
          <div className="flex flex-col md:flex-row text-center justify-around items-center gap-y-6">
            <AppColoredCard title="عدد المنشورات" body="0" />
            <AppColoredCard bgClass="bg-secondary" textColorClass="text-secondary-foreground" title="المشاركة مع للأقران" body="0%" />
            <AppColoredCard bgClass="bg-green-600" title="الإعجاب بمنشوراتك" body="0" />
            <AppColoredCard bgClass="bg-red-600" title="التعليق علي منشوراتك" body="0" />
          </div>
        </AppSection> */}
    </div>
  );
}
