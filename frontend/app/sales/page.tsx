"use client";

import { get, pickBy } from "lodash";
import { useState } from "react";
import { SalesRepCard } from "./components/SalesRepCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, X } from "lucide-react";
import { useGetSalesReps } from "../api/sales-service";
import { Button } from "@/components/ui/button";
import { Send, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import ReactMarkdown from 'react-markdown';
import { useGetAiConservation } from "../api/ai-service";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
interface SalesRep {
  id: string;
  name: string;
  region: string;
}
interface SearchParams {
  name?: string;
  region?: string;
  [key: string]: string | undefined;
}

export default function SalesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [searchParams, setSearchParams] = useState<SearchParams>({});

  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const [page, setPage] = React.useState(1);
  const [size, setSize] = React.useState(5);

  const params = {
    size: size,
    page: page,
    ...searchParams,
  };

  const { data: responseData, isLoading, isError } = useGetSalesReps(pickBy(params));
  const result = get(responseData, 'data.data', []);

  // AI Chat
  const {
    mutateAsync: askAi,
    isPending,
  } = useGetAiConservation();
  

  if (isError) throw new Error("Failed to fetch sales reps");
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  const salesReps: SalesRep[] = result?.salesReps || [];
  const regions = Array.from(new Set(salesReps.map((rep: any) => rep.region)));

  const handleSearchClick = () => {

    const currentParams: SearchParams = { ...searchParams };
    currentParams.name = searchQuery;
    setSearchParams(currentParams);
  };

  const handleResetClick = () => {
    setSearchQuery("");

    const { name, ...restParams } = searchParams;
    setSearchParams(restParams);
  };

  const handleRegionChange = (value: string) => {
    setRegionFilter(value);


    const newParams: SearchParams = { ...searchParams };

    if (value === "all") {

      const { region, ...restParams } = newParams;
      setSearchParams(restParams);
    } else {

      newParams.region = value;
      setSearchParams(newParams);
    }
  };


  const handleSubmitAiChat = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const resultData = await askAi({ prompt: question });
      const result = get(resultData, "data.data.chatAi", "");

      setQuestion("");
      setResponse(result);
    } catch (err) {
      console.error("Gagal fetch AI", err);
    }
  };

  const handleReset = () => {
    setQuestion("");
    setResponse("");
  };

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Sales Representatives</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>AI Sales Assistant</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitAiChat} className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask a question anything..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  disabled={!question && !response}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
              {isPending ? (
                <div className="p-4 bg-secondary rounded-lg flex justify-center items-center">
                  <span>Loading...</span>
                </div>
              ) : response ? (
                <div className="p-4 bg-secondary rounded-lg">
                  <div className="prose text-sm mb-4">
                    User Conservation: {question}
                  </div>
                  <div className="prose text-sm">
                    <ReactMarkdown>{response}</ReactMarkdown>
                  </div>
                </div>
              ) : null}
            </form>
          </CardContent>
        </Card>
        <div className="flex gap-4">
          <div className="relative flex-1 flex">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="ml-2"
                onClick={handleResetClick}
                aria-label="Reset search"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button className="ml-2" onClick={handleSearchClick}>
              Search
            </Button>
          </div>
          <Select
            value={regionFilter}
            onValueChange={handleRegionChange}
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
        {salesReps.map((rep: any) => (
          <SalesRepCard key={rep.id} rep={rep} />
        ))}
      </div>
    </div>
  );
}
