export default function FAQLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="skeleton h-48 w-full rounded-none" />

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Heading */}
        <div className="skeleton skeleton-heading w-64 h-10 mb-8 mx-auto" />

        {/* Tab row */}
        <div className="flex gap-3 mb-10 justify-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="skeleton h-10 rounded-full"
              style={{ width: `${70 + Math.random() * 50}px` }}
            />
          ))}
        </div>

        {/* Accordion items */}
        <div className="flex flex-col gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="skeleton rounded-xl h-16"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
