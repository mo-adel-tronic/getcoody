import { ImageSrc } from "@/core/utils/constants";
import AppContainer from "../atoms/blocks/AppContainer";
import AppSection from "../atoms/blocks/AppSection";
import AppUl from "../atoms/lists/AppUl";
import VerticalImage from "../atoms/media/VerticalImage";
import H2 from "../atoms/text/H2";

export default function ResearcherSection() {
  return (
    <AppSection>
        <AppContainer reverseCol={false}>
            {/* first */}
            <div>
                <H2 text='عن الباحث' />
                {/* Resercher Data Container */}
                <AppUl items={[
                    {
                        title: 'اسم بالباحث',
                        content: 'م/ محمد عادل محمد'
                    },
                    {
                        title: 'الوظيفة',
                        content: 'معيد بكلية التربية النوعية - جامعة عين شمس'
                    },
                    {
                        title: 'التخصص',
                        content: 'تكنولوجيا التعليم التربوي'
                    },
                    {
                        title: 'المؤهلات والشهادات الأكاديمية',
                        content: 'بكالوريوس في التربية النوعية تخصص تكنولوجيا التعليم'
                    },
                ]} />
                
            </div>
            {/* second */}
            <div>
                <VerticalImage
                src={ImageSrc.researcher} 
                alt='researcher'
                width={400}
                height={500}
                className='mt-6'
                />
            </div>
        </AppContainer>
    </AppSection>
  )
}
