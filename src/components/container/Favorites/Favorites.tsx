// Responsibilities:
// - Read favorites from FavoritesContext
// - Handle "Watch Trailer" logic (fetch detail, open YouTube, handle errors)
// - Delegate all UI/markup to components in `components/ui/favorites`.

import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useFavorites } from '../../context/useFavorites';
import {
  fetchMovieDetail,
  type MovieDetail as MovieDetailType,
} from '../../../lib/api';

import {
  FavoritesSection,
  FavoritesEmptyState,
  FavoritesList,
} from '../../ui/favorites';

// Base URL for poster images.
const IMAGE_BASE_URL =
  import.meta.env.VITE_IMAGE_BASE_URL ?? 'https://image.tmdb.org/t/p/w500';

const Favorites = () => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();

  /* -------------------------- Watch trailer handler ------------------------- */

  const handleWatchTrailer = async (movieId: number) => {
    try {
      const detail: MovieDetailType = await fetchMovieDetail(movieId);
      const videos = detail.videos?.results ?? [];
      const trailer = videos.find(
        (v) => v.type === 'Trailer' && v.site === 'YouTube'
      );

      if (trailer) {
        window.open(
          `https://www.youtube.com/watch?v=${trailer.key}`,
          '_blank',
          'noopener,noreferrer'
        );
      } else {
        toast.error('Trailer not available yet.');
      }
    } catch (err) {
      toast.error('Failed to load trailer.');
      console.error(err);
    }
  };

  /* ------------------------------- Empty state ------------------------------ */

  if (!favorites.length) {
    return (
      <FavoritesSection variant='empty'>
        <FavoritesEmptyState onExploreMovies={() => navigate('/')} />
      </FavoritesSection>
    );
  }

  /* --------------------------------- List state ----------------------------- */

  return (
    <FavoritesSection variant='list'>
      <FavoritesList
        movies={favorites}
        imageBaseUrl={IMAGE_BASE_URL}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
        onWatchTrailer={handleWatchTrailer}
      />
    </FavoritesSection>
  );
};

export default Favorites;