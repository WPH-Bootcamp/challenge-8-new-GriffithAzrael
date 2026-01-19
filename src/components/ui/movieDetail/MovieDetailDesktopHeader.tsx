// Top portion of the detail page for desktop screens (hidden on mobile):
// - Large poster on the left
// - Title + release date
// - "Watch Trailer" button (if available) + favorite button
// - Three larger stat cards: Rating, Genre, Age Limit

type MovieDetailDesktopHeaderProps = {
  title: string;
  posterUrl: string;
  releaseDate?: string;
  rating: string;
  mainGenre: string;
  ageLimit: string;
  trailerUrl?: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

export const MovieDetailDesktopHeader = ({
  title,
  posterUrl,
  releaseDate,
  rating,
  mainGenre,
  ageLimit,
  trailerUrl,
  isFavorite,
  onToggleFavorite,
}: MovieDetailDesktopHeaderProps) => (
  <div className='hidden md:flex flex-col gap-6'>
    {/* TOP ROW: Poster + right-side content */}
    <div className='flex flex-row gap-10 items-start'>
      {/* Poster card */}
      <div className='w-65 h-96 rounded-3xl overflow-hidden bg-[#111] shrink-0'>
        <img src={posterUrl} alt={title} className='w-full h-full object-cover' />
      </div>

      {/* Text + buttons + stats (column) */}
      <div className='flex-1 flex flex-col gap-6'>
        {/* Title + release date */}
        <div className='flex flex-col gap-2'>
          <h1 className='text-[40px] leading-14 font-bold'>{title}</h1>

          {releaseDate && (
            <div className='flex items-center gap-2 text-sm text-[#E4E4E7]'>
              <img src='/Calendar.svg' alt='Release date' className='w-6' />
              <span className='text-base leading-7.5'>{releaseDate}</span>
            </div>
          )}
        </div>

        {/* Buttons row */}
        <div className='flex items-center gap-4'>
          {trailerUrl && (
            <a
              href={trailerUrl}
              target='_blank'
              rel='noreferrer'
              className='flex items-center justify-center p-2 gap-2 w-55 rounded-full bg-[#961200] text-base leading-7.5 font-semibold'
            >
              Watch Trailer
              <img src='/Play.svg' alt='Play trailer' className='w-6' />
            </a>
          )}

          <button
            type='button'
            onClick={onToggleFavorite}
            className='flex items-center justify-center w-11 h-11 rounded-full bg-[#0A0D1299] border border-[#181D27]'
          >
            <img
              src={isFavorite ? '/favorite.svg' : '/not-favorite.svg'}
              alt='Favorite'
              className='w-6 cursor-pointer'
            />
          </button>
        </div>

        {/* Stats cards row (Rating / Genre / Age Limit) */}
        <div className='grid grid-cols-3 gap-6'>
          {/* Rating */}
          <div className='rounded-2xl bg-[#0A0D12] border border-[#181D27] px-6 py-5 flex flex-col justify-between items-center'>
            <img src='/star-details.svg' alt='Rating icon' className='w-8' />
            <p className='text-base leading-7.5 text-[#A4A7AE]'>Rating</p>
            <p className='text-xl leading-8.5 font-semibold text-white'>
              {rating}/10
            </p>
          </div>

          {/* Genre */}
          <div className='rounded-2xl bg-[#0A0D12] border border-[#181D27] px-6 py-5 flex flex-col justify-between items-center'>
            <img src='/Video.svg' alt='Genre icon' className='w-8' />
            <p className='text-base leading-7.5 text-[#A4A7AE]'>Genre</p>
            <p className='text-xl leading-8.5 font-semibold text-white'>
              {mainGenre}
            </p>
          </div>

          {/* Age Limit */}
          <div className='rounded-2xl bg-[#0A0D12] border border-[#181D27] px-6 py-5 flex flex-col justify-between items-center gap-2'>
            <img src='/age-limit.svg' alt='Age limit icon' className='w-8' />
            <p className='text-base leading-7.5 text-[#A4A7AE]'>Age Limit</p>
            <p className='text-xl leading-8.5 font-semibold text-white'>
              {ageLimit}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);