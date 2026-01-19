// Responsibilities:
// - Fetch the trending movies list via TanStack Query
// - Manage which movie is currently "selected" (via context)
// - Manage horizontal scroll state (canScrollLeft / canScrollRight)
// - Provide handlers for arrow buttons and card selection
//
// All layout and markup are delegated to UI components in `components/ui/trending`.

import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchTrendingMovies } from '../../../lib/api';
import type { TrendingMovie } from '../../../lib/api';
import { useSelectedMovie } from '../../context/useSelectedMovie';

import {
  TrendingSection,
  TrendingSkeletonRow,
  TrendingErrorMessage,
  TrendingCarousel,
} from '../../ui/trending';

// Base URL for poster images used in trending cards.
const IMAGE_BASE_URL =
  import.meta.env.VITE_IMAGE_BASE_URL ?? 'https://image.tmdb.org/t/p/w500';

const Trending = () => {
  /* ------------------------------- Data fetching ------------------------------ */

  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery<TrendingMovie[]>({
    queryKey: ['trending-movies'],
    queryFn: fetchTrendingMovies,
  });

  /* ----------------------------- Selected movie ------------------------------ */

  const { selectedMovie, setSelectedMovie } = useSelectedMovie();

  // When data loads and nothing is selected yet, default to the first movie.
  useEffect(() => {
    if (movies && movies.length > 0 && !selectedMovie) {
      setSelectedMovie(movies[0]);
    }
  }, [movies, selectedMovie, setSelectedMovie]);

  /* ----------------------------- Scroll management --------------------------- */

  // Ref to the horizontal scroll container (the row of cards).
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  // Ref to the first card (used to measure card width when scrolling by one).
  const firstCardRef = useRef<HTMLDivElement | null>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Helper to update whether the user can scroll left/right.
  const updateScrollState = () => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  // Attach scroll & resize listeners whenever movies change (i.e. when the
  // scrollable content is (re)rendered).
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    updateScrollState();

    const handleScroll = () => updateScrollState();
    const handleResize = () => updateScrollState();

    el.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [movies]);

  // Scroll by exactly one card width (plus the gap between cards).
  const scrollByOneCard = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    const card = firstCardRef.current;
    if (!container || !card) return;

    const cardWidth = card.offsetWidth;
    const gap = 16; // Tailwind gap-4 = 16px
    const delta = direction === 'left' ? -(cardWidth + gap) : cardWidth + gap;

    container.scrollBy({ left: delta, behavior: 'smooth' });
  };

  /* --------------------------------- Render ---------------------------------- */

  return (
    <TrendingSection title='Trending Now'>
      {/* Loading state */}
      {isLoading && <TrendingSkeletonRow />}

      {/* Error state */}
      {isError && <TrendingErrorMessage />}

      {/* Movies list */}
      {movies && movies.length > 0 && (
        <TrendingCarousel
          movies={movies}
          imageBaseUrl={IMAGE_BASE_URL}
          selectedMovieId={selectedMovie?.id}
          onSelectMovie={(movie) => setSelectedMovie(movie)}
          canScrollLeft={canScrollLeft}
          canScrollRight={canScrollRight}
          onScrollLeft={() => scrollByOneCard('left')}
          onScrollRight={() => scrollByOneCard('right')}
          scrollContainerRef={scrollContainerRef}
          firstCardRef={firstCardRef}
        />
      )}
    </TrendingSection>
  );
};

export default Trending;