export default function AboutLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="skeleton h-80 w-full rounded-none" />

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Heading */}
        <div className="skeleton skeleton-heading w-64 h-10 mb-8 mx-auto" />

        {/* Text blocks */}
        <div className="flex flex-col gap-4 mb-12">
          <div className="skeleton skeleton-text w-full h-4" />
          <div className="skeleton skeleton-text w-full h-4" />
          <div className="skeleton skeleton-text w-5/6 h-4" />
          <div className="skeleton skeleton-text w-full h-4" />
          <div className="skeleton skeleton-text w-3/4 h-4" />
        </div>

        {/* Image placeholder */}
        <div className="skeleton aspect-video rounded-2xl mb-12" />

        {/* More text */}
        <div className="flex flex-col gap-4">
          <div className="skeleton skeleton-heading w-48 h-8 mb-4" />
          <div className="skeleton skeleton-text w-full h-4" />
          <div className="skeleton skeleton-text w-full h-4" />
          <div className="skeleton skeleton-text w-2/3 h-4" />
        </div>
      </div>
    </div>
  );
}
