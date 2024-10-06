import Link from "next/link";

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-6 px-4 md:px-6 lg:gap-10 max-w-7xl mx-auto w-full">
      {/* Title and Video */}
      <div className="space-y-4 flex flex-col items-center w-full">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#ffffff]">
          Demo
        </h2>
        {/* Video */}
        <div className="p-1 bg-white rounded-lg w-full max-w-5xl object-fill aspect-video">
          <div className="w-full h-full">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/LDILgd1XukQ"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-center w-full">
        <Link
          href="/login"
          className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-yellow-400 to-orange-500 px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-[#ffd700]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          View Courses
        </Link>
      </div>
    </div>
  );
}
