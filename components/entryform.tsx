"use client";

import { useState } from "react";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { createEntry } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "./ui/textarea";
import Image from "next/image";

const EntryForm = ({ refresh }: { refresh: () => void }) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();

  const handleSign = async (e: any = null) => {
    if (e) e.preventDefault();

    if (!content.trim()) {
      toast("Please write a message before signing the guestbook.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createEntry(content);
      setContent("");
      toast("Your message has been added to the guestbook.");
    } catch (error) {
      console.error("Error adding entry: ", error);
      toast("Failed to add your message. Please try again.");
    } finally {
      setIsSubmitting(false);
      refresh();
    }
  };

  if (!isLoaded) {
    return <Loader2 className="h-4 w-4 animate-spin" />;
  }

  if (!isSignedIn || !user) {
    return (
      <>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Sign In</CardTitle>
            <CardDescription>
              Sign in to leave a message in the guestbook.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex space-x-4">
            <SignInButton mode="modal">
              <Button variant="outline">Sign in</Button>
            </SignInButton>
          </CardContent>
        </Card>
      </>
    );
  }

  return (
    <>
      {/* <div className="mt-4 space-y-4">
      <div className="flex items-center space-x-2">
        <img
          src={user.imageUrl || "/placeholder.svg"}
          alt={user.fullName || "User"}
          className="h-8 w-8 rounded-full"
        />
        <span className="text-sm text-muted-foreground">
          Posting as: {user.fullName || user.username}
        </span>
      </div>
      <div className="flex space-x-2">
        <Input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your message..."
          className="flex-1"
        />
        <Button onClick={handleSign} disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign"}
        </Button>
      </div>
      <SignOutButton>
        <Button variant="outline">Logout</Button>
      </SignOutButton>
    </div> */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Create Message</CardTitle>
          <CardDescription>
            Share your thoughts with me and other visitors.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Image
              src={user.imageUrl}
              width={32}
              height={32}
              alt={user.fullName || "User"}
              className="h-8 w-8 rounded-full"
            />
            <span className="text-sm text-muted-foreground">
              Posting as: {user.fullName || user.username}
            </span>
          </div>
          <form className="space-y-4" onSubmit={handleSign}>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type your message here..."
            />
            <div className="space-x-2 flex items-center">
              <Button
                variant={"outline"}
                type="submit"
                onClick={handleSign}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Sign"
                )}
              </Button>
              <SignOutButton>
                <Button variant="ghost" type="button">
                  Sign out
                </Button>
              </SignOutButton>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
            Your name, avatar & github username (if logged in through github)
            will be shared publicly viewable by any visitor. Please do not spam
            or post offensive content here.
          </p>
        </CardFooter>
      </Card>
    </>
  );
};

export default EntryForm;
