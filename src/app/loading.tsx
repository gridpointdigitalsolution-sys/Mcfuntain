export default function HomeLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="skeleton h-[70vh] w-full rounded-none" />

      {/* Featured products section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Section heading */}
        <div className="flex flex-col items-center mb-12">
          <div className="skeleton skeleton-heading w-64 h-8 mb-4" />
          <div className="skeleton skeleton-text w-96 max-w-full h-4" />
        </div>

        {/* Product grid - 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton skeleton-card" />
          ))}
        </div>
      </div>

      {/* Second section skeleton */}
      <div className="bg-beige py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-12">
            <div className="skeleton skeleton-heading w-48 h-8 mb-4" />
            <div className="skeleton skeleton-text w-80 max-w-full h-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="skeleton rounded-xl h-48" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
