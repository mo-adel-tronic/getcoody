import { MessageCircle, UserCircle } from "lucide-react";
import H3 from "../text/H3";
import AppLink from "../controls/AppLink";

interface PostCardProps {
  imageUrl: string;
  date: string;
  commentsCount?: number;
  author: string;
  title: string;
  link: string;
}
export default function PostCard({
    imageUrl,
    date,
    commentsCount = 0,
    author,
    title,
    link,
  }: PostCardProps) {
  return (
    <>
      <div
        className="rounded-lg rounded-b-none h-[200px] bg-no-repeat bg-cover bg-center border-x-4 border-secondary border-b-0 shadow-lg"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="bg-secondary text-foreground-title px-2 py-1 rounded-bl-lg rounded-tr-lg w-fit">
          {date}
        </div>
      </div>
      <div className="bg-background-light rounded-b-lg shadow-lg border-x-secondary border border-b-0 border-t-0 border-x-4 py-4 px-4">
        <div className="flex justify-start text-[16px] gap-x-5 mb-8">
          {
            commentsCount > 0 &&
            <div className="flex items-center gap-x-2 justify-center">
            <MessageCircle className="text-primary" />
            <span className="text-foreground">التعليقات {`(${commentsCount})`}</span>
          </div>
          }

          <div className="flex items-center gap-x-2 justify-center">
            <UserCircle className="text-primary" />
            <span className="text-foreground">بواسطة {`(${author})`}</span>
          </div>
        </div>
        <div className="mb-8">
          <H3 text={title} />
        </div>
        <div className="mb-8">
          <AppLink href={link}>إقرأ المزيد</AppLink>
        </div>
      </div>
    </>
  );
}
