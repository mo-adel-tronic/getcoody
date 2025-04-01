import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { lessonNavHelper } from "@/core/lib/MainNavHelper";
import { LessonEntity, QuestionEntity } from "@/types";
import ClassroomAppSidebar from "@/ui/components/ClassroomAppSidebar";
import ProfileHeader from "./ProfileHeader";
import { PagesName, RoutesName } from "@/core/utils/constants";
import AppSection from "@/ui/atoms/blocks/AppSection";
import H2 from "@/ui/atoms/text/H2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLessonQuestions } from "@/api/lessons";
import QuestionsBody from "./QuestionsBody";
import AppLink from "@/ui/atoms/controls/AppLink";

type Props = {
  lessons: LessonEntity[];
  currentLessonId: number;
  subjectId: number;
  lesson: LessonEntity;
};

const MyTabTrigger = ({ txt, val }: { txt: string; val: string }) => (
  <TabsTrigger
    className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground data-[state=active]:rounded-lg p-2 me-3 text-white data-[state=active]:font-bold"
    value={val}
  >
    {txt}
  </TabsTrigger>
);

export default async function LessonTemplate({
  lessons,
  currentLessonId,
  subjectId,
  lesson,
}: Props) {
  const questions: QuestionEntity[] = (
    await getLessonQuestions(currentLessonId)
  ).data;
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "20em",
        } as React.CSSProperties
      }
    >
      <ClassroomAppSidebar
        mainNav={lessonNavHelper(lessons, currentLessonId, subjectId)}
      />
      <SidebarInset>
        <ProfileHeader
          items={[
            {
              text: PagesName.home,
              href: RoutesName.home,
            },
            {
              text: PagesName.subject,
              href: RoutesName.subject + "/" + subjectId,
            },
            {
              text: PagesName.lesson,
              href: "#",
            },
          ]}
        />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <AppSection withBG={true}>
            <div className="w-2/3 mx-auto text-center">
              <H2 text={lesson.title} />
            </div>
            <div className="px-6">
              <Tabs dir="rtl" defaultValue="lesson" className="mb-6">
                <TabsList className="bg-secondary-foreground w-fit py-2 px-4 rounded-lg mb-6">
                  <MyTabTrigger txt="محتوي الدرس" val="lesson" />
                  <MyTabTrigger txt="التكليف" val="assignment" />
                  <MyTabTrigger txt="النشاط" val="activity" />
                  <MyTabTrigger txt="مصادر أخري" val="resources" />
                </TabsList>

                <TabsContent value="lesson">
                  {lesson.video && (
                    <div className="aspect-video mb-6">
                      <iframe
                        src={lesson.video}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  )}
                  <Card>
                    <CardContent>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: lesson.content || "",
                        }}
                        className="prose max-w-none"
                      />
                    </CardContent>
                  </Card>
                  {questions && questions.length && (
                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>اختبر نفسك</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {questions.map((q) => (
                          <div key={q.id} className="mb-6">
                            <p className="mb-4 bg-primary text-white px-3 py-2 font-black rounded-lg">
                              {q.question}
                            </p>
                            <QuestionsBody question={q} />
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="assignment">
                  {lesson.task_details ? (
                    <Card>
                      <CardHeader>
                        <CardTitle>{lesson.task_details}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <AppLink href={lesson.task_link|| '#'}>رابط تسليم التكليف</AppLink>
                      </CardContent>
                    </Card>
                  ) : (
                    <h5 className="text-primary font-bold text-2xl text-center">
                      لا يوجد تكليفات لهذا الدرس
                    </h5>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </AppSection>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
