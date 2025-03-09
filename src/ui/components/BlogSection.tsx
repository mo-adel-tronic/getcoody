import { ImageSrc, RoutesName } from "@/core/utils/constants";
import AppSection from "../atoms/blocks/AppSection";
import PostCard from "../atoms/blocks/PostCard";
import H2 from "../atoms/text/H2";

const title = (
  <div className="text-center px-8 md:w-1/2 mx-auto">
    <H2 text="منشورات تهمك" />
  </div>
);
export default function BlogSection() {
  return (
    <AppSection>
      {title}
      <div className="flex flex-wrap">
        <div className="md:w-1/3 p-8 w-full">
          <PostCard 
          imageUrl={ImageSrc.blogPost1}
          date='تعليمات'
          author="المسئول"
          title='تعليمات استخدام بيئة التعلم الإلكترونية Get-Coody'
          link={RoutesName.instructions}
          />
        </div>
        <div className="md:w-1/3 p-8 w-full">
          <PostCard 
          imageUrl={ImageSrc.blogPost2}
          date='الأهداف'
          author="المسئول"
          title='الهدف العام لبيئة التعلم الإلكترونية Get-Coody'
          link={RoutesName.targets}
          />
        </div>
        <div className="md:w-1/3 p-8 w-full">
          <PostCard 
          imageUrl={ImageSrc.blogPost3}
          date='روابط هامة'
          author="المسئول"
          title="روابط ومواقع ذات صلة ببيئة التعلم الإلكترونية Get-Coody"
          link={RoutesName.useful}
          />
        </div>
      </div>
    </AppSection>
  );
}
