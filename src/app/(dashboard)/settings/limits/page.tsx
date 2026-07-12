import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ServerIcon, CpuIcon, HardDriveIcon, NetworkIcon } from "lucide-react";

export default function LimitsSettingsPage() {
  const limits = [
    {
      title: "API Invocations",
      value: "842,500",
      max: "1,000,000",
      percentage: 84.2,
      icon: <NetworkIcon className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: "CPU Allocation",
      value: "3.2 cores",
      max: "4.0 cores",
      percentage: 80.0,
      icon: <CpuIcon className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: "Storage Usage",
      value: "18.4 GB",
      max: "50 GB",
      percentage: 36.8,
      icon: <HardDriveIcon className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: "Active Connections",
      value: "14",
      max: "100",
      percentage: 14.0,
      icon: <ServerIcon className="h-5 w-5 text-muted-foreground" />,
    },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Usage Limits</CardTitle>
          <CardDescription>Monitor your subscription limits and resources in real-time.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {limits.map((limit) => (
            <div key={limit.title} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {limit.icon}
                  <span className="font-semibold text-sm">{limit.title}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{limit.value}</span> / {limit.max}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    limit.percentage >= 80 ? "bg-red" :
                    limit.percentage >= 50 ? "bg-yellow" :
                    "bg-green"
                  }`}
                  style={{ width: `${limit.percentage}%` }}
                />
              </div>
              <span className="text-right text-xs text-muted-foreground font-mono mt-0.5">
                {limit.percentage}% used
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
