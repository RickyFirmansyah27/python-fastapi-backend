import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DealList } from "./DealList";
import { ClientInfo } from "./ClientInfo";
import { MapPin, Award } from "lucide-react";

interface SalesRep {
  id: number;
  name: string;
  role: string;
  region: string;
  skills: string[];
  deals: Array<{
    client: string;
    value: number;
    status: string;
  }>;
  clients: Array<{
    name: string;
    industry: string;
    contact: string;
  }>;
}

interface SalesRepCardProps {
  rep: SalesRep;
}

export function SalesRepCard({ rep }: SalesRepCardProps) {
  const totalRevenue = rep.deals.reduce((sum, deal) => sum + deal.value, 0);
  const wonDeals = rep.deals.filter(deal => deal.status === "Closed Won").length;
  const conversionRate = Math.round((wonDeals / rep.deals.length) * 100);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback>{rep.name.split(" ")[0][0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{rep.name}</h3>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-muted-foreground">{rep.role}</p>
                <span className="text-muted-foreground">•</span>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  {rep.region}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {rep.skills.map((skill, index) => (
            <Badge key={index} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Award className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Revenue</p>
              <p className="text-xl font-bold">${totalRevenue.toLocaleString()}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Deals Won</p>
            <p className="text-xl font-bold">{wonDeals}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Conversion</p>
            <p className="text-xl font-bold">{conversionRate}%</p>
          </div>
        </div>
        
        <DealList deals={rep.deals} />
        <ClientInfo clients={rep.clients} />
      </CardContent>
    </Card>
  );
}