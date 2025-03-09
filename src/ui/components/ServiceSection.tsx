import { Activity, CheckCheck, User2Icon } from "lucide-react";
import AppContainer from "../atoms/blocks/AppContainer";
import AppSection from "../atoms/blocks/AppSection";
import AppSmallCard from "../atoms/blocks/AppSmallCard";
import H2 from "../atoms/text/H2";
import AppImage from "../atoms/media/AppImage";
import { ImageSrc } from "@/core/utils/constants";

export default function ServiceSection() {
  return (
    <AppSection withBG={true}>
      <AppContainer reverseCol={false} className="items-center">
        <div className="grid gap-y-8">
          <H2 text="الخدمات" />
          <AppSmallCard
            icon={<User2Icon size={'40px'} className="text-secondary-hover" />}
            title="الحسابات الشخصية"
            body="لديك العديد من المزايا العديدة بامتلاكك حساب لدينا حيث توجد متابعة ونتائج رقمية تساعدك علي اتخاذ القرار التعليمي المناسب وتتعرف علي ما تم انجازه"
          />
          <AppSmallCard
            icon={<CheckCheck size={'40px'} className="text-secondary-hover" />}
            title="التغذية الراجعة الذكية"
            body="تتميز المنصة لدينا بوجود تغذية راجعة واستجابات قائمة علي الذكاء الاصطناعي حيث يتم توجيهك في كل نشاط تقوم به بشرح واف من خلال الوكيل الذكي"
          />
          <AppSmallCard
            icon={<Activity size={'40px'} className="text-secondary-hover" />}
            title="التفاعلية"
            body="تتميز المنصة بأشكال مختلفة من التفاعل فهناك تفاعل اجتماعي من خلال المنشورات بين الأصدقاء في نفس الصف والتفاعل مع المنصة والمحتوي المقدم"
          />
        </div>

        <div>
          <AppImage
            className="animate-wiggle animate-infinite animate-duration-[5000ms] animate-ease-linear animate-alternate mx-auto border rounded-full border-secondary p-3 mt-6 shadow-xl drop-shadow-xl shadow-slate-300 w-[150] md:w-[400]"
            src={ImageSrc.svgService}
            alt="service"
            width={100}
            height={300}
          />
        </div>
      </AppContainer>
    </AppSection>
  );
}
