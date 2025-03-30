import { getsubjectLessons } from "@/api/lessons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageSrc } from "@/core/utils/constants";
import { SubjectEntity, LessonEntity } from "@/types";
import AppLink from "@/ui/atoms/controls/AppLink";
import AppImage from "@/ui/atoms/media/AppImage";
import { BookOpen, CheckCircle } from "lucide-react";
import React from "react";

type Props = {
  subject: SubjectEntity;
};
type CardItemsType = "lesson" | "target";
interface SubjectCardProps {
  cardTitle: string;
  cardList: {
    text: string[];
    type: CardItemsType;
  };
}

export default async function SubjectBody({ subject }: Props) {
  const targets: string[] = JSON.parse(subject.targets);
  const lessons = (await getsubjectLessons(subject.id)).data
  const lessonsTitles = lessons.map((lesson : LessonEntity) => lesson.title)
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
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

          <Card className="sticky top-8 bg-background-light p-4 border-x-2 border-secondary rounded-lg shadow-lg">
            <CardHeader>
            <AppImage
                src={ImageSrc.courseBg1}
                alt={subject.title}
                width={1200}
                height={400}
                className="rounded-lg object-cover shadow-lg w-full h-[200px]"
              />
            </CardHeader>
            <CardContent>
              <AppLink
                href={"/classroom/subjects/1/lessons/1"}
                className="w-full mb-4 text-center bg-secondary hover:bg-secondary-hover"
              >
                <span className="text-secondary-foreground font-bold">
                  إبدء الأن
                </span>
              </AppLink>
            </CardContent>
          </Card>
        </div>
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
      <CardContent className="border-x-2 border-b-2 border-secondary bg-background-light rounded-b-lg py-6">
        <ul className="space-y-2">
          {cardList.text.map((cardItem, index) => (
            <li key={index} className="flex items-start">
              {getCardItemsIcon(cardList.type)}
              <span>{cardItem}</span>
            </li>
          ))}
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
