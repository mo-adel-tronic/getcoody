import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ImageSrc, RoutesName } from "@/core/utils/constants";
import AppSection from "@/ui/atoms/blocks/AppSection";
import AppUl from "@/ui/atoms/lists/AppUl";
import AppImage from "@/ui/atoms/media/AppImage";
import AppText from "@/ui/atoms/text/AppText";
import H1 from "@/ui/atoms/text/H1";

export default function Targets() {
  return (
    <main>
      <header className='container bg-secondary-foreground py-3'>
        <AppImage
        src={ImageSrc.blogPost2}
        alt='targets'
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
          <BreadcrumbLink href={RoutesName.targets}>
          <AppText text='الأهداف' />
                    </BreadcrumbLink>
          </BreadcrumbItem>
          </BreadcrumbList>
          </Breadcrumb>
        </div>
      <AppSection>
        <div className='container'>
          <div className='text-center'>
          <H1 spanFirst={false} spanText='Get-Coody' mainText='الهدف العام لبيئة التعلم الإلكترونية' />
          </div>
          <AppText text='تهدف هذه البيئة التعليمية إلى تمكين الطلاب من تطوير تطبيقات الهواتف الذكية باستخدام لغة Dart وإطار Flutter، بدءًا من الأساسيات وحتى الوصول إلى مستوى الاحتراف. من خلال محتوى تدريبي شامل وممارسة عملية، نساعد المتعلمين على:' />
          <AppUl items={[
            {
              title: 'فهم أساسيات البرمجة بلغة Dart وبناء أساس قوي في البرمجة الكائنية.'
            },
            {
              title: 'تطوير واجهات المستخدم التفاعلية باستخدام Flutter، مع التركيز على التصميم الجذاب والأداء العالي.'
            },
            {
              title: 'إنشاء تطبيقات متكاملة تتفاعل مع قواعد البيانات والخدمات السحابية.'
            },
            {
              title: 'تعزيز مهارات التفكير المنطقي وحل المشكلات من خلال مشاريع عملية وتحديات برمجية.'
            },
            {
              title: 'تحضير الطلاب لسوق العمل من خلال تدريب عملي على بناء تطبيقات حقيقية قابلة للنشر.'
            },
          ]} />
        </div>
        <div className='text-center my-8'>
        <AppText text='نؤمن بأن التعلم بالممارسة هو المفتاح الأساسي لاكتساب المهارات، لذلك توفر بيئتنا أدوات تفاعلية، تمارين عملية، ومجتمعًا داعمًا يساعد المتعلمين على تطوير مهاراتهم البرمجية بكفاءة. 🚀' />
        </div>
      </AppSection>
    </main>
  )
}
