"use client";
import { useEffect, useState } from "react";
import EditorBody from "./EditorBody";
import FileExplorer from "./FileExplorer";
import { AgentResponse, FileTreeItem, LessonEntity, UserEntity } from "@/types";
import AppBtn from "@/ui/atoms/controls/AppBtn";
import AppLottie from "@/ui/atoms/media/AppLottie";
import { ImageSrc } from "@/core/utils/constants";
import AppImage from "@/ui/atoms/media/AppImage";
import { myStartChat } from "@/core/lib/chatAction";
import AppUl from "@/ui/atoms/lists/AppUl";
import { updateUserActivity } from "@/core/lib/actions";
import { toast } from "sonner";
export default function ActivityBody({
  chatKey,
  lesson,
  userActivity,
  attempts,
  userData,
}: {
  chatKey: string;
  lesson: LessonEntity;
  userActivity: any;
  attempts: number;
  userData: UserEntity;
}) {
  const [activeFile, setActiveFile] = useState<string>("/lib/main.dart");
  const [fileContent, setFileContent] = useState({});
  const [chatRunning, setChatRunning] = useState(false);
  const [attempState, setAttempState] = useState(0);
  const [chatRes, setChatRes] = useState<AgentResponse[] | null>(null);
  const chatPayload = {
    task: lesson.activity_chat_notes || "",
    studentCode: fileContent,
  };
  const fileTree: FileTreeItem[] = lesson.activity_file_tree
    ? JSON.parse(lesson.activity_file_tree)
    : [];

  useEffect(() => {
    if (
      typeof userActivity == "object" &&
      userActivity != null &&
      Object.keys(userActivity).length > 0
    ) {
      setFileContent(userActivity);
    } else {
      setFileContent(
        lesson.files_starter
          ? JSON.parse(lesson.files_starter)
          : { "/lib/main.dart": "// start code here" }
      );
    }
  }, []);
  useEffect(() => {
    setAttempState(attempts);
  }, []);
  return (
    <>
      <div className="w-full flex flex-wrap flex-1/2 grow-0">
        <div
          className="w-full mb-3 flex justify-between items-center"
          dir="rtl"
        >
          <div>
            مسار الملف الحالي: <span dir="ltr">{activeFile}</span>
          </div>
          <div>عدد المحاولات: {attempState}</div>
          <div>
            <AppBtn
              onClick={async () => {
                setChatRunning(true);
                const data = await myStartChat(chatKey, chatPayload);
                setChatRes(data.issues);
                const attemp = attempState + 1;
                const res = await updateUserActivity(
                  userData.id || 0,
                  lesson.id || 0,
                  JSON.stringify(fileContent),
                  attemp
                );
                if (res.error) {
                  toast.error("تعذر إرسال الحل الخاص بك");
                } else {
                  toast.success("تم إرسال الحل بنجاح");
                }
                setAttempState(attemp);
                setChatRunning(false);
              }}
            >
              إرسال الحل
            </AppBtn>
          </div>
        </div>
        <div className="bg-gray-900 text-white p-2 w-1/5">
          <FileExplorer
            activeFile={activeFile}
            setActiveFile={setActiveFile}
            fileTree={fileTree}
          />
        </div>
        <div className="w-4/5">
          {userData.user_group == 2 ? (
            <EditorBody
              fileContent={fileContent}
              setFileContent={setFileContent}
              activeFile={activeFile}
              onEnterKey={async () => {
                setChatRunning(true);
                const data = await myStartChat(chatKey, chatPayload);
                setChatRes(data.issues);
                setChatRunning(false);
              }}
            />
          ) : (
            <EditorBody
              fileContent={fileContent}
              setFileContent={setFileContent}
              activeFile={activeFile}
            />
          )}
        </div>
      </div>
      <div className="w-full bg-background flex-1/2 flex justify-around items-center overflow-auto h-[50vh]">
        <div className="w-2/6 self-start">
          {chatRunning ? (
            <AppLottie src={ImageSrc.lottieAgent} width="w-[200px]" />
          ) : (
            <AppImage
              src={ImageSrc.agent}
              alt="agent"
              width={200}
              height={200}
              className="mx-auto opacity-25"
            />
          )}
        </div>
        <div className="grow ps-4 py-4 h-full" dir="rtl">
          {chatRes != null &&
            chatRes.map((res, resIndex) => (
              <div key={resIndex}>
                <div
                  className={`text-center w-1/3 rounded-lg font-bold text-lg my-3 py-2 text-white ${
                    res.level == "خطأ"
                      ? "bg-red-500"
                      : res.level == "تحذير"
                      ? "bg-secondary-hover"
                      : res.level == "أحسنت"
                      ? "bg-green-600" : "bg-primary"
                  }`}
                >
                  {res.level}
                </div>
                <AppUl
                  items={[
                    {
                      title: "التغذية الراجعة",
                      content: res.feedback
                    },
                    {
                      title: "المشكلة",
                      content: res.issue,
                    },
                    {
                      title: "الملف",
                      content: res.page,
                    },
                    {
                      title: "رقم السطر",
                      content: res.line?.toString(),
                    },
                    {
                      title: "المقترح",
                      content: res.suggestion,
                    },
                  ]}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
