import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ImageSrc, RoutesName } from "@/core/utils/constants";
import AppSection from "@/ui/atoms/blocks/AppSection";
import AppUl from "@/ui/atoms/lists/AppUl";
import AppImage from "@/ui/atoms/media/AppImage";
import AppText from "@/ui/atoms/text/AppText";
import H1 from "@/ui/atoms/text/H1";
import H2 from "@/ui/atoms/text/H2";

export default function Instructions() {
  return (
    <main>
      <header className='container bg-secondary-foreground py-3'>
        <AppImage
        src={ImageSrc.blogPost1}
        alt='instructions'
        width={300}
        height={200}
        className='md:w-2/3 w-full mx-auto max-h-[60svh] rounded-lg p-6 border-x-2 border-secondary'
        />
      </header>
      <div className='h-14 bg-background-light container flex items-center'>
          <Breadcrumb>
          <BreadcrumbList>
          <BreadcrumbItem>
          <BreadcrumbLink href={RoutesName.home}>
          <AppText text='الرئيسية' />
                    </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
          <BreadcrumbLink href='/instructions'>
          <AppText text='التعليمات' />
                    </BreadcrumbLink>
          </BreadcrumbItem>
          </BreadcrumbList>
          </Breadcrumb>
        </div>
      <AppSection>
        <div className='container'>
          <div className='text-center'>
          <H1 spanFirst={false} spanText='Get-Coody' mainText='تعليمات استخدام بيئة التعلم الإلكترونية' />
          </div>
          <AppText text='مرحبًا بك في بيئة Get Coody! تهدف منصتنا إلى توفير تجربة تعليمية متكاملة من خلال محتوى تفاعلي يساعدك على تحقيق أهدافك الأكاديمية بكفاءة. يرجى قراءة التعليمات التالية بعناية لضمان استخدام سلس وفعال للنظام.' />
          <H2 text='تسجيل الدخول' />
          <AppUl items={[
            {
              title: 'يتم تسجيل الدخول باستخدام حساب Google الخاص بك.'
            },
            {
              title: 'عند دخولك لأول مرة، يجب عليك إكمال بيانات ملفك الشخصي قبل المتابعة.'
            }
          ]} />

          <H2 text='البدء في التعلم' />
          <AppUl items={[
            {
              title: 'قبل الوصول إلى المحتوى التعليمي، يجب عليك اجتياز الاختبار القبلي لتقييم مستواك الحالي.'
            },
            {
              title: 'بعد اجتياز الاختبار القبلي، يمكنك تصفح قائمة الدورات التدريبية والبدء في التعلم.'
            },
            {
              title: 'يجب إكمال كل دورة بالترتيب قبل التمكن من الانتقال إلى الدورة التالية.'
            },
          ]} />
          <H2 text='متابعة تقدمك' />
          <AppUl items={[
            {
              title: 'يمكنك الاطلاع على ما حققته من تقدم من خلال صفحة "نظرة عامة" التي تعرض إنجازاتك ونتائج اختباراتك.'
            }
          ]} />
          <H2 text='التفاعل مع الزملاء' />
          <AppUl items={[
            {
              title: 'يمكنك مشاركة أسئلتك واستفساراتك مع زملائك عبر قسم المشاركات، مما يساعدك على تعزيز الفهم وتبادل المعرفة.'
            }
          ]} />
          <H2 text='إتمام الدورة والتقييم النهائي' />
          <AppUl items={[
            {
              title: 'لإنهاء الدورة، يجب عليك اجتياز الاختبار النهائي بنجاح للحصول على التقدير النهائي والاستفادة من مخرجات التعلم.'
            }
          ]} />
        </div>
        <div className='text-center my-8'>
        <AppText text='نتمنى لك تجربة تعليمية ممتعة ومثمرة! 🚀' />
        </div>
      </AppSection>
    </main>
  )
}
