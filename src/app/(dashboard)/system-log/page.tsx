import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchIcon, FilterIcon, RefreshCwIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SystemLogPage() {
  const logs = [
    { timestamp: "2026-07-12 01:31:02", level: "info", component: "AuthService", message: "User session initialized successfully for user_9812" },
    { timestamp: "2026-07-12 01:29:45", level: "warning", component: "Database", message: "Database connection pool reached 85% capacity (170/200)" },
    { timestamp: "2026-07-12 01:28:12", level: "info", component: "API-Gateway", message: "GET /api/v1/overview - 200 OK - 42ms" },
    { timestamp: "2026-07-12 01:25:30", level: "error", component: "PaymentService", message: "Stripe webhook signature validation failed - 400 Bad Request" },
    { timestamp: "2026-07-12 01:24:19", level: "info", component: "NotificationService", message: "Weekly summary email dispatched to 1,482 recipients" },
    { timestamp: "2026-07-12 01:21:05", level: "error", component: "AuthService", message: "Invalid password attempt for account: security@dzichkovskii.com" },
    { timestamp: "2026-07-12 01:18:44", level: "info", component: "API-Gateway", message: "POST /api/v1/settings - 201 Created - 112ms" },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4">
        <div>
          <CardTitle>System Logs</CardTitle>
          <CardDescription>Real-time audit log of system occurrences and service metrics.</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <RefreshCwIcon className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search logs..." className="pl-9" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-1.5">
              <FilterIcon className="h-4 w-4" />
              Filter level
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="p-3 font-medium text-muted-foreground">Timestamp</th>
                <th className="p-3 font-medium text-muted-foreground">Level</th>
                <th className="p-3 font-medium text-muted-foreground">Service</th>
                <th className="p-3 font-medium text-muted-foreground">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {logs.map((log, index) => (
                <tr key={index} className="hover:bg-muted/10 transition-colors">
                  <td className="p-3 whitespace-nowrap text-muted-foreground font-mono text-xs">{log.timestamp}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                      log.level === "error" ? "bg-red/10 text-red" :
                      log.level === "warning" ? "bg-yellow/10 text-yellow" :
                      "bg-green/10 text-green"
                    }`}>
                      {log.level.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3 whitespace-nowrap font-medium text-xs">{log.component}</td>
                  <td className="p-3 text-muted-foreground font-mono text-xs max-w-md truncate md:max-w-none">{log.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
