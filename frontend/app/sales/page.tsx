"use client";

import { useState } from "react";
import { SalesRepCard } from "./components/SalesRepCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin } from "lucide-react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
interface SalesRep {
  id: string;
  name: string;
  region: string;
}

export default function SalesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");

  const { data, error, isLoading } = useSWR("/api/sales-reps", fetcher);

  if (error) throw error;
  if (isLoading) return null; // Next.js will render the loading.tsx file

  const salesReps: SalesRep[] = data?.salesReps || [];
  const regions = Array.from(new Set(salesReps.map((rep: any) => rep.region)));

  const filteredReps = salesReps.filter((rep: any) => {
    const matchesSearch = rep.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = regionFilter === "all" || rep.region === regionFilter;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Sales Representatives</h1>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select
            value={regionFilter}
            onValueChange={setRegionFilter}
          >
            <SelectTrigger className="w-[200px]">
              <MapPin className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {regions.map((region: string) => (
                <SelectItem key={region} value={region}>{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid gap-6">
        {filteredReps.map((rep: any) => (
          <SalesRepCard key={rep.id} rep={rep} />
        ))}
      </div>
    </div>
  );
}