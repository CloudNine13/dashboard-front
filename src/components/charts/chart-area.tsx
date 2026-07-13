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
import { ISale } from "@/hooks/use-dashboard-data";

const chartConfig = {
  visitors: {
    label: "Sales Value ($)",
  },
  desktop: {
    label: "Desktop",
    color: "var(--color-red)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--color-blue)",
  },
} satisfies ChartConfig;

function aggregateSalesToChartData(
  sales: ISale[],
  timeRange: string,
): { date: string; desktop: number; mobile: number }[] {
  let minutesToTrack = 30;
  if (timeRange === "15m") {
    minutesToTrack = 15;
  } else if (timeRange === "5m") {
    minutesToTrack = 5;
  }

  const now = Date.now();
  const buckets: { [key: string]: { desktop: number; mobile: number } } = {};
  const timeLabels: string[] = [];

  for (let i = minutesToTrack - 1; i >= 0; i--) {
    const d = new Date(now - i * 60 * 1000);
    const label = d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    buckets[label] = { desktop: 0, mobile: 0 };
    timeLabels.push(label);
  }

  if (!sales || sales.length === 0) {
    return timeLabels.map((label, index) => {
      const factor = (index % 7) + 1;
      const desktop = Math.round(120 + Math.sin(index * 0.5) * 40 + factor * 5);
      const mobile = Math.round(80 + Math.cos(index * 0.5) * 30 + factor * 3);
      return {
        date: label,
        desktop,
        mobile,
      };
    });
  }

  sales.forEach((sale) => {
    const saleTime = new Date(sale.timestamp);
    const label = saleTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    if (buckets[label] !== undefined) {
      if (sale.deviceType === "desktop") {
        buckets[label].desktop += sale.amount;
      } else if (sale.deviceType === "mobile") {
        buckets[label].mobile += sale.amount;
      }
    }
  });

  return timeLabels.map((label) => ({
    date: label,
    desktop: Math.round(buckets[label].desktop),
    mobile: Math.round(buckets[label].mobile),
  }));
}

export default function ChartArea({ sales }: { sales: ISale[] }) {
  const [timeRange, setTimeRange] = React.useState("15m");

  const filteredData = React.useMemo(() => {
    return aggregateSalesToChartData(sales || [], timeRange);
  }, [sales, timeRange]);

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Real-Time Sales Stream (Buyers&apos; platform)</CardTitle>
          <CardDescription>
            Showing transaction values for the last{" "}
            {timeRange === "30m"
              ? "30 minutes"
              : timeRange === "15m"
                ? "15 minutes"
                : "5 minutes"}
          </CardDescription>
        </div>
        <Select
          value={timeRange}
          onValueChange={(value) => setTimeRange(value || "15m")}
        >
          <SelectTrigger
            className="hidden w-[180px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select time range"
          >
            <SelectValue placeholder="Last 30 minutes" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="30m" className="rounded-lg">
              Last 30 minutes
            </SelectItem>
            <SelectItem value="15m" className="rounded-lg">
              Last 15 minutes
            </SelectItem>
            <SelectItem value="5m" className="rounded-lg">
              Last 5 minutes
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[180px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-red)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-red)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-blue)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-blue)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-red)"
              stackId="a"
              isAnimationActive={false}
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-blue)"
              stackId="a"
              isAnimationActive={false}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
