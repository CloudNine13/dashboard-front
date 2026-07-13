"use client";

import * as React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

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

import { ITelemetry } from "@/hooks/use-dashboard-data";

const defaultChartData = [
  { date: "Mon", desktop: 186, mobile: 80 },
  { date: "Tue", desktop: 305, mobile: 200 },
  { date: "Wed", desktop: 237, mobile: 120 },
  { date: "Thu", desktop: 73, mobile: 190 },
  { date: "Fri", desktop: 209, mobile: 130 },
  { date: "Sat", desktop: 214, mobile: 140 },
  { date: "Sun", desktop: 240, mobile: 150 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--color-red)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--color-blue)",
  },
} satisfies ChartConfig;

export default function ChartLine({ data }: { data: ITelemetry[] }) {
  const chartData = data && data.length > 0 ? data : defaultChartData;

  const trend = React.useMemo(() => {
    if (chartData.length < 2) return { text: "No trend data", isUp: true };

    const firstVal = chartData[chartData.length - 2].desktop;
    const secondVal = chartData[chartData.length - 1].desktop;

    if (firstVal === 0) {
      return { text: "No baseline data", isUp: true };
    }

    const diff = ((secondVal - firstVal) / firstVal) * 100;
    const absDiff = Math.abs(diff).toFixed(1);

    const fromLabel = chartData[chartData.length - 2].date;
    const toLabel = chartData[chartData.length - 1].date;

    if (diff > 0) {
      return {
        text: `Trending up by ${absDiff}% from ${fromLabel} to ${toLabel}`,
        isUp: true,
      };
    } else if (diff < 0) {
      return {
        text: `Trending down by ${absDiff}% from ${fromLabel} to ${toLabel}`,
        isUp: false,
      };
    } else {
      return { text: `Flat trend from ${fromLabel} to ${toLabel}`, isUp: true };
    }
  }, [chartData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>System API Traffic</CardTitle>
        <CardDescription>
          Daily call volume by client device type
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => (value ? value.slice(0, 3) : "")}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  hideLabel
                  useLabelAsName
                />
              }
            />
            <Line
              dataKey="desktop"
              type="natural"
              stroke="var(--color-red)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-red)",
              }}
              activeDot={{
                r: 6,
              }}
              isAnimationActive={false}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          {trend.text}{" "}
          {trend.isUp ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing API requests for the last 7 days
        </div>
      </CardFooter>
    </Card>
  );
}
