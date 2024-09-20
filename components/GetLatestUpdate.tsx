import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function GetLatestUpdate() {
  return (
    <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
      <div className="space-y-3">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#ffd700]">
          Get Latest update about the latest Tutorial
        </h2>
        <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-[#87ceeb]"></p>
      </div>
      <div className="mx-auto w-full max-w-sm space-y-2">
        <form className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            className="max-w-lg flex-1"
          />
          <Button
            type="submit"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-primary hover:bg-[#ffd700]/90"
          >
            Join Now
          </Button>
        </form>
        <p className="text-xs text-muted-foreground text-[#87ceeb]">
          Sign up to get notified about new courses and community updates.{" "}
          <Link
            href="#"
            className="underline underline-offset-2 text-[#ffd700]"
            prefetch={false}
          >
            Terms &amp; Conditions
          </Link>
        </p>
      </div>
    </div>
  );
}

export default GetLatestUpdate;
