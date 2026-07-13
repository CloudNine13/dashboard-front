import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function TeamSettingsPage() {
  const members = [
    {
      name: "Igor Dzichkovskii",
      email: "Igordzich@gmail.com",
      role: "Owner",
      avatar: "https://api.dicebear.com/10.x/identicon/svg",
    },
    {
      name: "Alex Johnson",
      email: "alex@acme.com",
      role: "Admin",
      avatar: "https://api.dicebear.com/10.x/avataaars/svg?seed=Alex",
    },
    {
      name: "Maria Garcia",
      email: "maria@acme.com",
      role: "Developer",
      avatar: "https://api.dicebear.com/10.x/avataaars/svg?seed=Maria",
    },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Team Settings</CardTitle>
            <CardDescription>
              Manage your team member roles and permissions.
            </CardDescription>
          </div>
          <Button size="sm">Invite Member</Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border border-border">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="p-3 font-medium text-muted-foreground">
                    User
                  </th>
                  <th className="p-3 font-medium text-muted-foreground">
                    Role
                  </th>
                  <th className="p-3 font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="p-3 text-right font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {members.map((member) => (
                  <tr
                    key={member.email}
                    className="hover:bg-muted/10 transition-colors"
                  >
                    <td className="p-3 flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm leading-none">
                          {member.name}
                        </span>
                        <span className="text-xs text-muted-foreground mt-0.5">
                          {member.email}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 font-medium text-xs">{member.role}</td>
                    <td className="p-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green/10 text-green">
                        Active
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <Button variant="ghost" size="sm">
                        Manage
                      </Button>
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
