import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex justify-center  gap-2 sm:flex-row py-6 w-full shrink-0  px-4 md:px-6 border-t ">
      <div>
        {" "}
        <p className="text-xs text-muted-foreground text-[#87ceeb]">
          &copy; 2024 indieskool.xyz Platform. All rights reserved by{" "}
          <span>
            <Link
              href="https://x.com/sanyogsr"
              target="_blank"
              className="text-yellow-400"
            >
              @Sanyogsr
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
}