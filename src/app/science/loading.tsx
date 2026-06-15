export default function ScienceLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="skeleton h-72 w-full rounded-none" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Section heading */}
        <div className="flex flex-col items-center mb-12">
          <div className="skeleton skeleton-heading w-72 h-10 mb-4" />
          <div className="skeleton skeleton-text w-96 max-w-full h-4" />
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton skeleton-card rounded-xl" />
          ))}
        </div>

        {/* Second section */}
        <div className="mt-20 flex flex-col items-center">
          <div className="skeleton skeleton-heading w-56 h-8 mb-8" />
          <div className="max-w-3xl w-full flex flex-col gap-4">
            <div className="skeleton skeleton-text w-full h-4" />
            <div className="skeleton skeleton-text w-full h-4" />
            <div className="skeleton skeleton-text w-4/5 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
