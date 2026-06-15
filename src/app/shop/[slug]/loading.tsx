export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-6 py-12">
      {/* Breadcrumb skeleton */}
      <div className="flex gap-2 mb-8">
        <div className="skeleton skeleton-text w-16 h-4" />
        <div className="skeleton skeleton-text w-4 h-4" />
        <div className="skeleton skeleton-text w-24 h-4" />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left - Image placeholder */}
        <div className="skeleton aspect-square rounded-2xl" />

        {/* Right - Product details */}
        <div className="flex flex-col gap-6 py-4">
          {/* Category badge */}
          <div className="skeleton h-6 w-28 rounded-full" />

          {/* Title */}
          <div className="skeleton skeleton-heading w-4/5 h-10" />

          {/* Rating */}
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="skeleton w-5 h-5 rounded-sm" />
            ))}
            <div className="skeleton skeleton-text w-20 h-5 ml-2" />
          </div>

          {/* Price */}
          <div className="skeleton h-10 w-32 rounded-lg" />

          {/* Description lines */}
          <div className="flex flex-col gap-3">
            <div className="skeleton skeleton-text w-full h-4" />
            <div className="skeleton skeleton-text w-full h-4" />
            <div className="skeleton skeleton-text w-3/4 h-4" />
          </div>

          {/* Quantity + Add to cart */}
          <div className="flex gap-4 mt-4">
            <div className="skeleton h-12 w-32 rounded-lg" />
            <div className="skeleton h-12 flex-1 rounded-lg" />
          </div>

          {/* Benefits list */}
          <div className="flex flex-col gap-2 mt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-2 items-center">
                <div className="skeleton w-5 h-5 rounded-full flex-shrink-0" />
                <div className="skeleton skeleton-text flex-1 h-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
