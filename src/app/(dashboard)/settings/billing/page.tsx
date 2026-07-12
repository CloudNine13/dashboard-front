import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCardIcon } from "lucide-react";

export default function BillingSettingsPage() {
  const invoices = [
    { id: "INV-001", date: "2026-07-01", amount: "$249.00", status: "Paid" },
    { id: "INV-002", date: "2026-06-01", amount: "$249.00", status: "Paid" },
    { id: "INV-003", date: "2026-05-01", amount: "$249.00", status: "Paid" },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>You are currently on the Enterprise plan.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="text-3xl font-bold">$249.00<span className="text-sm font-normal text-muted-foreground">/month</span></div>
            <p className="text-xs text-muted-foreground mt-2">Next payment scheduled for August 1, 2026.</p>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 border-t pt-4">
            <Button variant="outline">Change Plan</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Manage your credit card details.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-4 py-4">
            <div className="flex items-center justify-center h-12 w-16 bg-muted/40 border rounded-lg">
              <CreditCardIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Visa ending in 4242</span>
              <span className="text-xs text-muted-foreground mt-0.5">Expires 12/2029</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 border-t pt-4">
            <Button variant="outline">Update Card</Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
          <CardDescription>Download past receipts and invoices.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border border-border">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="p-3 font-medium text-muted-foreground">Invoice ID</th>
                  <th className="p-3 font-medium text-muted-foreground">Date</th>
                  <th className="p-3 font-medium text-muted-foreground">Amount</th>
                  <th className="p-3 font-medium text-muted-foreground">Status</th>
                  <th className="p-3 text-right font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-muted/10 transition-colors">
                    <td className="p-3 font-semibold text-xs">{invoice.id}</td>
                    <td className="p-3 text-muted-foreground text-xs">{invoice.date}</td>
                    <td className="p-3 text-sm font-medium">{invoice.amount}</td>
                    <td className="p-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green/10 text-green">
                        {invoice.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <Button variant="ghost" size="sm">Download PDF</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
