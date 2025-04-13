'use client'

import { updateUserLevel } from "@/core/lib/actions"
import { RoutesName } from "@/core/utils/constants"
import AppBtn from "@/ui/atoms/controls/AppBtn"
import { redirect } from "next/navigation"
import { toast } from "sonner"

interface Props {
    userId: number,
    newLevel: number
}
export default function CompleteSubjectBtn({userId, newLevel}: Props) {
  return (
    <AppBtn onClick={async () => {
        const data = await updateUserLevel(userId, newLevel)
        if (data.error) {
            toast.error('حدث خطأ أثناء إتمام العملية')
        } else {
            toast.success('تم إتمام العملية بنجاح')
            redirect(RoutesName.classroom)
        }
    }} className="!w-fit">لقد أنهيت دراسة الموضوع بنجاح !!</AppBtn>
  )
}
