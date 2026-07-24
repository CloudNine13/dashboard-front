"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { DroneAlert, AlertSeverity } from "@/types/drone";

const defaultChartData = [
  { severity: "info", count: 187, fill: "var(--color-blue)" },
  { severity: "warning", count: 43, fill: "var(--color-yellow)" },
  { severity: "critical", count: 12, fill: "var(--color-red)" },
];

const chartConfig = {
  count: { label: "Alerts" },
  info: { label: "Info", color: "var(--color-blue)" },
  warning: { label: "Warning", color: "var(--color-yellow)" },
  critical: { label: "Critical", color: "var(--color-red)" },
} satisfies ChartConfig;

function groupBySeverity(alerts: DroneAlert[]): { severity: string; count: number; fill: string }[] {
  if (alerts.length === 0) return defaultChartData;

  const groups: Record<AlertSeverity, number> = { info: 0, warning: 0, critical: 0 };
  alerts.forEach((a) => { groups[a.severity]++; });

  return [
    { severity: "info", count: groups.info, fill: "var(--color-blue)" },
    { severity: "warning", count: groups.warning, fill: "var(--color-yellow)" },
    { severity: "critical", count: groups.critical, fill: "var(--color-red)" },
  ].filter((g) => g.count > 0);
}

export function DroneAlertsPie({ alerts }: { alerts: DroneAlert[] }) {
  const chartData = React.useMemo(() => groupBySeverity(alerts), [alerts]);

  const totalAlerts = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Alert Severity Distribution</CardTitle>
        <CardDescription>Drone fleet event log</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px] mt-15">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="severity"
              innerRadius={60}
              strokeWidth={5}
              isAnimationActive={false}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalAlerts.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Alerts
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
