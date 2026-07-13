"use client";

import { useDashboard } from "@/hooks/use-dashboard-data";
import { ChartArea, ChartBar, ChartLine, ChartPie } from "@/components/charts";

export default function OverviewPage() {
  const { sales, categories, telemetry, severity } = useDashboard();

  return (
    <div className="flex flex-col gap-4">
      <ChartArea sales={sales} />
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <ChartBar data={categories} />
        <ChartLine data={telemetry} />
        <ChartPie data={severity} />
      </div>
    </div>
  );
}
