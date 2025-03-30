import { SubjectEntity, UserEntity } from '@/types'
import AppColoredCard from '@/ui/atoms/blocks/AppColoredCard'
import AppSection from '@/ui/atoms/blocks/AppSection'

interface Props {
    user: UserEntity
    subjects: SubjectEntity[]
}

export default function ClassroomBody({
    user,
    subjects
}: Props) {
    console.log(typeof JSON.parse(user.results!))
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <AppSection>
          <div className="md:w-2/3 w-11/12 mx-auto text-center bg-primary text-white my-6 py-3 font-bold rounded-lg">
          <h2>مسارات التعلم</h2>
          </div>
          <div className="flex flex-col md:flex-row text-center justify-around items-center gap-y-3">
            {/* card */}
            <AppColoredCard title="إجمالي الموضوعات" body={subjects.length.toString()} />
            <AppColoredCard bgClass="bg-secondary" textColorClass="text-secondary-foreground" title="الموضوعات المتبقية" body={(subjects.length + 1 - user.learning_passed!).toString()} />
            <AppColoredCard bgClass="bg-green-600" title="الموضوعات المنتهية" body={(user.learning_passed! - 1).toString()} />
          </div>
        </AppSection>


        <AppSection>
        <div className="md:w-2/3 w-11/12 mx-auto text-center bg-primary text-white my-6 py-3 font-bold rounded-lg">
          <h2>التكليفات</h2>
          </div>
          <div className="flex flex-col md:flex-row text-center justify-around items-center gap-y-6">
            {/* card */}
            <AppColoredCard bgClass="bg-green-600" title="التكليفات المقبولة" body="0" />
            <AppColoredCard bgClass="bg-red-600" title="التكليفات المرفوضة" body="0" />
          </div>
        </AppSection>


        <AppSection>
        <div className="md:w-2/3 w-11/12 mx-auto text-center bg-primary text-white my-6 py-3 font-bold rounded-lg">
          <h2>المشاركات الإجتماعية</h2>
          </div>
          <div className="flex flex-col md:flex-row text-center justify-around items-center gap-y-6">
            {/* card */}
            <AppColoredCard title="عدد المنشورات" body="0" />
            <AppColoredCard bgClass="bg-secondary" textColorClass="text-secondary-foreground" title="المشاركة مع للأقران" body="0%" />
            <AppColoredCard bgClass="bg-green-600" title="الإعجاب بمنشوراتك" body="0" />
            <AppColoredCard bgClass="bg-red-600" title="التعليق علي منشوراتك" body="0" />
          </div>
        </AppSection>
      </div>
  )
}