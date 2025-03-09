import { ImageSrc } from "@/core/utils/constants";
import AppContainer from "../atoms/blocks/AppContainer";
import AppLottie from "../atoms/media/AppLottie";
import H2 from "../atoms/text/H2";
import AppText from "../atoms/text/AppText";

export default function About() {
  
  return ( 
      <AppContainer reverseCol={false}>
        <div>
        <AppLottie src={ImageSrc.lottieAbout} />
      </div>
      <div>
        <H2 text="عن المنصة" />
        <AppText text="منصة MyApp Path تقدم تجربة تعليمية فريدة تجمع بين البرمجة والذكاء الاصطناعي. من خلال دوراتنا التفاعلية المدعمة بأحدث أدوات الذكاء الاصطناعي ووسائط متعددة، نقدم لك محتوى غنيًا ومبتكرًا يساعدك على إتقان البرمجة وتحويل الأفكار إلى تطبيقات ذكية. انطلق معنا في رحلة تعليمية متطورة تواكب مستقبل التكنولوجيا." />
      </div>
    </AppContainer>
  );
}
