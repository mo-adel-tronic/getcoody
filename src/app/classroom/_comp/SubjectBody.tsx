import { getCurrentLesson, getsubjectLessons, getUserTrackingInSubject } from "@/api/lessons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RoutesName } from "@/core/utils/constants";
import { SubjectEntity, LessonEntity, UserTracker, UserEntity } from "@/types";
import AppLink from "@/ui/atoms/controls/AppLink";
import { BookOpen, CheckCircle } from "lucide-react";
import React from "react";
import CompleteSubjectBtn from "./CompleteSubjectBtn";

type Props = {
  subject: SubjectEntity;
  userId: number;
  isSubjectEnd: boolean;
  countSubjects: number;
  userData: UserEntity
};
type CardItemsType = "lesson" | "target";
interface SubjectCardProps {
  cardTitle: string;
  cardList: {
    text:
      | string[]
      | {
          id: number;
          title: string;
          badge: React.JSX.Element;
        }[];
    type: CardItemsType;
  };
}

export default async function SubjectBody({
  subject,
  userId,
  isSubjectEnd,
  countSubjects,
  userData
}: Props) {
  const targets: string[] = JSON.parse(subject.targets);
  const lessons : LessonEntity[] = (await getsubjectLessons(subject.id)).data;
  const currentLesson = (await getCurrentLesson(subject.id, userId)).data[0];
  const lessonTracking : UserTracker[] = (await getUserTrackingInSubject(subject.id, userId)).data;
  const isSubjectBtnCanAppear= () => {
    if (lessons.length !== lessonTracking.length) {
      return false
    }
    return lessonTracking.every((lesson) => {
      const lessonData = lessons.find((less) => less.id === lesson.lesson_id);
      let skipTask = true
      let skipActivity = true
      if (lesson.task == 0 && lessonData && lessonData.task_details) {
        skipTask = false
      }
      if(lesson.activity_attempts == 0 && lessonData && lessonData.activity_details) {
        skipActivity = false
      }
      return skipActivity && skipTask
    })
  }
  let isAfterCurrent = false;
  const lessonsTitles = lessons.map((lesson: LessonEntity) => {
    let badge = (
      <Badge className="bg-green-600 text-white">تم دراسة المحتوي</Badge>
    );
    if (!isSubjectEnd) {
      if (currentLesson) {
        if (isAfterCurrent) {
          badge = <Badge variant="destructive">لم يتم دراسة المحتوي</Badge>;
        }
        if (parseInt(currentLesson.lessonID) == lesson.id) {
          badge = (
            <Badge className="bg-secondary-hover">جاري دراسة المحتوي</Badge>
          );
          isAfterCurrent = true;
        }
      } else {
        badge = <Badge variant="destructive">لم يتم دراسة المحتوي</Badge>;
      }
    }
    return {
      id: lesson.id || 0,
      title: lesson.title,
      badge: badge,
    };
  });
  return (
    <div>
      <div className="flex flex-1 flex-col md:flex-row md:justify-evenly gap-4 p-4 pt-0">
        <SubjectCard
          cardTitle="أهداف الموضوع"
          cardList={{
            text: targets,
            type: "target",
          }}
        />

        <SubjectCard
          cardTitle="قائمة الدروس"
          cardList={{
            text: lessonsTitles,
            type: "lesson",
          }}
        />
      </div>

      <div className="flex items-center justify-around">
        <div className="w-1/2">
        {isSubjectEnd ? (
          <AppLink
            href={`${RoutesName.subject}/${subject.id}/lessons/${lessons[0].id}`}
            className="mb-4 text-center bg-secondary hover:bg-secondary-hover mx-auto"
          >
            <span className="text-secondary-foreground font-bold">
              مشاهدة الدروس مرة أخري
            </span>
          </AppLink>
        ) : currentLesson ? (
          <AppLink
            href={`${RoutesName.subject}/${subject.id}/lessons/${currentLesson.lessonID}`}
            className="mb-4 text-center bg-secondary hover:bg-secondary-hover mx-auto"
          >
            <span className="text-secondary-foreground font-bold">
              استكمل الدراسة
            </span>
          </AppLink>
        ) : (
          <AppLink
            href={`${RoutesName.subject}/${subject.id}/lessons/${lessons[0].id}`}
            className="mb-4 text-center bg-secondary hover:bg-secondary-hover mx-auto"
          >
            <span className="text-secondary-foreground font-bold">
              إبدء الأن
            </span>
          </AppLink>
        )}
        </div>
        {(isSubjectBtnCanAppear() && !isSubjectEnd && userData.learning_passed && userData.learning_passed <= countSubjects) && (
          <CompleteSubjectBtn userId={userId} newLevel={userData.learning_passed+1} />
        )}
      </div>
    </div>
  );
}

function SubjectCard({ cardTitle, cardList }: SubjectCardProps) {
  return (
    <Card className="mb-8 p-0 border-0 gap-0">
      <CardHeader className="bg-primary rounded-t-lg text-white py-3">
        <CardTitle className="tracking-normal leading-[1.5]">
          {cardTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="border-x-2 border-b-2 border-secondary bg-background-light rounded-b-lg py-6 h-full">
        <ul className="space-y-2">
          {cardList.text.map((cardItem, index) => {
            return (
              <li key={index} className="flex items-start">
                {getCardItemsIcon(cardList.type)}
                <span className="me-2">
                  {typeof cardItem == "string" ? cardItem : cardItem.title}
                </span>
                {typeof cardItem != "string" && cardItem.badge}
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}

function getCardItemsIcon(type: CardItemsType) {
  switch (type) {
    case "lesson":
      return <BookOpen className="me-2 h-5 w-5 text-primary" />;
    case "target":
      return (
        <CheckCircle className="me-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
      );
  }
}
