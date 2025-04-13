import { getsubjectLessons, getUserTracking } from "@/api/lessons";
import LessonLayout from "@/app/classroom/_comp/LessonLayout";
import { layoutHandler } from "@/core/lib/LayoutHandler";
import { LessonEntity, UserTracker } from "@/types";
import { notFound } from "next/navigation";

export default async function LessonPage({params} :  {
    params: Promise<{ lessonId: string, id: string }>
  }) {
  const [layout, userData] = await layoutHandler();
  const { id, lessonId } = await params;
  const lessons : LessonEntity[] = (await getsubjectLessons(parseInt(id))).data
  if(!lessons) {
    notFound()
  }
  let lesson: LessonEntity | null = null;
  lessons.forEach((less) => {
    if (less.id && less.id.toString() === lessonId) {
      lesson = less;
    }
  })
  if(!lesson) {
    notFound()
  }
  const userTrackingData : UserTracker = (await getUserTracking(parseInt(lessonId), userData.id || 0)).data[0]

  return (
    <LessonLayout 
    layout={layout}
    subjectId={parseInt(id)}
    currentLessonId={parseInt(lessonId)}
    lessons={lessons}
    lesson={lesson}
    userTracking={userTrackingData}
    userData={userData}
    />
  );
}
