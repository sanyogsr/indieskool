import React, { useState } from "react";
import Link from "next/link";

// Custom Input component
const Input = ({
  type,
  placeholder,
  value,
  onChange,
  className,
}: {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200 ${className}`}
  />
);

// Custom Button component
const Button = ({
  type,
  children,
  disabled,
  className,
}: {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}) => (
  <button
    type={type}
    disabled={disabled}
    className={`py-2 px-4 rounded-md text-white font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-300 ${className} ${
      disabled ? "bg-gray-400 cursor-not-allowed" : ""
    }`}
  >
    {children}
  </button>
);

function GetLatestUpdate() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setSuccessMessage("");

    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage("Email has been sent successfully!");
      setEmail(""); // Clear the input after success

      // Clear the success message after 2 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000); // 2000 milliseconds = 2 seconds
    }, 2000); // Simulate a 2-second API call
  };

  return (
    <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
      <div className="space-y-3">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#ffd700]">
          Get Latest Update About the Latest Tutorial
        </h2>
        <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-[#87ceeb]">
          Stay updated with new courses and tutorials.
        </p>
      </div>

      <div className="mx-auto w-full max-w-sm space-y-2">
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
          />
          <Button
            type="submit"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:bg-[#ffd700]/90"
            disabled={loading}
          >
            {loading ? "Sending..." : "Join Now"}
          </Button>
        </form>
        {successMessage && (
          <p className="text-green-500 text-sm mt-2">{successMessage}</p>
        )}
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
