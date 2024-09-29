"use client";

const topics = [
  "No-Code Development",
  "AI for Startups",
  "Growth Hacking",
  "SaaS Metrics",
  "User Acquisition",
  "Product-Market Fit",
  "Remote Team Management",
  "Bootstrapping vs VC Funding",
  "SEO for Startups",
  "Customer Retention Strategies",
];

export default function TrendingTopics() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Trending Topics</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {topics.map((topic, index) => (
          <div
            key={index}
            className="px-4 py-2 text-sm font-medium bg-white hover:bg-gray-100 text-gray-800 rounded-full shadow-sm transition-all duration-300 cursor-pointer"
          >
            {topic}
          </div>
        ))}
      </div>
    </div>
  );
}
