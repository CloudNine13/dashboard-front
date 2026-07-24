"use client";

import * as React from "react";
import { Target } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { DroneMissionStats, DroneTelemetryPoint } from "@/types/drone";
import { useDroneDataContext } from "@/hooks/use-drone-data";

const chartConfig = {
  flightTime: { label: "Flight Time (m)", color: "var(--color-red)" },
  distance: { label: "Distance (km)", color: "var(--color-blue)" },
  areaCovered: { label: "Area Covered (km2)", color: "var(--color-green)" },
} satisfies ChartConfig;

const defaultRadialData = [
  { metric: "flightTime", value: 310, fill: "var(--color-red)" },
  { metric: "distance", value: 356, fill: "var(--color-blue)" },
  { metric: "areaCovered", value: 388, fill: "var(--color-green)" },
];

export function DroneMissionChart({
  stats,
}: {
  stats: DroneMissionStats | null;
  telemetry: DroneTelemetryPoint[];
}) {
  const { isConnected, isConnecting } = useDroneDataContext();

  const chartData = React.useMemo(() => {
    if (!stats) return defaultRadialData;
    return [
      {
        metric: "flightTime",
        value: stats.totalFlightHours,
        fill: "var(--color-red)",
      },
      {
        metric: "distance",
        value: stats.totalDistanceKm,
        fill: "var(--color-blue)",
      },
      {
        metric: "areaCovered",
        value: stats.areaCoveredKm2,
        fill: "var(--color-green)",
      },
    ];
  }, [stats]);

  const totalActive = stats?.activeDrones || 6;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Mission Statistics</CardTitle>
        <CardDescription>Instant real-time fleet totals</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            innerRadius="30%"
            outerRadius="100%"
            barSize={16}
            startAngle={90}
            endAngle={-270}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="metric" />}
            />
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              polarRadius={[35, 55, 75]}
            />
            <RadialBar
            isAnimationActive={false}
              dataKey="value"
              background={{ fill: "hsl(var(--muted))" }}
              cornerRadius={10}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalActive}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          Drones
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {isConnected
            ? "Live streaming"
            : isConnecting
              ? "Connecting..."
              : "Offline"}
          <Target
            className={`h-4 w-4 ${
              isConnected
                ? "text-primary animate-pulse"
                : isConnecting
                  ? "text-yellow-500 animate-pulse"
                  : "text-red-500"
            }`}
          />
        </div>
        <div className="leading-none text-muted-foreground">
          {isConnected
            ? "Showing real-time aggregate mission data"
            : "Waiting for connection..."}
        </div>
      </CardFooter>
    </Card>
  );
}
