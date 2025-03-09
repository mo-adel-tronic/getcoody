import AppImage from "../media/AppImage";
import AppText from "../text/AppText";
import H3 from "../text/H3";

interface AppPersonCardProps {
    src: string;
    alt: string;
    doctorName: string
    desc: string
}
export default function AppPersonCard({src, alt, doctorName, desc} : AppPersonCardProps) {
  return (
    <>
      <div className="border-x-secondary border border-b-0 border-t-0 border-x-4 text-center rounded-lg relative before:block before:absolute before:top-0 before:right-1/2 before:w-[150px] before:h-[150px] before:translate-x-1/2 before:-translate-y-1/2 before:bg-background before:rounded-full">
        <AppImage
          src={src}
          width={130}
          height={130}
          className="rounded-full absolute right-1/2 translate-x-1/2 -translate-y-1/2 shadow-lg"
          alt={alt}
        />
        <div className="mt-4 bg-primary p-5 rounded-lg"></div>
      </div>
      <div className="bg-white rounded-lg mt-3 py-6 text-center border-x-secondary border border-b-0 border-t-0 border-x-4">
        <H3 text={doctorName} centered={true} />
        <AppText text={desc} />
        <AppText text="كلية التربية النوعية - جامعة عين شمس" />
      </div>
    </>
  );
}
