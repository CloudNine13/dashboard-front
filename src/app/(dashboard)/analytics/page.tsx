import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ActivityIcon,
  UsersIcon,
  EyeIcon,
  MousePointerClickIcon,
} from "lucide-react";

export default function AnalyticsPage() {
  const metrics = [
    {
      title: "Total Visits",
      value: "148,252",
      change: "+12.3%",
      description: "Compared to last week",
      icon: <EyeIcon className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Unique Visitors",
      value: "84,392",
      change: "+8.1%",
      description: "Compared to last week",
      icon: <UsersIcon className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Click-Through Rate (CTR)",
      value: "3.42%",
      change: "+0.8%",
      description: "Compared to last week",
      icon: <MousePointerClickIcon className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Active Sessions",
      value: "1,204",
      change: "+18.2%",
      description: "Currently online",
      icon: <ActivityIcon className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              {metric.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green font-semibold mr-1">
                  {metric.change}
                </span>
                {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Detailed Report</CardTitle>
          <CardDescription>
            Real-time visual data breakdown of clicks and page actions.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[250px] flex items-center justify-center border border-dashed rounded-lg bg-muted/30">
          <div className="text-center">
            <ActivityIcon className="mx-auto h-8 w-8 text-muted-foreground animate-pulse mb-2" />
            <p className="text-sm font-medium text-muted-foreground">
              Gathering latest analytics data...
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
