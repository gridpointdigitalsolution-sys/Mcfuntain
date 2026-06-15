export default function ShopLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero banner skeleton */}
      <div className="skeleton h-64 w-full rounded-none" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filter tabs skeleton */}
        <div className="flex gap-3 mb-10 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="skeleton h-10 rounded-full flex-shrink-0"
              style={{ width: `${80 + Math.random() * 40}px` }}
            />
          ))}
        </div>

        {/* Product grid - 8 cards, 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="skeleton skeleton-image" />
              <div className="skeleton skeleton-text w-3/4 h-4" />
              <div className="skeleton skeleton-text w-1/2 h-4" />
              <div className="skeleton h-10 rounded-lg w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
