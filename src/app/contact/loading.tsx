export default function ContactLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="skeleton h-48 w-full rounded-none" />

      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Heading */}
        <div className="skeleton skeleton-heading w-56 h-10 mb-4 mx-auto" />
        <div className="skeleton skeleton-text w-80 max-w-full h-4 mb-12 mx-auto" />

        {/* Form fields */}
        <div className="flex flex-col gap-6">
          {/* Name row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="skeleton skeleton-text w-20 h-4 mb-2" />
              <div className="skeleton h-12 rounded-lg w-full" />
            </div>
            <div>
              <div className="skeleton skeleton-text w-20 h-4 mb-2" />
              <div className="skeleton h-12 rounded-lg w-full" />
            </div>
          </div>

          {/* Email */}
          <div>
            <div className="skeleton skeleton-text w-16 h-4 mb-2" />
            <div className="skeleton h-12 rounded-lg w-full" />
          </div>

          {/* Subject */}
          <div>
            <div className="skeleton skeleton-text w-20 h-4 mb-2" />
            <div className="skeleton h-12 rounded-lg w-full" />
          </div>

          {/* Message */}
          <div>
            <div className="skeleton skeleton-text w-20 h-4 mb-2" />
            <div className="skeleton h-40 rounded-lg w-full" />
          </div>

          {/* Submit button */}
          <div className="skeleton h-12 w-40 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
