import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Briefcase } from "lucide-react";

interface Client {
  name: string;
  industry: string;
  contact: string;
}

interface ClientInfoProps {
  clients: Client[];
}

export function ClientInfo({ clients }: ClientInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Client Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {clients.map((client, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center space-x-2 text-sm font-medium">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>{client.name} - {client.industry}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{client.contact}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}