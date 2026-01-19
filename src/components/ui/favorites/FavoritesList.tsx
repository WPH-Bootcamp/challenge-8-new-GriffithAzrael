// Renders the vertical list of favorite movie cards.
// Mapping logic lives here so the container can stay very small and focused on data + behavior.

import type { FavoriteMovie } from '../../context/FavoritesContext';
import { FavoriteMovieCard } from './FavoriteMovieCard';

type FavoritesListProps = {
  movies: FavoriteMovie[];
  imageBaseUrl: string;
  // Function to check if a given movie is currently favorited.
  isFavorite: (id: number) => boolean;
  // Toggle favorite for a given movie.
  onToggleFavorite: (movie: FavoriteMovie) => void;
  // Watch trailer for a given movie.
  onWatchTrailer: (movieId: number) => void;
};

export const FavoritesList = ({
  movies,
  imageBaseUrl,
  isFavorite,
  onToggleFavorite,
  onWatchTrailer,
}: FavoritesListProps) => (
  <div className='mt-8 md:mt-12 flex flex-col gap-8 md:gap-12'>
    {movies.map((movie) => (
      <FavoriteMovieCard
        key={movie.id}
        movie={movie}
        imageBaseUrl={imageBaseUrl}
        isFavorite={isFavorite(movie.id)}
        onToggleFavorite={() => onToggleFavorite(movie)}
        onWatchTrailer={() => onWatchTrailer(movie.id)}
      />
    ))}
  </div>
);