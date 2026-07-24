"use client";

import { Bar, BarChart, XAxis, YAxis, type BarShapeProps } from "recharts";

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
import type { DroneInfo } from "@/types/drone";

const defaultDrones: DroneInfo[] = [
  {
    id: "drone-001",
    name: "Vulture-1",
    battery: 82,
    altitude: 95,
    speed: 12,
    missionsCompleted: 14,
  },
  {
    id: "drone-002",
    name: "Hawk-3",
    battery: 7,
    altitude: 72,
    speed: 9,
    missionsCompleted: 22,
  },
  {
    id: "drone-003",
    name: "Falcon-7",
    battery: 45,
    altitude: 48,
    speed: 15,
    missionsCompleted: 8,
  },
  {
    id: "drone-004",
    name: "Raven-2",
    battery: 91,
    altitude: 12,
    speed: 3,
    missionsCompleted: 31,
  },
  {
    id: "drone-005",
    name: "Eagle-5",
    battery: 23,
    altitude: 0,
    speed: 0,
    missionsCompleted: 19,
  },
  {
    id: "drone-006",
    name: "Owl-4",
    battery: 58,
    altitude: 34,
    speed: 7,
    missionsCompleted: 12,
  },
];

function getBatteryColor(battery: number): string {
  if (battery <= 15) return "var(--color-red)";
  if (battery <= 35) return "var(--color-yellow)";
  return "var(--color-green)";
}

const chartConfig = {
  battery: { label: "Battery (%)" },
} satisfies ChartConfig;

export function DroneFleetChart({ drones }: { drones: DroneInfo[] }) {
  const base =
    drones.length > 0
      ? [...drones].sort((a, b) => a.battery - b.battery)
      : defaultDrones;
  const data = base.map((d) => ({ ...d, fill: getBatteryColor(d.battery) }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Drone Fleet Status</CardTitle>
        <CardDescription>Battery level by drone</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{ left: 0 }}
          >
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={85}
            />
            <XAxis dataKey="battery" type="number" domain={[0, 100]} hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="name" />}
            />
            <Bar
              dataKey="battery"
              radius={5}
              isAnimationActive={false}
              background={{ fill: "var(--color-muted)" }}
              shape={(props: BarShapeProps) => {
                const { x, y, width, height, payload } =
                  props as BarShapeProps & { payload: { fill: string } };
                return (
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    rx={5}
                    fill={payload.fill}
                  />
                );
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
