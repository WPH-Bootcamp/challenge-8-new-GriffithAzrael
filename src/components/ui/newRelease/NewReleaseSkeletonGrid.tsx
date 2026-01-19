// Loading placeholder grid shown while "New Release" movies are being fetched.
// The parent decides how many skeleton items to display.

type NewReleaseSkeletonGridProps = {
  itemCount: number;
};

export const NewReleaseSkeletonGrid = ({
  itemCount,
}: NewReleaseSkeletonGridProps) => (
  <div className='mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-6'>
    {Array.from({ length: itemCount }).map((_, i) => (
      <div
        key={i}
        className='h-64 md:h-72 rounded-2xl bg-[#151821] animate-pulse'
      />
    ))}
  </div>
);