"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DroneTelemetryPoint } from "@/types/drone";
import { defaultTelemetry } from "./mocks";

const DRONE_COLORS = [
  "var(--color-red)",
  "var(--color-blue)",
  "var(--color-green)",
  "var(--color-yellow)",
  "var(--color-orange)",
  "var(--color-purple)",
];

function buildChartConfig(droneIds: string[]) {
  const config: ChartConfig = { metric: { label: "Metric" } };
  droneIds.forEach((id, i) => {
    config[id] = {
      label: id,
      color: DRONE_COLORS[i % DRONE_COLORS.length],
    };
  });
  return config;
}

const metricsMapping = {
  altitude: "Altitude (m)",
  speed: "Speed (m/s)",
  battery: "Battery (%)",
};

function transformData(
  telemetry: DroneTelemetryPoint[],
  metricKey: keyof DroneTelemetryPoint,
) {
  const grouped: Record<string, Record<string, number>> = {};
  const data = telemetry.length > 0 ? telemetry : defaultTelemetry;
  data.forEach((point) => {
    const time = point.timestamp;
    if (!grouped[time]) grouped[time] = {};
    grouped[time][point.droneId] = point[metricKey] as number;
  });
  return Object.entries(grouped).map(([timestamp, values]) => ({
    timestamp: new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }),
    ...values,
  }));
}

export function DroneTelemetryChart({
  telemetry,
}: {
  telemetry: DroneTelemetryPoint[];
}) {
  const [metric, setMetric] =
    React.useState<keyof typeof metricsMapping>("altitude");

  const droneIds = React.useMemo(() => {
    const ids = new Set(
      (telemetry.length > 0 ? telemetry : defaultTelemetry).map(
        (t) => t.droneId,
      ),
    );
    return Array.from(ids).sort();
  }, [telemetry]);

  const chartConfig = React.useMemo(
    () => buildChartConfig(droneIds),
    [droneIds],
  );
  const chartData = React.useMemo(
    () => transformData(telemetry, metric as keyof DroneTelemetryPoint),
    [telemetry, metric],
  );

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Drone Telemetry Stream</CardTitle>
          <CardDescription>
            Real-time {metricsMapping[metric]} for all active drones
          </CardDescription>
        </div>
        <Select
          value={metric}
          onValueChange={(v) =>
            setMetric((v as keyof typeof metricsMapping) || "altitude")
          }
        >
          <SelectTrigger
            className="hidden w-[180px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select metric"
          >
            <SelectValue>{metricsMapping[metric]}</SelectValue>
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="altitude" className="rounded-lg">
              {metricsMapping.altitude}
            </SelectItem>
            <SelectItem value="speed" className="rounded-lg">
              {metricsMapping.speed}
            </SelectItem>
            <SelectItem value="battery" className="rounded-lg">
              {metricsMapping.battery}
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[180px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              {droneIds.map((id, i) => (
                <linearGradient
                  key={id}
                  id={`fill${id}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={DRONE_COLORS[i % DRONE_COLORS.length]}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={DRONE_COLORS[i % DRONE_COLORS.length]}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            {droneIds.map((id, i) => (
              <Area
                key={id}
                dataKey={id}
                type="natural"
                fill={`url(#fill${id})`}
                stroke={DRONE_COLORS[i % DRONE_COLORS.length]}
                stackId="1"
                isAnimationActive={false}
              />
            ))}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
