import { CheckIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function Pricing() {
  return (
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <div className="inline-block rounded-lg bg-[#212121] px-3 py-1 text-sm text-[#ffd700]">
            Pricing
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#87ceeb]">
            All You need is an Perseverence{" "}
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-[#ffd700]">
          Choose Plan Wisely....
          </p>
        </div>
      </div>
      <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
        <Card className="bg-[#212121] border-[#ffd700] border ">
          <CardHeader className="pb-3">
            <CardTitle className="text-[#87ceeb]">Starter</CardTitle>
            <CardDescription className="text-[#ffd700]">
              $9/month
            </CardDescription>
          </CardHeader>
          <CardContent className="text-[#ffd700]">
            <ul className="space-y-2">
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-[#ffd700]" />
                Access to all video tutorials
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-[#ffd700]" />
                Basic coding challenges
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-[#ffd700]" />
                Community forums
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-primary hover:bg-[#ffd700]/90">
              Get Started
            </Button>
          </CardFooter>
        </Card>
        <Card className="bg-[#212121] border-[#ffd700] border">
          <CardHeader className="pb-3">
            <CardTitle className="text-[#87ceeb]">Pro</CardTitle>
            <CardDescription className="text-[#ffd700]">
              $19/month
            </CardDescription>
          </CardHeader>
          <CardContent className="text-[#ffd700]">
            <ul className="space-y-2">
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-[#ffd700]" />
                Access to all video tutorials
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-[#ffd700]" />
                Advanced coding challenges
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-[#ffd700]" />
                Community forums
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4 text-[#ffd700]" />
                Industry mentorship
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-primary hover:bg-[#ffd700]/90">
              Get Started
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
