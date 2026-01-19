// This file is responsible for:
// - Reading the current "selected movie" from context
// - Computing derived display data (title, description, background URL)
// - Fetching full movie details to find the YouTube trailer
// - Wiring up UI-only components from `components/ui/hero`
//
// All layout/markup is handled by the Hero UI components; this file focuses
// on data and behavior.

import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useSelectedMovie } from '../../context/useSelectedMovie';
import {
  fetchMovieDetail,
  type MovieDetail as MovieDetailType,
} from '../../../lib/api';

import { HeroShell, HeroText, HeroActions } from '../../ui/hero';

// Base URL for hero background images (backdrops/posters).
const BACKDROP_BASE_URL =
  import.meta.env.VITE_BACKDROP_BASE_URL ??
  'https://image.tmdb.org/t/p/original';

// Max number of characters allowed in the hero description to keep it compact.
const HERO_DESC_MAX_CHARS = 220;

const Hero = () => {
  const { selectedMovie } = useSelectedMovie();
  const navigate = useNavigate();

  /* --------------------------- Derived display data -------------------------- */

  // Title preference: title → name → fallback text.
  const title = selectedMovie?.title || selectedMovie?.name || 'The Gorge';

  // Full description with a fallback for when overview is missing.
  const fullDescription =
    selectedMovie?.overview ||
    'Two highly trained operatives grow close from a distance after being sent to guard opposite sides of a mysterious gorge. When an evil below emerges, they must work together to survive what lies within.';

  // Truncate the description so it stays within a few lines in the hero.
  const description =
    fullDescription.length > HERO_DESC_MAX_CHARS
      ? fullDescription.slice(0, HERO_DESC_MAX_CHARS).trimEnd() + '…'
      : fullDescription;

  // Choose backdrop if available, otherwise fall back to poster or static image.
  const bgPath = selectedMovie?.backdrop_path || selectedMovie?.poster_path;
  const backgroundUrl = bgPath
    ? `${BACKDROP_BASE_URL}${bgPath}`
    : '/movie-preview-image.png';

  // Navigate to the movie detail page.
  const handleSeeDetail = () => {
    if (!selectedMovie) return;
    navigate(`/movie/${selectedMovie.id}`);
  };

  /* ---------------- Fetch full movie details to get trailer ------------------ */

  const movieId = selectedMovie?.id;

  const { data: movieDetail } = useQuery<MovieDetailType>({
    queryKey: ['movie-detail', movieId],
    queryFn: () => fetchMovieDetail(movieId!),
    // Only fetch when we actually have a movie ID.
    enabled: !!movieId,
  });

  // Extract the first YouTube "Trailer" video from the movie details.
  const videos = movieDetail?.videos?.results ?? [];
  const trailer = videos.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  );
  const canWatchTrailer = !!trailer;

  const handleWatchTrailer = () => {
    if (!trailer) return;
    window.open(
      `https://www.youtube.com/watch?v=${trailer.key}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  /* --------------------------------- Render ---------------------------------- */

  return (
    <HeroShell title={title} backgroundUrl={backgroundUrl}>
      {/* Title + short description */}
      <HeroText title={title} description={description} />

      {/* CTA buttons (watch trailer + see detail) */}
      <HeroActions
        canWatchTrailer={canWatchTrailer}
        onWatchTrailer={handleWatchTrailer}
        onSeeDetail={handleSeeDetail}
        isSeeDetailDisabled={!selectedMovie}
      />
    </HeroShell>
  );
};

export default Hero;