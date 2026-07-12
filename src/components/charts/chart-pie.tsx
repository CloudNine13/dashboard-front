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

import { ILogSeverity } from "@/hooks/use-dashboard-data";

const defaultChartData = [
  { code: "oks", issues: 190, fill: "var(--color-green)" },
  { code: "errors", issues: 133, fill: "var(--color-errors)" },
  { code: "warnings", issues: 43, fill: "var(--color-warnings)" },
  { code: "infos", issues: 287, fill: "var(--color-gray)" },
];

const chartConfig = {
  issues: {
    label: "Issues",
  },
  errors: {
    label: "Errors",
    color: "var(--red)",
  },
  warnings: {
    label: "Warnings",
    color: "var(--yellow)",
  },
  infos: {
    label: "Infos",
    color: "var(--gray)",
  },
  oks: {
    label: "OKs",
    color: "var(--green)",
  },
} satisfies ChartConfig;

export function ChartPie({ data }: { data: ILogSeverity[] }) {
  const chartData = data && data.length > 0 ? data : defaultChartData;
  const isSimulated = !data || data.length === 0;

  const totalIssues = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.issues, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Log Severity Distribution {isSimulated && "(simulated)"}</CardTitle>
        <CardDescription>
          Total log records compiled for the last 1 week
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px] mt-15"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="issues"
              nameKey="code"
              innerRadius={60}
              strokeWidth={5}
              isAnimationActive={false}
            >
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
                          {totalIssues.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Issues
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
