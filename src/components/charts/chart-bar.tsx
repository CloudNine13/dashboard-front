"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

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
  { category: "Electronics", buyers: 100, fill: "var(--color-red)" },
  { category: "Clothing", buyers: 103, fill: "var(--color-blue)" },
  { category: "Home", buyers: 97, fill: "var(--color-green)" },
  { category: "Books", buyers: 105, fill: "var(--color-yellow)" },
  { category: "Automotive", buyers: 99, fill: "var(--color-orange)" },
];

const chartConfig = {
  buyers: {
    label: "Buyers",
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
    color: "var(--color-orange)",
  },
  other: {
    label: "Other",
    color: "var(--color-gray)",
  },
} satisfies ChartConfig;

export function ChartBar({ data }: { data: ICategorySale[] }) {
  const chartData =
    data && data.length > 0
      ? data.map((entry) => {
          const key = entry.category as keyof typeof chartConfig;
          const configColor = (chartConfig[key] as { color?: string })?.color;
          return {
            ...entry,
            fill: configColor || entry.fill || "var(--color-gray)",
          };
        })
      : defaultChartData;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales by Category</CardTitle>
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
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={85}
              tickFormatter={(value) =>
                (chartConfig[value as keyof typeof chartConfig]
                  ?.label as string) || value
              }
            />
            <XAxis dataKey="buyers" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="category" />}
            />
            <Bar
              dataKey="buyers"
              radius={5}
              isAnimationActive={false}
              fill="var(--color-blue)"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
