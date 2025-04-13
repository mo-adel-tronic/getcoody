import { Activity, CheckCheck, LucideExternalLink, User2Icon } from "lucide-react";
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
          <H2 text="جودة المحتوى التعليمي" />
          <AppSmallCard
            icon={<User2Icon size={'40px'} className="text-secondary-hover" />}
            title="الدروس"
            body="يتم تقديم أساليب متنوعة لعرض المحتوى المطلوب دراسته حيث تشمل الفيديو المسجلة من قبل المعلم والتي يظهر فيها داخل الفيديو لجعل التجربة أكثر فاعلية بالإضافة إلى النصوص والصور والرسوم الجرافيكية المساعدة"
          />
          <AppSmallCard
            icon={<CheckCheck size={'40px'} className="text-secondary-hover" />}
            title="الأنشطة التعليمية"
            body="يمكنك كتابة الأكواد البرمجية داخل الدرس في بيئة تحاكي محرر الأكواد الحقيقي ومدعومة بالوكيل الذكي الذي يقدم مستوى مميز من الدعم الذي يساعدك على إنهاء النشاط بنجاح"
          />
          <AppSmallCard
            icon={<Activity size={'40px'} className="text-secondary-hover" />}
            title="التكليفات"
            body="يتم إرسال التكليفات في المجلد الخاص بك وذلك لمراجعتها من قبل المعلم والتأكد من أن ما تم دراسته حقق الهدف التعليمي المرغوب"
          />
          <AppSmallCard
            icon={<LucideExternalLink size={'40px'} className="text-secondary-hover" />}
            title="المصادر الخارجية"
            body="حيث يتم دعم محتوى الدرس بمصادر خارجية أخرى للتعلم تتميز بالتنوع ما بين فيديو أو مقالات عملية"
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
