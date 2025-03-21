import AppContainer from "../atoms/blocks/AppContainer";
import H1 from "../atoms/text/H1";
import AppText from "../atoms/text/AppText";
import { ImageSrc, RoutesName } from "@/core/utils/constants";
import AppLink from "../atoms/controls/AppLink";
import AppLottie from "../atoms/media/AppLottie";
import { getServerSession } from "next-auth";
import { authOptions } from "@/core/utils/NextAuth";

export default async function Header1() {
  const session = await getServerSession(authOptions);
  return (
    <header className="app-gradient py-4 mb-5 min-h-[70vh] shadow-md shadow-slate-300">
      <AppContainer>
        {/* CHILD 1 */}
        <div className="flex justify-center flex-col">
          <H1 mainText="منصة " spanText="GetCoody" spanFirst={false} />
          <H1 mainText="وجهتك الأولي في إنتاج تطبيقات الهواتف الذكية" />
          <AppText
            text="تعلم أحدث تقنيات البرمجة لتطوير تطبيقات الهاتف المحمول بدءً من
  الأساسيات وحتي المستويات المتقدمة لنساعدك لتحويل أفكارك إلي تطبيقات
  واقعية."
          />
          <div className="flex justify-center lg:justify-start pb-8">
          {
            session && session.user?.email ? 
            (
              <AppLink
                href={RoutesName.classroom}
                className="mt-6 font-bold text-[0.8em]"
              >
                الملف الشخصي
              </AppLink>
            ) :
            (
              <AppLink href={RoutesName.login} className="mt-6 font-bold text-[0.8em]">
                إنضم إلينا الأن
              </AppLink>
            ) 
          }
          </div>
        </div>

        {/* CHILD 2 */}
        <div>
          <AppLottie src={ImageSrc.lottieHeader} />
        </div>
      </AppContainer>
    </header>
  );
}
