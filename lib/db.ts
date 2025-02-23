"use server";

import prisma from "@/lib/prisma";
import type { GuestEntry } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import escapeHtml from "escape-html";

export const isGood = async (text: string): Promise<boolean | null> => {
  const url = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${process.env.PERSPECTIVE_API_KEY}`;
  const requestBody = {
    comment: { text: text },
    languages: ["en"],
    requestedAttributes: { TOXICITY: {} },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      console.error(
        `Failed to analyze comment: ${response.status} ${response.statusText}`,
      );
      return null;
    }

    const responseData = await response.json();
    const summaryScore = responseData.attributeScores.TOXICITY.summaryScore;

    return summaryScore.value <= 0.5;
  } catch (error) {
    console.error(`Failed to analyze comment: ${error}`);
    return null;
  }
};

export const fetchEntries = async () => {
  try {
    const entries: GuestEntry[] = await prisma.guestEntry.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
    return entries;
  } catch (error) {
    console.error("Error fetching entries:", error);
    return null;
  }
};

export const createOrUpdateEntry = async (content: string) => {
  if (content.trim() === "") throw new Error("Entry cannot be empty");

  const isGoodEntry = await isGood(content);
  if (!isGoodEntry) return "toxic";

  const htmlEncodedContent = escapeHtml(content);
  const formattedContent = htmlEncodedContent.replace(/\n/g, "<br>");

  const user = await currentUser();

  if (!user) {
    throw new Error("You must be signed in to create a guestbook entry.");
  }

  try {
    const entry = await prisma.guestEntry.upsert({
      where: { email: user?.primaryEmailAddress?.emailAddress || "" },
      update: {
        edited: true,
        authorName: user?.fullName || user?.username || "",
        authorAvatar: user?.hasImage ? user?.imageUrl : "",
        githubUsername: user?.username || "",
        isOfficial:
          user?.username === "devashish2024" ||
          user?.username === "vortexprime24",
        content: formattedContent,
      },
      create: {
        edited: false,
        email: user?.primaryEmailAddress?.emailAddress || "",
        authorName: user?.fullName || user?.username || "",
        authorAvatar: user?.hasImage ? user?.imageUrl : "",
        githubUsername: user?.username || "",
        isOfficial:
          user?.username === "devashish2024" ||
          user?.username === "vortexprime24",
        content: formattedContent,
      },
    });

    revalidatePath("/");
    return entry;
  } catch (error) {
    throw new Error(`Error creating entry: ${error}`);
  }
};
