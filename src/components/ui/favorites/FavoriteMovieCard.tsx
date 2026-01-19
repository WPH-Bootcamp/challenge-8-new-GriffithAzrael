// Single card used in the Favorites list for each saved movie.
// Purely presentational: it receives the movie data, whether it is favorited, and callbacks for "Watch Trailer" and "Toggle Favorite".

import type { FavoriteMovie } from '../../context/FavoritesContext';

type FavoriteMovieCardProps = {
  movie: FavoriteMovie;
  imageBaseUrl: string;
  isFavorite: boolean;
  onWatchTrailer: () => void;
  onToggleFavorite: () => void;
};

export const FavoriteMovieCard = ({
  movie,
  imageBaseUrl,
  isFavorite,
  onWatchTrailer,
  onToggleFavorite,
}: FavoriteMovieCardProps) => {
  const title = movie.title || movie.name || 'Untitled';
  const posterUrl = movie.poster_path
    ? `${imageBaseUrl}${movie.poster_path}`
    : '/poster-placeholder.png';

  // Full overview text (will be visually truncated with CSS line clamp).
  const overview = movie.overview || '';

  return (
    <article className='flex flex-col md:flex-row gap-6 items-start border-b border-[#181D27] pb-8 md:pb-12 last:border-b-0'>
      {/* LEFT: poster + text column */}
      <div className='flex flex-row gap-4 md:gap-6 flex-1 w-full'>
        {/* Poster image */}
        <img
          src={posterUrl}
          alt={title}
          className='w-28 h-40 md:w-45.5 md:h-67.5 rounded-2xl object-cover'
        />

        {/* Title, rating, and overview */}
        <div className='flex-1 flex flex-col gap-3 md:gap-6'>
          <div className='flex flex-col gap-1 md:gap-3'>
            <h2 className='text-base md:text-2xl font-semibold leading-7.5 md:leading-9'>
              {title}
            </h2>

            <div className='flex items-center gap-1 text-sm leading-7 md:text-lg md:leading-8'>
              <img
                src='/Star.svg'
                alt='rating'
                className='w-4.5 h-4.5 md:w-6 md:h-6'
              />
              <span className='text-[#FDFDFD]'>
                {movie.vote_average.toFixed(1)}/10
              </span>
            </div>

            {overview && (
              <p
                className='text-sm leading-7 md:text-base md:leading-7.5 text-[#A4A7AE]'
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {overview}
              </p>
            )}
          </div>

          {/* Desktop Watch Trailer button (inside text column) */}
          <div className='hidden md:flex items-center gap-4'>
            <button
              type='button'
              onClick={onWatchTrailer}
              className='flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-[#961200] leading-7.5 text-base md:w-50 md:h-13 font-semibold cursor-pointer'
            >
              Watch Trailer
              <img src='/Play.svg' alt='Play' className='w-6' />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop favorite heart on far right */}
      <button
        type='button'
        onClick={onToggleFavorite}
        className='hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-[#0A0D1299] border border-[#181D27] cursor-pointer'
      >
        <img
          src={isFavorite ? '/favorite.svg' : '/not-favorite.svg'}
          alt='Favorite'
          className='w-6'
        />
      </button>

      {/* Mobile row: Watch Trailer + Favorite heart below the card */}
      <div className='flex md:hidden items-center justify-between gap-4 w-full'>
        <button
          type='button'
          onClick={onWatchTrailer}
          className='flex-1 flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-[#961200] leading-7 text-sm font-semibold'
        >
          Watch Trailer
          <img src='/Play.svg' alt='Play' className='w-4.5' />
        </button>

        <button
          type='button'
          onClick={onToggleFavorite}
          className='flex items-center justify-center w-11 h-11 rounded-full bg-[#0A0D1299] border border-[#181D27]'
        >
          <img
            src={isFavorite ? '/favorite.svg' : '/not-favorite.svg'}
            alt='Favorite'
            className='w-4.75'
          />
        </button>
      </div>
    </article>
  );
};