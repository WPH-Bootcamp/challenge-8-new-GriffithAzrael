// Renders the grid of visible "New Release" movies and,
// when there are more movies available, shows:
// - a bottom gradient overlay
// - a centered "Load More" button.
//
// The parent decides which movies to show (visibleMovies) and when there is more data (hasMore).

import type { TrendingMovie } from '../../../lib/api';
import { NewReleaseCard } from './NewReleaseCard';

type NewReleaseGridWithLoadMoreProps = {
  // Only the movies that should currently be visible (already sliced).
  visibleMovies: TrendingMovie[];
  imageBaseUrl: string;
  selectedMovieId?: number;
  onSelectMovie: (movie: TrendingMovie) => void;

  // "Load more" behavior.
  hasMore: boolean;
  onLoadMore: () => void;
};

export const NewReleaseGridWithLoadMore = ({
  visibleMovies,
  imageBaseUrl,
  selectedMovieId,
  onSelectMovie,
  hasMore,
  onLoadMore,
}: NewReleaseGridWithLoadMoreProps) => (
  <div className='mt-6 md:mt-10 relative'>
    {/* Movies grid */}
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8 md:gap-x-5 md:gap-y-10'>
      {visibleMovies.map((movie) => (
        <NewReleaseCard
          key={movie.id}
          movie={movie}
          imageBaseUrl={imageBaseUrl}
          isActive={selectedMovieId === movie.id}
          onClick={() => onSelectMovie(movie)}
        />
      ))}
    </div>

    {/* Bottom gradient + Load More button (only if more movies exist) */}
    {hasMore && (
      <>
        {/* Gradient overlay to fade out lower rows */}
        <div className='pointer-events-none absolute inset-x-0 bottom-0 h-36 md:h-44 bg-linear-to-t from-black via-black/90 to-transparent z-10' />

        {/* Load More button */}
        <button
          type='button'
          onClick={onLoadMore}
          className='absolute bottom-6 left-1/2 -translate-x-1/2 z-20
                     leading-7 md:leading-7.5 w-50 md:w-57.5 p-2 rounded-full
                     bg-[#0A0D12] border border-[#181D27]
                     text-sm md:text-base font-semibold text-white
                     hover:bg-[#151a24] transition-colors'
        >
          Load More
        </button>
      </>
    )}
  </div>
);