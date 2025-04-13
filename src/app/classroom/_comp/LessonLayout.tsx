import AppLoader from "@/ui/atoms/media/AppLoader";
import { LayoutType, LessonEntity, UserEntity, UserTracker } from "@/types";
import { notFound } from "next/navigation";
import LessonTemplate from "./LessonTemplate";

interface Props {
  layout: LayoutType
  subjectId: number
  currentLessonId: number
  lessons: LessonEntity[]
  lesson: LessonEntity
  userTracking: UserTracker,
  userData: UserEntity
}
export default async function LessonLayout({layout, subjectId, currentLessonId, lessons, lesson, userTracking, userData}: Props) {

    if (layout == 'loading') {
        return (
            <div className="min-h-screen flex justify-center items-center text-lg">
              <AppLoader />
            </div>
          );
    } else if ('main,post,result'.includes(layout)) {
        return <LessonTemplate 
        lessons={lessons}
        subjectId={subjectId}
        currentLessonId={currentLessonId}
        lesson={lesson}
        userTracking={userTracking}
        userData={userData}
        />
    } else {
        notFound()
    }
}