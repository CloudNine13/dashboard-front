"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  GalleryVerticalEndIcon,
  SquareChartGanttIcon,
  AudioLinesIcon,
  FrownIcon,
  ChartNetworkIcon,
  ScrollTextIcon,
  Settings2Icon,
} from "lucide-react";

// This is sample data.
const data = {
  user: {
    name: "Igor Dzichkovskii",
    email: "Igordzich@gmail.com",
    avatar: "https://api.dicebear.com/10.x/identicon/svg",
  },
  teams: [
    {
      name: "Dzichkovskii Inc.",
      logo: <GalleryVerticalEndIcon />,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: <AudioLinesIcon />,
      plan: "Startup",
    },
    {
      name: `${"Evil"
        .split("")
        .map((char, index, arr) =>
          index === arr.length - 1
            ? char
            : index === 0
              ? "\u0336" + char + "\u0336"
              : char + "\u0336",
        )
        .join("")} FAANG Corp.`,
      logo: <FrownIcon />,
      plan: "Free",
    },
  ],
  dashboard: [
    {
      title: "Overview",
      url: "/overview",
      icon: <SquareChartGanttIcon />,
      isActive: true,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: <ChartNetworkIcon />,
    },
  ],
  settings: [
    {
      title: "System Log",
      url: "/system-log",
      icon: <ScrollTextIcon />,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: <Settings2Icon />,
      items: [
        {
          title: "General",
          url: "/settings/general",
        },
        {
          title: "Team",
          url: "/settings/team",
        },
        {
          title: "Billing",
          url: "/settings/billing",
        },
        {
          title: "Limits",
          url: "/settings/limits",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.dashboard} title="Dashboard" />
        <NavMain items={data.settings} title="Settings" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
