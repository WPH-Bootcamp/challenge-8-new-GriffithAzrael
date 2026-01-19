// Renders the primary CTA buttons in the hero:
// - "Watch Trailer"
// - "See Detail"
// The container decides when actions are enabled and passes callbacks.

type HeroActionsProps = {
  // Whether a trailer is available for the current movie.
  canWatchTrailer: boolean;
  // Called when "Watch Trailer" is clicked (only if `canWatchTrailer` is true).
  onWatchTrailer: () => void;
  // Called when "See Detail" is clicked.
  onSeeDetail: () => void;
  // Whether the "See Detail" button should be disabled (e.g. no selected movie).
  isSeeDetailDisabled: boolean;
};

export const HeroActions = ({
  canWatchTrailer,
  onWatchTrailer,
  onSeeDetail,
  isSeeDetailDisabled,
}: HeroActionsProps) => {
  const trailerButtonStateClasses = canWatchTrailer
    ? 'cursor-pointer'
    : 'opacity-60 cursor-not-allowed';

  return (
    <div className='movie-buttons flex flex-col sm:flex-row gap-4 font-semibold'>
      {/* Watch Trailer button */}
      <button
        className={`w-full flex justify-center items-center bg-[#961200] p-2 leading-7 rounded-full gap-2 md:w-57.5 ${trailerButtonStateClasses}`}
        onClick={canWatchTrailer ? onWatchTrailer : undefined}
        disabled={!canWatchTrailer}
      >
        Watch Trailer
        <img className='w-4.5 md:w-6' src='/Play.svg' alt='Play icon' />
      </button>

      {/* See Detail button */}
      <button
        className='w-full flex justify-center items-center bg-[#0A0D1299] border border-[#181D27] p-2 leading-7 rounded-full cursor-pointer md:w-57.5'
        onClick={onSeeDetail}
        disabled={isSeeDetailDisabled}
      >
        See Detail
      </button>
    </div>
  );
};