// Loading placeholder shown while trending movies are being fetched.

export const TrendingSkeletonRow = () => (
  <div className='mt-4 flex gap-4 overflow-x-hidden'>
    {Array.from({ length: 4 }).map((_, i) => (
      <div
        key={i}
        className='min-w-40 md:min-w-47.5 h-65 md:h-75 rounded-2xl bg-[#151821] animate-pulse'
      />
    ))}
  </div>
);