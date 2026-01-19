// Responsibilities:
// - Fetch the "now playing" (new release) movies via TanStack Query
// - Decide how many items are visible based on viewport (desktop vs mobile)
// - Handle "Load More" behavior
// - Manage the currently selected movie via context
//
// All presentational details (grid, cards, skeletons, buttons) are delegated to UI components in `components/ui/newRelease`.

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { api } from '../../../lib/api';
import type { TrendingMovie } from '../../../lib/api';
import { useSelectedMovie } from '../../context/useSelectedMovie';

import {
  NewReleaseSection,
  NewReleaseSkeletonGrid,
  NewReleaseErrorMessage,
  NewReleaseGridWithLoadMore,
} from '../../ui/newRelease';

// Base URL for poster images.
const IMAGE_BASE_URL =
  import.meta.env.VITE_IMAGE_BASE_URL ?? 'https://image.tmdb.org/t/p/w500';

/* ---------------------- Data fetcher for new releases ---------------------- */
// Fetcher for "recently released" movies (TMDB's now_playing endpoint).
const fetchNewReleaseMovies = async (): Promise<TrendingMovie[]> => {
  const res = await api.get<{ results: TrendingMovie[] }>(
    '/movie/now_playing',
    {
      params: {
        language: 'en-US',
        page: 1,
      },
    }
  );

  return res.data.results;
};

/* -------------------- Helpers for responsive item counts ------------------- */
// Helpers matching Tailwind's md breakpoint (768px).
const isDesktop = () =>
  typeof window !== 'undefined' && window.innerWidth >= 768;

// Initial visible items: desktop = 15 (3 rows), mobile = 8 (4 rows).
const getInitialVisibleCount = () => (isDesktop() ? 15 : 8);

// Items to add per "Load More": 2 additional rows each time.
// desktop: 5 cols * 2 rows = 10, mobile: 2 cols * 2 rows = 4.
const getItemsPerLoad = () => (isDesktop() ? 10 : 4);

const NewRelease = () => {
  const { selectedMovie, setSelectedMovie } = useSelectedMovie();

  // How many items are visible in the grid currently.
  const [visibleCount, setVisibleCount] = useState<number>(
    getInitialVisibleCount
  );

  /* ------------------------------ Data fetching ------------------------------ */

  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery<TrendingMovie[]>({
    queryKey: ['new-release-movies'],
    queryFn: fetchNewReleaseMovies,
  });

  /* ----------------------------- Selected movie ------------------------------ */

  // When first loaded and nothing is selected yet, use the first New Release.
  useEffect(() => {
    if (movies && movies.length > 0 && !selectedMovie) {
      setSelectedMovie(movies[0]);
    }
  }, [movies, selectedMovie, setSelectedMovie]);

  /* ---------------------------- Load more handler --------------------------- */

  const handleLoadMore = () => {
    if (!movies) return;
    const step = getItemsPerLoad();
    setVisibleCount((prev) => Math.min(prev + step, movies.length));
  };

  // Only render a slice of the full movie list according to visibleCount.
  const visibleMovies = movies?.slice(0, visibleCount) ?? [];
  const hasMore = !!movies && visibleCount < movies.length;

  /* --------------------------------- Render ---------------------------------- */

  return (
    <NewReleaseSection title='New Release'>
      {/* Loading state */}
      {isLoading && (
        <NewReleaseSkeletonGrid itemCount={getInitialVisibleCount()} />
      )}

      {/* Error state */}
      {isError && <NewReleaseErrorMessage />}

      {/* Movies grid + gradient + Load More button */}
      {movies && movies.length > 0 && (
        <NewReleaseGridWithLoadMore
          visibleMovies={visibleMovies}
          imageBaseUrl={IMAGE_BASE_URL}
          selectedMovieId={selectedMovie?.id}
          onSelectMovie={(movie) => setSelectedMovie(movie)}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
        />
      )}
    </NewReleaseSection>
  );
};

export default NewRelease;