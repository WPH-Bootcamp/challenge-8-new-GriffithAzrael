// Top portion of the detail page for mobile devices (md:hidden):
// - Poster + title + release date
// - "Watch Trailer" button (if available)
// - Favorite heart button
// - Three small stat cards: Rating, Genre, Age Limit

type MovieDetailMobileHeaderProps = {
  title: string;
  posterUrl: string;
  releaseDate?: string;
  rating: string;      // e.g. "7.8"
  mainGenre: string;   // e.g. "Action"
  ageLimit: string;    // e.g. "13" or "18+"
  trailerUrl?: string; // full YouTube URL; if missing, trailer button is hidden
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

export const MovieDetailMobileHeader = ({
  title,
  posterUrl,
  releaseDate,
  rating,
  mainGenre,
  ageLimit,
  trailerUrl,
  isFavorite,
  onToggleFavorite,
}: MovieDetailMobileHeaderProps) => (
  <div className='md:hidden flex flex-col gap-6'>
    {/* Poster + title + date */}
    <div className='flex gap-4'>
      <div className='w-29 h-42.75 rounded-3xl overflow-hidden bg-[#111]'>
        <img
          src={posterUrl}
          alt={title}
          className='w-29 h-42.75 object-cover'
        />
      </div>

      <div>
        <div className='flex flex-col gap-1'>
          <h1 className='text-[20px] leading-8.5 font-bold'>{title}</h1>

          {releaseDate && (
            <div className='flex items-center gap-2 text-xs text-[#E4E4E7]'>
              <img src='/Calendar.svg' alt='Release date' className='w-5' />
              <span className='text-sm leading-7'>{releaseDate}</span>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Watch trailer + favorite row */}
    <div className='flex items-center gap-4'>
      {trailerUrl && (
        <a
          href={trailerUrl}
          target='_blank'
          rel='noreferrer'
          className='flex items-center justify-center p-2 gap-2 w-full rounded-full bg-[#961200] text-sm leading-7 font-semibold'
        >
          Watch Trailer
          <img src='/Play.svg' alt='Play trailer' className='w-4.5' />
        </a>
      )}

      <button
        type='button'
        onClick={onToggleFavorite}
        className='flex items-center justify-center w-11 h-11 md:w-13 md:h-13 rounded-full bg-[#0A0D1299] border border-[#181D27] shrink-0'
      >
        <img
          src={isFavorite ? '/favorite.svg' : '/not-favorite.svg'}
          alt='Favorite'
          className='w-6'
        />
      </button>
    </div>

    {/* Stats cards: Rating, Genre, Age Limit */}
    <div className='flex gap-3 h-fit text-center'>
      {/* Rating */}
      <div className='rounded-2xl bg-[#0A0D12] border border-[#181D27] p-4 flex flex-col items-center justify-between w-full'>
        <img src='/star-details.svg' alt='Rating icon' className='w-6' />
        <p className='mt-2 text-xs text-[#A4A7AE] leading-6'>Rating</p>
        <p className='text-lg font-semibold text-white leading-8'>
          {rating}/10
        </p>
      </div>

      {/* Genre */}
      <div className='rounded-2xl bg-[#0A0D12] border border-[#181D27] p-4 flex flex-col items-center justify-between w-full'>
        <img src='/Video.svg' alt='Genre icon' className='w-6' />
        <p className='mt-2 text-xs text-[#A4A7AE] leading-6'>Genre</p>
        <p className='text-lg font-semibold text-white leading-8'>
          {mainGenre}
        </p>
      </div>

      {/* Age Limit */}
      <div className='rounded-2xl bg-[#0A0D12] border border-[#181D27] p-4 flex flex-col items-center justify-between w-full'>
        <img src='/age-limit.svg' alt='Age limit icon' className='w-6' />
        <p className='mt-2 text-xs text-[#A4A7AE] leading-6'>Age Limit</p>
        <p className='text-lg font-semibold text-white leading-8'>
          {ageLimit}
        </p>
      </div>
    </div>
  </div>
);