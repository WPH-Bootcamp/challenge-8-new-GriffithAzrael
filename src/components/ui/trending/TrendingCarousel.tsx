// Horizontal scrollable row of trending movies with:
// - gradient overlays on left/right edges
// - arrow buttons to scroll by one card at a time
// - list of <TrendingCard /> items
//
// The container component owns all scroll state (canScrollLeft/Right) and behavior; this component is purely presentational + event wiring.

import type { MutableRefObject } from 'react';
import type { TrendingMovie } from '../../../lib/api';
import { TrendingCard } from './TrendingCard';

type TrendingCarouselProps = {
  movies: TrendingMovie[];
  imageBaseUrl: string;
  selectedMovieId?: number;
  onSelectMovie: (movie: TrendingMovie) => void;

  // Scroll state computed by the container.
  canScrollLeft: boolean;
  canScrollRight: boolean;

  // Called when left/right arrow buttons are clicked.
  onScrollLeft: () => void;
  onScrollRight: () => void;

  // Refs used for measuring scroll and card width.
  scrollContainerRef: MutableRefObject<HTMLDivElement | null>;
  firstCardRef: MutableRefObject<HTMLDivElement | null>;
};

export const TrendingCarousel = ({
  movies,
  imageBaseUrl,
  selectedMovieId,
  onSelectMovie,
  canScrollLeft,
  canScrollRight,
  onScrollLeft,
  onScrollRight,
  scrollContainerRef,
  firstCardRef,
}: TrendingCarouselProps) => (
  <div className='mt-6 md:mt-10 relative'>
    {/* LEFT gradient overlay */}
    {canScrollLeft && (
      <div className='pointer-events-none absolute left-0 top-0 bottom-0 w-10 md:w-24 bg-linear-to-r from-black to-transparent z-10' />
    )}

    {/* RIGHT gradient overlay */}
    {canScrollRight && (
      <div className='pointer-events-none absolute right-0 top-0 bottom-0 w-10 md:w-24 bg-linear-to-l from-black to-transparent z-10' />
    )}

    {/* LEFT arrow button */}
    {canScrollLeft && (
      <button
        type='button'
        onClick={onScrollLeft}
        className='absolute left-1 md:left-3 top-1/2 -translate-y-full z-20 flex items-center justify-center w-11 h-11 md:w-14 md:h-14 rounded-full bg-black/70 text-white cursor-pointer'
      >
        <img className='w-5.5 md:w-7' src='/Arrow-left.svg' alt='Left button' />
      </button>
    )}

    {/* RIGHT arrow button */}
    {canScrollRight && (
      <button
        type='button'
        onClick={onScrollRight}
        className='absolute right-1 md:right-3 top-1/2 -translate-y-full z-20 flex items-center justify-center w-11 h-11 md:w-14 md:h-14 rounded-full bg-black/70 text-white cursor-pointer'
      >
        <img
          className='w-5.5 md:w-7'
          src='/Arrow-right.svg'
          alt='Right button'
        />
      </button>
    )}

    {/* Scrollable row of cards */}
    <div
      ref={scrollContainerRef}
      className='flex gap-4 overflow-x-auto no-scrollbar md:gap-5'
    >
      {movies.map((movie, index) => (
        <TrendingCard
          key={movie.id}
          movie={movie}
          index={index}
          imageBaseUrl={imageBaseUrl}
          isActive={selectedMovieId === movie.id}
          onClick={() => onSelectMovie(movie)}
          // Only the first card gets a ref, used to compute scroll distance.
          cardRef={index === 0 ? firstCardRef : undefined}
        />
      ))}
    </div>
  </div>
);
