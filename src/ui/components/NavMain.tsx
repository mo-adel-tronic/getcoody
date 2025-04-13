"use client"

import { ChevronLeft } from "lucide-react"
import {
  BookOpen,
  ClipboardPenLine,
  CrownIcon,
  FileQuestionIcon,
  Home,
  Info,
  LockIcon,
  LockOpen,
  PenSquareIcon,
  User,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { MainNavItemType } from "@/types"
import { PagesName } from "@/core/utils/constants";

export function NavMain({
  items,
}: {
  items: MainNavItemType[]
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const icons = {Info, User, Home, CrownIcon, ClipboardPenLine, FileQuestionIcon, PenSquareIcon, BookOpen, LockIcon, LockOpen}
          const Icon = icons[item.icon as keyof typeof icons]
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  {
                    item.items?.length ? 
                    <SidebarMenuButton tooltip={item.title} className="text-[0.8em] text-foreground-title font-bold">
                    {Icon && <Icon className="text-primary" />}
                    <span>{item.title}</span>
                    <ChevronLeft className="mr-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 text-primary" />
                  </SidebarMenuButton> 
                  :
                   <SidebarMenuButton asChild tooltip={item.title} className={`text-[0.8em] text-foreground-title font-bold ${item.isActive ? 'bg-background-light border-l-4 border-secondary-hover rounded-l-none' : ""}`}>
                   <a href={item.url}>
                   {Icon && <Icon className="text-primary" />}
                   <span>{item.title}</span>
                   </a>
                 </SidebarMenuButton>
                  }
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub >
                    {item.items?.map((subItem) => {
                      const SubIcon = icons[subItem.icon as keyof typeof icons]
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild className={`text-foreground-title ${subItem.isActive ? 'bg-background-light border-l-4 border-secondary-hover rounded-l-none' : ""}`}>
                          {SubIcon && (
                              subItem.icon === "LockOpen" || item.title !== PagesName.subject ? 
                              (
                                <a href={subItem.url}>
                                  <SubIcon className="!text-green-500" />
                                  <span className="font-bold">{subItem.title}</span>
                                </a>
                              ) : 
                              (
                                <span>
                                <SubIcon className="!text-red-500 opacity-30" />
                                <span className="text-gray-400">{subItem.title}</span>
                                </span>
                              )
                            )}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
