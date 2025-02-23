"use server";

import prisma from "@/lib/prisma";
import type { GuestEntry } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import escapeHtml from "escape-html";

export const fetchEntries = async () => {
  try {
    const entries: GuestEntry[] = await prisma.guestEntry.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return entries;
  } catch (error) {
    console.error("Error fetching entries:", error);
    return null;
  }
};

export const createOrUpdateEntry = async (content: string) => {
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
