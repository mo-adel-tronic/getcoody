'use client'

import { RoutesName } from "@/core/utils/constants"
import useRevalidate from "@/hooks/useRevalidate"
import { UserEntity } from "@/types"
import AppForm from "@/ui/atoms/blocks/AppForm"
import { redirect } from 'next/navigation'
import { toast } from "sonner"

export default function ProfileDataForm({ user, api_k }: { user: UserEntity, api_k: string }) {
  const revalidate = useRevalidate(user.email, api_k)
  function submitData (type: 'POST' | 'PUT') {
    fetch('/api/users', {
      method: type,
      headers: {
        'Content-Type': 'application/json',
        api_key: '3yJH8g5k9L2mN1pQ4rT6vW8xZ0aB7cD5eF3hI2jK4lM6nO1pQ2rT5vW8xZ0aB7cD'
      },
      body: JSON.stringify(user)
    }).then(res => res.json()).then(async (data) => {
      if (data.error) {
        console.log(data)
      } else {
        await revalidate()
        if(type == 'POST') {
          redirect(RoutesName.classroom)
        } else {
          toast.success("تم تعديل البيانات بنجاح")
        }
      }
    })
  }
  return (
    <AppForm
            fields={[
              {
                name: "fullname",
                label: "الاسم بالكامل",
                placeholder: "ادخل اسمك",
                validation: {
                  required: "الاسم مطلوب",
                }
              },
              {
                name: "display_name",
                label: "الاسم المرئي للمستخدمين",
                placeholder: "ادخل الاسم الذي سيظهر أمام زملاءك",
                validation: {
                  required: "الاسم المرئي مطلوب",
                }
              },
              {
                name: "phone",
                label: "رقم الهاتف",
                type: "text",
                placeholder: "ادخل رقم الهاتف",
                validation: {
                  required: "رقم الهاتف مطلوب",
                  minLength: {
                    value: 11,
                    message: "رقم الهاتف يجب ان يكون 11 رقم"
                  },
                }
              }
            ]}
            onSubmit={(data: UserEntity) => {
              user.display_name = data.display_name
              user.fullname = data.fullname
              user.phone = data.phone
              if(user.id) {
                submitData('PUT')
              } else {
                submitData('POST')
              }
            }}
            inputVals={user ? {
              fullname: user.fullname,
              display_name: user.display_name,
              phone: user.phone
            } : null}
          />
  )
}
