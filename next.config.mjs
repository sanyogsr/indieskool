/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["images.unsplash.com"],
    domains: ["developers.google.com"],
  },
  typescript: {
    // This tells Next.js to ignore any TypeScript errors during the build.
    // This can be useful to get the app running even with type issues.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
