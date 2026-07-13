"use client";

import { Fragment, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { RadioIcon } from "lucide-react";
import { useDashboard, DashboardProvider } from "@/hooks/use-dashboard-data";
import WebSocketLoadingScreen from "@/components/ui/websocket-loading-screen";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

function DashboardHeader({ pathSegments }: { pathSegments: string[] }) {
  const { isConnected } = useDashboard();
  const pathname = usePathname();
  const isOverview = pathname === "/overview";

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-vertical:h-4 data-vertical:self-auto"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/overview">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            {pathSegments.map((segment, index) => {
              const isLast = index === pathSegments.length - 1;
              const label =
                segment.charAt(0).toUpperCase() +
                segment.slice(1).replace("-", " ");

              return (
                <Fragment key={segment}>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        href={`/${pathSegments.slice(0, index + 1).join("/")}`}
                      >
                        {label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-4">
        {isOverview && (
          <div
            className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold select-none transition-colors duration-300 ${
              isConnected
                ? "border-red-500/30 bg-red-500/5 text-red-600 dark:text-red-400"
                : "border-yellow-500/30 bg-yellow-500/5 text-yellow-600 dark:text-yellow-400"
            }`}
          >
            <span className="relative flex size-1.5">
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                  isConnected ? "bg-red-500" : "bg-yellow-500"
                }`}
              ></span>
              <span
                className={`relative inline-flex size-1.5 rounded-full ${
                  isConnected ? "bg-red-500" : "bg-yellow-500"
                }`}
              ></span>
            </span>
            <RadioIcon className="size-3" />
            <span>{isConnected ? "LIVE" : "OFFLINE"}</span>
          </div>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const isOverview = pathname === "/overview";

  return (
    <DashboardProvider active={isOverview}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <DashboardHeader pathSegments={pathSegments} />
          <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
      <WebSocketLoadingScreen />
    </DashboardProvider>
  );
}
