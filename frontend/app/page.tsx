import Link from "next/link";
import { ArrowRight, BarChart3, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Sales Performance Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
           {`Track your sales team's performance, monitor deals, and analyze key metrics
            in real-time with our comprehensive dashboard.`}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                Sales Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
               {`Monitor your sales representatives' performance and track their progress
                in real-time.`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                Deal Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Keep track of ongoing deals, their status, and potential revenue across
                your sales pipeline.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Analyze key performance indicators and make data-driven decisions to
                improve sales outcomes.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Link href="/sales">
            <Button size="lg" className="gap-2">
              View Sales Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}