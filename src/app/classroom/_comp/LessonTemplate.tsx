import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { lessonNavHelper } from "@/core/lib/MainNavHelper";
import { LessonContentItem, LessonEntity, QuestionEntity, UserEntity, UserTracker } from "@/types";
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
import ActivityBody from "./ActivityBody";
import H3 from "@/ui/atoms/text/H3";
import CompleteStudyLessonBtn from "./CompleteStudyLesson";
import { Badge } from "@/components/ui/badge";
import { CircleArrowLeftIcon } from "lucide-react";
import AppText from "@/ui/atoms/text/AppText";
import AppUl from "@/ui/atoms/lists/AppUl";
import AppImage from "@/ui/atoms/media/AppImage";

type Props = {
  lessons: LessonEntity[];
  currentLessonId: number;
  subjectId: number;
  lesson: LessonEntity;
  userTracking: UserTracker
  userData: UserEntity
};

const MyTabTrigger = ({ txt, val }: { txt: string; val: string }) => (
  <TabsTrigger
    className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground data-[state=active]:rounded-lg p-2 me-3 text-white data-[state=active]:font-bold"
    value={val}
  >
    {txt}
  </TabsTrigger>
);

const getLessonContent = (content : string) : LessonContentItem[] => {
  return JSON.parse(content)
}

export default async function LessonTemplate({
  lessons,
  currentLessonId,
  subjectId,
  lesson,
  userTracking,
  userData,
}: Props) {
  const questions: QuestionEntity[] = (
    await getLessonQuestions(currentLessonId)
  ).data;
  const chatKey : string = process.env.GEMINI_API_KEY as string
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
            {
              !userTracking && <div className="w-2/3 mx-auto text-center mb-3 border-x-4 bg-gray-300 py-3 border-secondary-hover">
              <AppText text="قم بالضغط على الزر أسفل المحتوى للتأكيد على إنهاء دراستك لهذا المحتوى" />
            </div>
            }
            <div className="px-6">
              <Tabs dir="rtl" defaultValue="lesson" className="mb-6">
                <TabsList className="bg-secondary-foreground w-fit py-2 px-4 rounded-lg mb-6">
                  <MyTabTrigger txt="محتوي الدرس" val="lesson" />
                  <MyTabTrigger txt="النشاط" val="activity" />
                  <MyTabTrigger txt="التكليف" val="assignment" />
                  {/* <MyTabTrigger txt="مصادر أخري" val="resources" /> */}
                </TabsList>

                {/* ****************************************
                Content Section 
                *******************************************/}
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
                  {
                    lesson.content && <Card>
                    <CardContent>
                      {
                        getLessonContent(lesson.content || '[]').map((item, i) => <div key={i}>
                          {
                            item.type == "h2" && <h2 
                            className="font-bold text-primary mb-4">
                              {item.content}
                              </h2>
                          }
                          {
                            item.type == "p" && <p 
                            className="font-bold text-foreground text-[0.8em] leading-7 mb-4">
                              {item.content}
                              </p>
                          }
                          {
                            item.type == "h3" && <h3 
                            className="font-bold text-primary mb-4 text-[0.9em]">
                              - {item.content}
                              </h3>
                          }
                          {
                            item.type == "h4" && <h4 
                            className="font-bold text-foreground-title mb-4 text-[0.9em]">
                              {item.content}
                              </h4>
                          }
                          {
                            (item.type == "ul" && Array.isArray(item.content)) && <ul>
                              {
                                item.content.map((t, index) => <li 
                                key={index}
                                className="font-bold text-foreground text-[0.8em] leading-7 mb-4"
                                >
                                  <CircleArrowLeftIcon className="text-secondary-hover inline-block me-3" />
                                  {t}
                                </li>)
                              }
                            </ul>
                          }
                          {
                            item.type == "img" && typeof item.content == 'string' && <AppImage 
                            src={item.content} 
                            alt="lesson image" 
                            width={100}
                            height={200}
                            className="w-1/3 mx-auto"
                            />
                          }
                        </div>)
                      }
                    </CardContent>
                  </Card> 
                  }
                  {(Array.isArray(questions) && questions.length > 0) && (
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
                  {
                    !userTracking && <div className="my-4 flex justify-center">
                      <CompleteStudyLessonBtn userId={userData.id || 0} lessonId={lesson.id || 0} subjectId={subjectId} />
                    </div>
                  }
                </TabsContent>

                  {/* ****************************************
                Assignment Section 
                *******************************************/}
                {
                  userTracking ? (<TabsContent value="assignment">
                    {lesson.task_details ? (
                      <Card className="relative">
                        <div className="absolute left-4 top-[50%] -translate-y-1/2">{
                          userTracking.task == 2 ? <Badge variant={'destructive'}>راجع التعديلات</Badge> :
                          userTracking.task == 1 ? <Badge variant={'default'} className="bg-green-600 text-white">لا يوجد تعديلات</Badge> : <></>
                        }</div>
                        <CardHeader>
                          <CardTitle><H3 text={lesson.task_details} /></CardTitle>
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
                  </TabsContent>) : (
                    <TabsContent value="assignment">
                      <h5 className="text-primary font-bold text-2xl text-center">
                        يجب الإنتهاء من دراسة المحتوي أولاً
                      </h5>
                    </TabsContent>
                  )
                }

                {/* ****************************************
                activity Section 
                *******************************************/}
                {
                  userTracking ? (<TabsContent value="activity">
                    {
                      lesson.activity_details ? 
                      (<>
                      <div className="my-6"><H3 text={lesson.activity_details} /></div>
                      <div className="h-[100vh] bg-[#0f0a19] text-gray-400 p-4 flex flex-col" dir="ltr">
                        <ActivityBody 
                        chatKey={chatKey} 
                        lesson={lesson} 
                        userActivity={JSON.parse(userTracking.activity)} 
                        userData={userData}
                        attempts={userTracking.activity_attempts}
                        />
                      </div>
                      </>) : 
                      (
                        <h5 className="text-primary font-bold text-2xl text-center">
                          لا يوجد نشاط لهذا الدرس
                        </h5>
                      )
                    }
                  </TabsContent>) : (
                    <TabsContent value="activity">
                      <h5 className="text-primary font-bold text-2xl text-center">
                        يجب الإنتهاء من دراسة المحتوي أولاً
                      </h5>
                    </TabsContent>
                  )
                }

                {/* ****************************************
                Resources Section 
                *******************************************/}
                {/* {
                  JSON.parse(lesson.resources || '[]').length ? <TabsContent value="resources">
                  <AppUl items={JSON.parse(lesson.resources!).map((item:string) => {
                    return {title: item}
                  })} />
                </TabsContent> : <TabsContent value="resources">
                      <h5 className="text-primary font-bold text-2xl text-center">
                        لا يوجد مصادر أخرى لهذا الدرس
                      </h5>
                    </TabsContent>
                } */}
              </Tabs>
            </div>
          </AppSection>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}


/*
activity note: student should do: create /lib/main.dart & create /lib/home.dart & create a MyApp statless widget & import Home widget as a home page & Home preview any welcome text

file tree: [{"name":"lib","type":"folder","children":[{"name":"main.dart","type":"file"}]}]

file start : {"/lib/main.dart":"void main () {\r\n   \r\n}","/lib/about.dart":"// write code here in about"}
*/