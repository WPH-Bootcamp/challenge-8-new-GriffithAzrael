// Shown when the user has no favorite movies.
// The parent section provides the title; this component renders the illustration, text, and "Explore Movie" button.

type FavoritesEmptyStateProps = {
  onExploreMovies: () => void;
};

export const FavoritesEmptyState = ({
  onExploreMovies,
}: FavoritesEmptyStateProps) => (
  <div className='flex-1 flex flex-col items-center justify-center gap-6 text-center'>
    <div className='flex flex-col gap-4 items-center'>
      <img
        src='/favorite-list-empty.svg'
        alt='Favorites list empty'
        className='opacity-90 mix-blend-luminosity'
      />

      <div className='flex flex-col gap-2'>
        <p className='text-base font-semibold leading-7.5 text-white'>
          Data Empty
        </p>
        <p className='text-sm leading-7 text-[#A4A7AE]'>
          You don't have a favorite movie yet
        </p>
      </div>
    </div>

    <button
      type='button'
      onClick={onExploreMovies}
      className='px-8 md:px-10 py-2 md:py-2.75 rounded-full bg-[#961200] text-sm leading-7 md:text-base md:leading-7.5 md:w-75 font-semibold cursor-pointer'
    >
      Explore Movie
    </button>
  </div>
);