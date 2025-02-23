import Guestbook from "@/components/guestbook";
import { Toaster } from "@/components/ui/sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ThemeToggle from "@/components/theme-toggle";

export default async function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      <Card className="w-full border-0">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Guestbook</CardTitle>
          <CardDescription className="max-w-2xl">
            A simple, minimal and functional guestbook made with Next.js, Clerk,
            Prisma and Perspective API. Feel free to leave a message below and
            implement it into your portfolio, too!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ThemeToggle />
          <Guestbook />
        </CardContent>
      </Card>
    </div>
  );
}
