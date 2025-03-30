"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import AppBtn from "@/ui/atoms/controls/AppBtn";
import H2 from "@/ui/atoms/text/H2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import React, { useState } from "react";
interface LessonData {
  id: string;
  title: string;
  videoUrl?: string;
  content: string;
  question?: {
    text: string;
    options: string[];
    feedback: string[];
  };
  correctIndex?: number;
  assignment?: {
    title: string;
    description: string;
    driveLink: string;
  };
  activity?: {
    instructions: string;
    initialCode: string;
    title: string
  };
}

const MyTabTrigger = ({ txt, val }: { txt: string; val: string }) => (
  <TabsTrigger
    className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground data-[state=active]:rounded-lg p-2 me-3 text-white data-[state=active]:font-bold"
    value={val}
  >
    {txt}
  </TabsTrigger>
);

export default function LessonTemp({ lessonData }: { lessonData: LessonData }) {
  const [answer, setAnswer] = useState(-1);
  const [feedback, setFeedback] = useState("");
  const [smartFeedback, setSmartFeedback] = useState("");
  const [activityCode, setActivityCode] = useState(lessonData.activity?.initialCode)
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <H2 text={lessonData.title} />

          <Tabs dir="rtl" defaultValue="lesson" className="mb-6">
            <TabsList className="bg-secondary-foreground w-fit py-3 px-4 rounded-lg mb-6">
              <MyTabTrigger txt="محتوي الدرس" val="lesson" />
              <MyTabTrigger txt="التكليف" val="assignment" />
              <MyTabTrigger txt="النشاط" val="activity" />
            </TabsList>

            <TabsContent value="lesson">
              {lessonData.videoUrl && (
                <div className="aspect-video mb-6">
                  <iframe
                    src={lessonData.videoUrl}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>محتوي الدرس</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    dangerouslySetInnerHTML={{ __html: lessonData.content }}
                    className="prose max-w-none"
                  />
                </CardContent>
              </Card>

              {lessonData.question && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>اختبر نفسك</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{lessonData.question.text}</p>
                    <div className="space-y-2">
                      {lessonData.question.options.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className={`w-full text-xl justify-start ${
                            answer == lessonData.correctIndex &&
                            answer == index &&
                            "bg-green-600 text-white"
                          } ${
                            answer >= 0 &&
                            answer != lessonData.correctIndex &&
                            answer == index &&
                            "bg-red-500 text-white"
                          }`}
                          onClick={() => {
                            setAnswer(index);
                            setFeedback(
                              lessonData.question?.feedback[index] ?? ""
                            );
                          }}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                    {feedback.length > 0 && (
                      <div
                        className={`p-2 mt-3 ${
                          answer != lessonData.correctIndex
                            ? "bg-red-500"
                            : "bg-green-500"
                        } text-xl text-white rounded-lg`}
                      >
                        {feedback}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            <TabsContent value="assignment">
              {lessonData.assignment ? (
                <Card>
                  <CardHeader>
                    <CardTitle>{lessonData.assignment.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{lessonData.assignment.description}</p>
                  </CardContent>
                </Card>
              ) : (
                <h5 className="text-primary font-bold text-2xl">
                  لا يوجد تكليفات لهذا الدرس
                </h5>
              )}
            </TabsContent>

            <TabsContent value="activity">
              {lessonData.activity ? (
                <Card>
                <CardHeader>
                  <CardTitle>{lessonData.activity.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{lessonData.activity.instructions}</p>
                  <Textarea
                    value={activityCode}
                    onChange={(e) => setActivityCode(e.target.value)}
                    className="font-mono"
                    rows={10}
                  />
                  {/* handleCodeSubmit */}
                  <Button className="mt-4">
                    Submit Code
                  </Button>
                  {smartFeedback && (
                    <Card className="mt-4">
                      <CardHeader>
                        <CardTitle>المساعد كوودي</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <pre className="whitespace-pre-wrap">{smartFeedback}</pre>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
              ): <h5 className="text-primary font-bold text-2xl">
              لا يوجد نشاط لهذا الدرس
            </h5>}
            </TabsContent>
          </Tabs>
        </div>
        <Card className="sticky top-8 bg-background-light p-4 border-x-2 border-secondary rounded-lg shadow-lg">
          <CardHeader>
            <CardTitle>قائمة الدروس</CardTitle>
          </CardHeader>
          <CardContent>
            <AppBtn className="w-full mb-4 bg-secondary hover:bg-secondary-hover">
              <span className="text-secondary-foreground font-bold">
                إبدء الأن
              </span>
            </AppBtn>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
