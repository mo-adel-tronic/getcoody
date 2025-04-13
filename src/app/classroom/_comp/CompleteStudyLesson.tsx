'use client'

import { addUserTracker } from "@/core/lib/actions"
import { RoutesName } from "@/core/utils/constants"
import AppBtn from "@/ui/atoms/controls/AppBtn"
import { redirect } from "next/navigation"
import { toast } from "sonner"

interface Props {
    userId: number,
    lessonId: number,
    subjectId: number,
}
export default function CompleteStudyLessonBtn({userId, lessonId, subjectId}: Props) {
  return (
    <AppBtn onClick={async () => {
        const data = await addUserTracker(userId, lessonId)
        if (data.error) {
            toast.error('حدث خطأ أثناء إتمام العملية')
        } else {
            toast.success('تم إتمام العملية بنجاح')
            redirect(`${RoutesName.subject}/${subjectId}/lessons/${lessonId}`)
        }
    }} className="!w-fit bg-secondary-hover !text-secondary-foreground hover:bg-secondary cursor-pointer">لقد أتممت دراسة محتوي الدرس !!</AppBtn>
  )
}
