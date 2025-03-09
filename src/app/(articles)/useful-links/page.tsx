import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ImageSrc, RoutesName } from "@/core/utils/constants";
import AppSection from "@/ui/atoms/blocks/AppSection";
import AppUl from "@/ui/atoms/lists/AppUl";
import AppImage from "@/ui/atoms/media/AppImage";
import AppText from "@/ui/atoms/text/AppText";
import H1 from "@/ui/atoms/text/H1";
import H2 from "@/ui/atoms/text/H2";

export default function UsefulLinks() {
  return (
    <main>
      <header className='container bg-secondary-foreground py-3'>
        <AppImage
        src={ImageSrc.blogPost3}
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
          <BreadcrumbLink href={RoutesName.useful}>
          <AppText text='روابط ذات صلة' />
                    </BreadcrumbLink>
          </BreadcrumbItem>
          </BreadcrumbList>
          </Breadcrumb>
        </div>
      <AppSection>
        <div className='container'>
          <div className='text-center'>
          <H1 spanFirst={false} spanText='Get-Coody' mainText='روابط ومواقع ذات صلة ببيئة التعلم الإلكترونية' />
          </div>
          <AppText text='توفر هذه الصفحة مجموعة من الروابط المفيدة التي تساعدك على تعلم وتطوير مهاراتك في برمجة تطبيقات الهواتف الذكية باستخدام Dart وFlutter. يمكنك الاستفادة منها لتعزيز معرفتك، حل المشكلات، والبقاء على اطلاع دائم بأحدث التقنيات.' />
          <H2 text='المواقع الرسمية' />
          <AppUl items={[
            {
              title: 'https://flutter.dev',
              content: 'المصدر الأساسي لتعلم Flutter وأحدث التحديثات.'
            },
            {
              title: 'https://dart.dev',
              content: 'المرجع الرسمي لتعلم لغة Dart واستخدامها بفعالية.'
            },
          ]} />
          <H2 text='الأدوات والمكتبات المفيدة' />
          <AppUl items={[
            {
              title: 'https://pub.dev',
              content: 'مستودع الحزم والمكتبات الخاصة بـ Flutter وDart.'
            },
            {
              title: 'https://flutterawesome.com',
              content: 'مكتبة تضم مجموعة من أفضل حزم وتصميمات Flutter.'
            },
          ]} />
          <H2 text='مجتمعات ومنتديات دعم' />
          <AppUl items={[
            {
              title: 'https://stackoverflow.com/questions/tagged/flutter',
              content: 'لطرح الأسئلة التقنية والحصول على حلول.'
            },
            {
              title: 'https://www.reddit.com/r/FlutterDev',
              content: 'منصة لمشاركة الأفكار والنقاش حول Flutter.'
            },
            {
              title: 'https://www.youtube.com/c/flutterdev',
              content: 'دروس مرئية وأحداث مباشرة من فريق Flutter.'
            },
          ]} />
        </div>
        <div className='text-center my-8'>
        <AppText text='🚀 استفد من هذه الموارد لتعزيز تعلمك وتحقيق أقصى استفادة من بيئة التعلم!' />
        </div>
      </AppSection>
    </main>
  )
}
