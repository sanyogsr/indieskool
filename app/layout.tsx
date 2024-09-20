import type { Metadata } from "next";
import "../styles/globals.css";
import Provider from "@/components/provider";

import { inter } from "../styles/fonts";
import { cn } from "@/utils/cn";
export const metadata: Metadata = {
  title: "Indieskool",
  description: "An Indie hacker learning platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, inter.variable)}>
      <body>
        <Provider>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
