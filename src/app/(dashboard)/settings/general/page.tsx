import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function GeneralSettingsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>
            Configure your project&apos;s public profile and access credentials.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-muted-foreground">
              Project Name
            </label>
            <Input defaultValue="Dashboard Example App" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-muted-foreground">
              System URL
            </label>
            <Input defaultValue="https://dashboard.dzichkovskii.com" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-muted-foreground">
              Support Email
            </label>
            <Input defaultValue="Igordzich@gmail.com" type="email" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 border-t pt-4">
          <Button variant="outline">Reset</Button>
          <Button>Save changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
