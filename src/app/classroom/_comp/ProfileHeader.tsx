import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import React from "react";
import SignoutBtn from "./SignoutBtn";
interface ItemProps {
  text: string;
  href: string;
}
interface ProfileHeaderProps {
  items: ItemProps[];
}
export default function ProfileHeader({ items }: ProfileHeaderProps) {
  
  return (
    <header className="flex justify-between me-4 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1 text-primary" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {items.map((item, i) => {
              return (
                <React.Fragment key={item.text}>
                  <BreadcrumbItem className="hidden md:block text-foreground">
                    <BreadcrumbLink href={item.href}>
                      {item.text}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {i < items.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div>
      <SignoutBtn api_k={process.env.NEXTAUTH_SECRET || ''} />
      </div>
    </header>
  );
}
