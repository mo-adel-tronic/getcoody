'use client'
import UserType from "@/features/user/domain/UserEntity"
import { addUser } from "@/features/user/UserDi"
import AppForm from "@/ui/atoms/blocks/AppForm"

export default function ProfileDataForm({ user }: { user: UserType }) {
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
            onSubmit={(data) => {
              user.display_name = data.display_name
              user.fullname = data.fullname
              user.phone = data.phone
              addUser.call(user)
            }}
            inputVals={user ? {
              fullname: user.fullname,
              display_name: user.display_name,
              phone: user.phone
            } : null}
          />
  )
}
