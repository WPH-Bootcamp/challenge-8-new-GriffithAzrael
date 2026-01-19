// Single movie card used in the "New Release" grid.
// Purely presentational: the parent manages which card is active and what happens when it is clicked.

import type { TrendingMovie } from '../../../lib/api';

type NewReleaseCardProps = {
  movie: TrendingMovie;
  imageBaseUrl: string;
  isActive: boolean;
  onClick: () => void;
};

export const NewReleaseCard = ({
  movie,
  imageBaseUrl,
  isActive,
  onClick,
}: NewReleaseCardProps) => {
  const title = movie.title || movie.name || 'Untitled';
  const posterUrl = movie.poster_path
    ? `${imageBaseUrl}${movie.poster_path}`
    : '/poster-placeholder.png';

  return (
    <article
      onClick={onClick}
      className={`
        flex flex-col gap-2 cursor-pointer group
        ${isActive ? 'opacity-100' : 'opacity-90 hover:opacity-100'}
      `}
    >
      {/* Poster with active ring highlight */}
      <div
        className={`
          relative overflow-hidden rounded-lg
          shadow-[0_18px_40px_rgba(0,0,0,0.6)]
          ${isActive ? 'ring-2 ring-[#961200]' : ''}
        `}
      >
        <img
          src={posterUrl}
          alt={title}
          className='w-full h-66.5 md:h-80.25 object-cover transition-transform duration-200 group-hover:scale-105'
        />
      </div>

      {/* Title and rating */}
      <div className='title-and-rating md:gap-0.5'>
        <h3 className='text-sm md:text-base font-semibold text-white truncate leading-7.5 md:leading-8'>
          {title}
        </h3>
        <div className='flex items-center gap-1 text-xs md:text-sm'>
          <img
            src='/Star.svg'
            alt='rating'
            className='w-3.5 h-3.5 md:w-5 md:h-5'
          />
          <span className='movie-rating text-[#A4A7AE] text-sm leading-7 md:text-base md:leading-7.5'>
            {movie.vote_average.toFixed(1)}/10
          </span>
        </div>
      </div>
    </article>
  );
};