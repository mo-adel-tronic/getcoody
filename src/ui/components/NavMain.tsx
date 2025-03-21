"use client"

import { ChevronLeft, type LucideIcon } from "lucide-react"

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

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
      icon?: LucideIcon
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
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
                  {item.icon && <item.icon className="text-primary" />}
                  <span>{item.title}</span>
                  <ChevronLeft className="mr-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 text-primary" />
                </SidebarMenuButton> 
                :
                 <SidebarMenuButton asChild tooltip={item.title} className="text-[0.8em] text-foreground-title font-bold">
                 <a href={item.url}>
                 {item.icon && <item.icon className="text-primary" />}
                 <span>{item.title}</span>
                 </a>
               </SidebarMenuButton>
                }
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub >
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild className="text-foreground-title">
                        <a href={subItem.url}>
                        {subItem.icon && <subItem.icon className="text-foreground-title" />}
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
