"use client";

import { useState } from "react";
import EntryForm from "./entryform";
import EntryList from "./entrylist";
import { Toaster } from "@/components/ui/sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Guestbook() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(refreshKey + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full border-0">
        <CardHeader>
          <CardTitle className="text-4xl font-semibold">Guestbook</CardTitle>
          <CardDescription className="text-lg">
            Leave a message for me below. It could be anything - appreceation,
            information, wisdom or even humor!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <EntryForm refresh={handleRefresh} />
          <EntryList key={refreshKey} />
          <Toaster />
        </CardContent>
        {/* <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Guestbook</h1>
        <EntryForm refresh={handleRefresh} />
        <EntryList key={refreshKey} />
        <Toaster />
      </div> */}
      </Card>
    </div>
  );
}
