import { ImageSrc } from "@/core/utils/constants";
import AppPersonCard from "../atoms/blocks/AppPersonCard";
import AppSection from "../atoms/blocks/AppSection";
import H2 from "../atoms/text/H2";

export default function TeacherSection() {
  return (
    <AppSection withBG={true}>
        <div className='text-center px-8 md:w-1/2 mx-auto'>
        <H2 text="الإشراف" />
        </div>
        <div className='flex flex-wrap pt-16'>
            <div className='md:w-1/3 p-8 w-full'>
                <AppPersonCard 
                src={ImageSrc.teacher1} 
                alt="dr howayda" 
                doctorName="أ.د/ هويدا سعيد عبدالحميد" 
                desc="أستاذ ورئيس قسم تكنولوجيا التعليم"
                />
            </div>
            <div className='md:w-1/3 p-8 w-full'>
                <AppPersonCard 
                src={ImageSrc.teacher2} 
                alt="dr zeinab" 
                doctorName="أ.م.د/ زينب محمد العربي" 
                desc="أستاذ تكنولوجيا التعليم المساعد"
                />
            </div>
            <div className='md:w-1/3 p-8 w-full'>
                <AppPersonCard 
                src={ImageSrc.teacher3} 
                alt="dr walaa" 
                doctorName="د/ ولاء كمال حسن" 
                desc="مدرس تكنولوجيا التعليم"
                />
            </div>
        </div>
    </AppSection>
  )
}
