"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { fetchEntries } from "@/lib/db";
import type { GuestEntry } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExternalLinkIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow, format } from "date-fns";

const EntryList: React.FC = () => {
  const [entries, setEntries] = useState<GuestEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndSetEntries = async () => {
      try {
        const fetchedEntries = await fetchEntries();
        if (fetchedEntries) {
          setEntries(fetchedEntries);
        }
      } catch (error) {
        console.error("Error fetching entries:", error);
        toast("Failed to load guestbook entries. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSetEntries();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-2">No entries yet</h2>
        <p className="text-muted-foreground">
          Be the first to sign the guestbook!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-8">
      {entries.map((entry: GuestEntry) => (
        <Card key={entry.id}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={entry.authorAvatar} alt={entry.authorName} />
                <AvatarFallback>{entry.authorName[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg flex items-center gap-[6px]">
                  {entry.authorName}{" "}
                  {entry.isOfficial && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Image
                            src="/verified.svg"
                            width={20}
                            height={20}
                            alt="Original Creator"
                            className="size-5"
                            draggable={false}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Original Creator</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  {entry.githubUsername && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Image
                            src="/github-dark.svg"
                            width={20}
                            height={20}
                            alt="GitHub"
                            className="size-5 hidden dark:block"
                            draggable={false}
                          />
                          <Image
                            src="/github-light.svg"
                            width={20}
                            height={20}
                            alt="GitHub"
                            className="dark:hidden size-5"
                            draggable={false}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <Link
                            href={`https://github.com/${entry.githubUsername}`}
                            target="_blank"
                            className="text-blue-400 dark:text-blue-800 flex gap-1 items-center"
                          >
                            @{entry.githubUsername}
                            <ExternalLinkIcon className="size-3" />
                          </Link>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p>{entry.content}</p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <p className="text-sm text-muted-foreground mt-2">
                    {formatDistanceToNow(new Date(entry.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{format(new Date(entry.createdAt), "PPpp")}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EntryList;
