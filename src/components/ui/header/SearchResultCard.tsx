// Card used in the search overlay for each result.
// This is purely presentational: actions (watch trailer, toggle favorite,
// navigate to detail) are passed down from the parent.

import type { TrendingMovie } from '../../../lib/api';

type SearchResultCardProps = {
  movie: TrendingMovie;
  // Base URL used to build the poster image URL.
  imageBaseUrl: string;
  // Called when the user clicks "Watch Trailer".
  onWatchTrailer: (movieId: number) => void;
  // Whether this movie is currently in favorites.
  isFavorite: (id: number) => boolean;
  // Toggle favorite for this movie.
  toggleFavorite: (movie: TrendingMovie) => void;
  // Called when the user clicks the title (typically navigate to detail page).
  onTitleClick: () => void;
};

export const SearchResultCard = ({
  movie,
  imageBaseUrl,
  onWatchTrailer,
  isFavorite,
  toggleFavorite,
  onTitleClick,
}: SearchResultCardProps) => {
  const title = movie.title || movie.name || 'Untitled';
  const posterUrl = movie.poster_path
    ? `${imageBaseUrl}${movie.poster_path}`
    : '/poster-placeholder.png';
  const overview = movie.overview || '';
  const favorite = isFavorite(movie.id);

  return (
    <article className='flex flex-col md:flex-row gap-6 items-start rounded-3xl border-b border-[#181D27] pb-8 md:pb-12 last:border-b-0 hover:bg-[#151821] transition-colors px-4 md:px-0'>
      {/* Left: poster + text column */}
      <div className='flex flex-row gap-4 md:gap-6 flex-1 w-full'>
        <img
          src={posterUrl}
          alt={title}
          className='w-28 h-40 md:w-45.5 md:h-67.5 rounded-2xl object-cover'
        />

        <div className='flex-1 flex flex-col gap-3 md:gap-6'>
          <div className='flex flex-col gap-1 md:gap-3'>
            {/* Title – clickable to navigate to the detail page */}
            <h3
              className='text-base md:text-2xl font-semibold leading-7.5 md:leading-9 text-white cursor-pointer'
              onClick={onTitleClick}
            >
              {title}
            </h3>

            {/* Rating row */}
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

            {/* Short overview – truncated to two lines with CSS line clamp */}
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

          {/* Desktop “Watch Trailer” button */}
          <div className='hidden md:flex items-center gap-4'>
            <button
              type='button'
              onClick={() => onWatchTrailer(movie.id)}
              className='flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-[#961200] leading-7.5 text-base md:w-50 md:h-13 font-semibold cursor-pointer'
            >
              Watch Trailer
              <img src='/Play.svg' alt='Play' className='w-6' />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop favorite heart on the far right */}
      <button
        type='button'
        onClick={() => toggleFavorite(movie)}
        className='hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-[#0A0D1299] border border-[#181D27]'
      >
        <img
          src={favorite ? '/favorite.svg' : '/not-favorite.svg'}
          alt='Favorite'
          className='w-6'
        />
      </button>

      {/* Mobile: Watch Trailer + favorite heart in a single row */}
      <div className='flex md:hidden items-center justify-between gap-4 w-full'>
        <button
          type='button'
          onClick={() => onWatchTrailer(movie.id)}
          className='flex-1 flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-[#961200] leading-7 text-sm font-semibold'
        >
          Watch Trailer
          <img src='/Play.svg' alt='Play' className='w-4.5' />
        </button>

        <button
          type='button'
          onClick={() => toggleFavorite(movie)}
          className='flex items-center justify-center w-11 h-11 rounded-full bg-[#0A0D1299] border border-[#181D27]'
        >
          <img
            src={favorite ? '/favorite.svg' : '/not-favorite.svg'}
            alt='Favorite'
            className='w-4.75'
          />
        </button>
      </div>
    </article>
  );
};