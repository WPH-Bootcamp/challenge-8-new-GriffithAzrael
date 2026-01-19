// MovieDetail (container component)
// ---------------------------------
// Responsibilities:
// - Read the :id route param and fetch the movie details via TanStack Query
// - Compute derived display values (title, images, dates, rating, etc.)
// - Wire up favorites and trailer logic
// - Compose UI-only components from `components/ui/movieDetail`
//
// All layout/markup is delegated to the UI components; this file focuses
// on data and behavior.

import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import {
  fetchMovieDetail,
  type MovieDetail as MovieDetailType,
} from '../../../lib/api';
import { useFavorites } from '../../context/useFavorites';

import {
  MovieDetailLoading,
  MovieDetailError,
  MovieDetailShell,
  MovieDetailMobileHeader,
  MovieDetailDesktopHeader,
  MovieOverviewSection,
  MovieCastSection,
  type MovieCastMember,
} from '../../ui/movieDetail';

// Base URLs for images.
const BACKDROP_BASE_URL =
  import.meta.env.VITE_BACKDROP_BASE_URL ??
  'https://image.tmdb.org/t/p/original';

const IMAGE_BASE_URL =
  import.meta.env.VITE_IMAGE_BASE_URL ?? 'https://image.tmdb.org/t/p/w500';

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movieId = Number(id);

  const { toggleFavorite, isFavorite } = useFavorites();

  /* ------------------------------ Data fetching ------------------------------ */

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery<MovieDetailType>({
    queryKey: ['movie-detail', movieId],
    queryFn: () => fetchMovieDetail(movieId),
    enabled: !!movieId,
  });

  /* ------------------------------- Load states ------------------------------- */

  if (isLoading) {
    return <MovieDetailLoading />;
  }

  if (isError || !movie) {
    return <MovieDetailError onGoBack={() => navigate(-1)} />;
  }

  /* --------------------------- Derived display data -------------------------- */

  const title = movie.title || movie.name || 'Untitled';
  const favorite = isFavorite(movieId);

  // Backdrop (or poster) for the top hero area.
  const bgPath = movie.backdrop_path || movie.poster_path;
  const bgUrl = bgPath
    ? `${BACKDROP_BASE_URL}${bgPath}`
    : '/movie-preview-image.png';

  // Poster for the detail header card.
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : '/poster-placeholder.png';

  // Formatted release date.
  const releaseDate =
    movie.release_date &&
    new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(new Date(movie.release_date));

  const rating = movie.vote_average?.toFixed(1) ?? '0.0';
  const mainGenre =
    movie.genres && movie.genres.length > 0 ? movie.genres[0].name : 'Unknown';
  const ageLimit = movie.adult ? '18+' : '13';

  // Find YouTube Trailer in the videos list.
  const videos = movie.videos?.results ?? [];
  const trailer = videos.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  );
  const trailerUrl = trailer
    ? `https://www.youtube.com/watch?v=${trailer.key}`
    : undefined;

  // Take up to 5 cast members and map them into the lightweight UI type.
  const rawCast = movie.credits?.cast?.slice(0, 5) ?? [];
  const cast: MovieCastMember[] = rawCast.map((person) => ({
    id: person.id,
    name: person.name,
    character: person.character,
    profile_path: person.profile_path,
  }));

  /* ------------------------------- Handlers ---------------------------------- */

  const handleToggleFavorite = () => {
    toggleFavorite(movie);
  };

  /* --------------------------------- Render ---------------------------------- */

  return (
    <MovieDetailShell title={title} bgUrl={bgUrl}>
      {/* Mobile layout: poster, title, buttons, small stats */}
      <MovieDetailMobileHeader
        title={title}
        posterUrl={posterUrl}
        releaseDate={releaseDate ?? undefined}
        rating={rating}
        mainGenre={mainGenre}
        ageLimit={ageLimit}
        trailerUrl={trailerUrl}
        isFavorite={favorite}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Desktop layout: large poster, text, buttons, large stats */}
      <MovieDetailDesktopHeader
        title={title}
        posterUrl={posterUrl}
        releaseDate={releaseDate ?? undefined}
        rating={rating}
        mainGenre={mainGenre}
        ageLimit={ageLimit}
        trailerUrl={trailerUrl}
        isFavorite={favorite}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Shared overview section */}
      <MovieOverviewSection overview={movie.overview} />

      {/* Shared cast section (if any cast is available) */}
      {cast.length > 0 && (
        <MovieCastSection cast={cast} imageBaseUrl={IMAGE_BASE_URL} />
      )}
    </MovieDetailShell>
  );
};

export default MovieDetail;