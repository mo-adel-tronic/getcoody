import H3 from "../text/H3";
import AppText from "../text/AppText";
import { CheckCircle } from "lucide-react";
interface AppUlItem {
    title: string,
    content?: string
}
interface AppUlProps {
    items: AppUlItem[]
}
export default function AppUl({items}: AppUlProps) {
  return (
    <div>
      {
        items.map(item => {
            return <div className="flex gap-5 mb-5" key={item.title}>
            <div className="pt-2">
              <CheckCircle className="text-secondary-hover text-2xl" />
            </div>
            <div className="text-start">
              <H3 text={item.title} />
              {item.content && <AppText text={item.content} />}
            </div>
          </div>
        })
      }
    </div>
  );
}