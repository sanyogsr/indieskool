"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { signIn, useSession, signOut } from "next-auth/react";

export default function () {
  const [email, setEmail] = useState<null | string>("");
  async function signInWithEmail() {
    const signInResult = await signIn("email", {
      email: email,
      callbackUrl: `${window.location.origin}`,
      redirect: false,
    });
    if (!signInResult) {
      return "error";
    }

    alert("email sent");

    setEmail("");
  }

  const Logout = async () => {
    signOut();
  };

  const { data: session } = useSession();
  return (
    <div className="m-10">
      {session ? (
        <div>
          {session?.user?.email}
          <button
            className="m-4 p-3 bg-black text-white rounded-lg"
            type="submit"
            onClick={Logout}
          >
            Logout
          </button>
        </div>
      ) : (
        <form action={signInWithEmail}>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            name="email"
            type="email"
          />
          <button
            className="m-4 p-3 bg-black text-white rounded-lg"
            type="submit"
          >
            Send Magic Link
          </button>
        </form>
      )}
    </div>
  );
}
