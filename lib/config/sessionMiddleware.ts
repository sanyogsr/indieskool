import { getSession } from "next-auth/react";
import { NextRequest } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth"; // Ensure this path is correct

export const Session = async (req: NextRequest) => {
  const cookies = req.headers.get("cookie");

  const res = await fetch(`http://localhost:3000/api/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies || "",
    },
  });
  const data = await res.json();
  const user = data.user;
  return user;
};
