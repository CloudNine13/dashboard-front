"use client";

import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts";

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

import { ICategorySale } from "@/hooks/use-dashboard-data";

const defaultChartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-red)" },
  { browser: "safari", visitors: 200, fill: "var(--color-blue)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-green)" },
  { browser: "edge", visitors: 173, fill: "var(--color-yellow)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--color-red)",
  },
  safari: {
    label: "Safari",
    color: "var(--color-blue)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--color-green)",
  },
  edge: {
    label: "Edge",
    color: "var(--color-yellow)",
  },
  Electronics: {
    label: "Electronics",
    color: "var(--color-red)",
  },
  Clothing: {
    label: "Clothing",
    color: "var(--color-blue)",
  },
  Home: {
    label: "Home",
    color: "var(--color-green)",
  },
  Books: {
    label: "Books",
    color: "var(--color-yellow)",
  },
  Automotive: {
    label: "Automotive",
    color: "var(--color-purple)",
  },
  other: {
    label: "Other",
    color: "var(--color-gray)",
  },
} satisfies ChartConfig;

export function ChartBar({ data }: { data: ICategorySale[] }) {
  const chartData = data && data.length > 0 ? data : defaultChartData;
  const isSimulated = !data || data.length === 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Sales by Category {isSimulated && "(simulated)"}
        </CardTitle>
        <CardDescription>Rolling 30-minute transaction totals</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={85}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label as string || value
              }
            />
            <XAxis dataKey="visitors" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="browser" />}
            />
            <Bar dataKey="visitors" radius={5} isAnimationActive={false}>
              {chartData.map((entry, index) => {
                const key = entry.browser as keyof typeof chartConfig;
                const configColor = (chartConfig[key] as { color?: string })?.color;
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={configColor || entry.fill || "var(--color-gray)"}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
