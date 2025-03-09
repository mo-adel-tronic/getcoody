import AppText from "../text/AppText";
import H3 from "../text/H3";

interface AppSmallCardProps {
  icon: React.ReactNode;
  title: string;
  body: string;
}
export default function AppSmallCard({ icon, title, body }: AppSmallCardProps) {
  return (
    <div className="bg-background-light p-8 rounded-lg flex items-center border gap-x-4 border-white shadow-xl shadow-slate-300">
      {icon}
      <div>
        <H3 text={title} />
        <AppText text={body} size="md" />
      </div>
    </div>
  );
}