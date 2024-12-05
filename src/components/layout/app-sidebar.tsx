"use client";

import * as React from "react";
import {
  Check,
  ChevronsUpDown,
  ChevronUp,
  GalleryVerticalEnd,
  Search,
  // User,
  User2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar";
// import { Button } from "../ui/button";
import Link from "next/link";
// import { title } from "process";

// Sample data for the sidebar
const data = {
  versions: ["1.0.0", "1.1.0", "2.0.0-beta"],
  navMain: [
    {
      title: "Management",
      items: [
        { title: "Dashboard", url: "/dashboard" },
        { title: "Org Management", url: "/org-management" },
        { title: "Job Management", url: "/job-management" },
        { title: "Event Management", url: "/event-management" },
      ],
    },
  ],
};

export function AppSidebar() {
  const [selectedVersion, setSelectedVersion] = React.useState(
    data.versions[0]
  );

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <GalleryVerticalEnd className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Management System</span>
                    <span className="">v{selectedVersion}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width]"
                align="start"
              >
                {data.versions.map((version) => (
                  <DropdownMenuItem
                    key={version}
                    onSelect={() => setSelectedVersion(version)}
                  >
                    v{version}{" "}
                    {version === selectedVersion && (
                      <Check className="ml-auto" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
        <form>
          <SidebarGroup className="py-0">
            <SidebarGroupContent className="relative">
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <SidebarInput
                id="search"
                placeholder="Search..."
                className="pl-8"
              />
              <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
            </SidebarGroupContent>
          </SidebarGroup>
        </form>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Setting</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* <SidebarMenu>
          <SidebarMenuItem>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/profile">
                <User className="mr-2 h-4 w-4" />
                User Profile
              </Link>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>

    // <Sidebar>
    //   <SidebarHeader>
    //     <SidebarMenu>
    //       <SidebarMenuItem>
    //         <DropdownMenu>
    //           <DropdownMenuTrigger asChild>
    //             <SidebarMenuButton
    //               size="lg"
    //               className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
    //             >
    //               <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
    //                 <GalleryVerticalEnd className="size-4" />
    //               </div>
    //               <div className="flex flex-col gap-0.5 leading-none">
    //                 <span className="font-semibold">shadcn/ui</span>
    //                 <span className="">v{selectedVersion}</span>
    //               </div>
    //               <ChevronsUpDown className="ml-auto" />
    //             </SidebarMenuButton>
    //           </DropdownMenuTrigger>
    //           <DropdownMenuContent
    //             className="w-[--radix-dropdown-menu-trigger-width]"
    //             align="start"
    //           >
    //             {data.versions.map((version) => (
    //               <DropdownMenuItem
    //                 key={version}
    //                 onSelect={() => setSelectedVersion(version)}
    //               >
    //                 v{version}{" "}
    //                 {version === selectedVersion && (
    //                   <Check className="ml-auto" />
    //                 )}
    //               </DropdownMenuItem>
    //             ))}
    //           </DropdownMenuContent>
    //         </DropdownMenu>
    //       </SidebarMenuItem>
    //     </SidebarMenu>
    //     <form>
    //       <SidebarGroup className="py-0">
    //         <SidebarGroupContent className="relative">
    //           <Label htmlFor="search" className="sr-only">
    //             Search
    //           </Label>
    //           <SidebarInput
    //             id="search"
    //             placeholder="Search documentation..."
    //             className="pl-8"
    //           />
    //           <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
    //         </SidebarGroupContent>
    //       </SidebarGroup>
    //     </form>
    //   </SidebarHeader>
    //   <SidebarContent>
    //     {data.navMain.map((section) => (
    //       <SidebarGroup key={section.title}>
    //         <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
    //         <SidebarGroupContent>
    //           <SidebarMenu>
    //             {section.items.map((item) => (
    //               <SidebarMenuItem key={item.title}>
    //                 {/* <SidebarMenuButton asChild isActive={item.isActive}> */}
    //                 <SidebarMenuButton>
    //                   <a href={item.url}>{item.title}</a>
    //                 </SidebarMenuButton>
    //                 {/* </SidebarMenuButton> */}
    //               </SidebarMenuItem>
    //             ))}
    //           </SidebarMenu>
    //         </SidebarGroupContent>
    //       </SidebarGroup>
    //     ))}
    //   </SidebarContent>
    //   <SidebarFooter>
    //     <SidebarMenu>
    //       <SidebarMenuItem>
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <SidebarMenuButton>
    //       <User2 /> Username
    //       <ChevronUp className="ml-auto" />
    //     </SidebarMenuButton>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent
    //     side="top"
    //     className="w-[--radix-popper-anchor-width]"
    //   >
    //     <DropdownMenuItem>
    //       <span>Account</span>
    //     </DropdownMenuItem>
    //     <DropdownMenuItem>
    //       <span>Billing</span>
    //     </DropdownMenuItem>
    //     <DropdownMenuItem>
    //       <span>Sign out</span>
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
    //       </SidebarMenuItem>
    //     </SidebarMenu>
    //   </SidebarFooter>
    //   <SidebarRail />
    // </Sidebar>
  );
}
