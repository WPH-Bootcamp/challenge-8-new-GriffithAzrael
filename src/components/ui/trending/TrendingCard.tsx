// Single trending movie card used inside the horizontal carousel row.
// Responsible only for rendering; selection and scroll logic live in the container component.

import type { RefObject } from 'react';
import type { TrendingMovie } from '../../../lib/api';

type TrendingCardProps = {
  movie: TrendingMovie;
  index: number; // used for the rank badge (1, 2, 3, ...)
  imageBaseUrl: string;
  isActive: boolean;
  onClick: () => void;
  // Ref used by the container to measure a single card's width for scrolling.
  // Typically passed only to the first card.
  cardRef?: RefObject<HTMLDivElement | null>;
};

export const TrendingCard = ({
  movie,
  index,
  imageBaseUrl,
  isActive,
  onClick,
  cardRef,
}: TrendingCardProps) => {
  const title = movie.title || movie.name || 'Untitled';
  const posterUrl = movie.poster_path
    ? `${imageBaseUrl}${movie.poster_path}`
    : '/poster-placeholder.png';

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`relative flex flex-col min-w-43.25 md:min-w-57 overflow-hidden gap-2 cursor-pointer transition-transform duration-200 ${
        isActive ? 'scale-100' : 'md:opacity-80 hover:opacity-100'
      }`}
    >
      {/* Poster + rank badge */}
      <div className='relative'>
        <img
          src={posterUrl}
          alt={title}
          className='w-full h-66.5 md:h-80.25 object-cover rounded-lg'
        />

        {/* Rank badge (1, 2, 3, …) */}
        <div className='absolute top-2 left-2 w-8 h-8 rounded-full bg-[#0A0D12]/60 backdrop-blur-[22.86px] text-sm flex items-center justify-center font-semibold text-white md:text-[18px] md:w-12 md:h-12'>
          {index + 1}
        </div>
      </div>

      {/* Title + rating */}
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
    </div>
  );
};