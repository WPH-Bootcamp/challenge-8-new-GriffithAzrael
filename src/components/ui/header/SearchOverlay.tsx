// Full-screen search overlay used on both mobile and desktop.
//
// It:
// - on mobile: shows a back arrow + search input at the top
// - on desktop: starts below the header (md:top-22.5)
// - when there are results: shows a scrollable list with the Footer at the end
// - when there are no results: centers the "Data Not Found" block and keeps the Footer visually fixed at the bottom of the viewport.

import { useNavigate } from 'react-router-dom';
import type { TrendingMovie } from '../../../lib/api';
import { SearchResultCard } from './SearchResultCard';
import Footer from '../../container/Footer/Footer';

type SearchOverlayProps = {
  isOpen: boolean;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  clearSearch: () => void;
  searchResults: TrendingMovie[];
  isSearchLoading: boolean;
  hasQuery: boolean;
  noResults: boolean;
  imageBaseUrl: string;
  onWatchTrailer: (movieId: number) => void;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (movie: TrendingMovie) => void;
};

export const SearchOverlay = ({
  isOpen,
  searchTerm,
  setSearchTerm,
  clearSearch,
  searchResults,
  isSearchLoading,
  hasQuery,
  noResults,
  imageBaseUrl,
  onWatchTrailer,
  isFavorite,
  toggleFavorite,
}: SearchOverlayProps) => {
  const navigate = useNavigate();

  // Do not render anything when the overlay is closed.
  if (!isOpen) return null;

  // Convenience flag: "no results" state is only when we are NOT loading.
  const showNoResults = noResults && !isSearchLoading;

  return (
    <div
      className='
        fixed inset-x-0 bottom-0
        top-0 md:top-22.5
        bg-black
        z-50 md:z-40
        flex flex-col
      '
    >
      {/* Mobile search bar row */}
      <div className='md:hidden px-4 pt-4 pb-3 flex items-center gap-3'>
        <button type='button' onClick={clearSearch}>
          <img src='/arrow-back-icon.svg' alt='Back' className='w-6 h-6' />
        </button>
        <div className='flex flex-1 items-center gap-2 rounded-2xl bg-[#0A0D12] border border-[#252B37] px-4 py-2'>
          <img src='/Search-bar-logo.svg' alt='Search' className='w-4' />
          <input
            autoFocus
            className='flex-1 min-w-0 bg-transparent outline-none text-sm placeholder:text-[#717680]'
            placeholder='Search Movie'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type='button'
              onClick={clearSearch}
              className='w-4 flex items-center justify-center cursor-pointer'
            >
              <img src='/Clear-search.svg' alt='Clear search bar' />
            </button>
          )}
        </div>
      </div>

      {/* -------------------- NO RESULTS LAYOUT (fixed footer) -------------------- */}
      {showNoResults ? (
        <>
          {/* Center "Data Not Found" vertically between header and footer */}
          <div className='flex-1 flex items-center justify-center px-4 md:px-35'>
            <div className='flex flex-col items-center justify-center gap-4 text-center'>
              <img
                src='/data-not-found.svg'
                alt='Data not found'
                className='mix-blend-luminosity'
              />
              <p className='text-white font-semibold leading-7.5'>
                Data Not Found
              </p>
              <p className='text-[#A4A7AE] text-sm leading-7'>
                Try other keywords
              </p>
            </div>
          </div>

          {/* Footer anchored visually at the bottom (using normal flow in flex) */}
          <Footer />
        </>
      ) : (
        /* ----------------- RESULTS / LOADING LAYOUT (scrollable) ---------------- */
        <div className='flex-1 overflow-y-auto'>
          <div className='pt-4 md:pt-8 md:px-35 py-4 flex flex-col gap-8 md:gap-12'>
            {/* Loading state */}
            {isSearchLoading && hasQuery && (
              <p className='text-sm md:text-base px-4 md:px-0 text-[#A4A7AE]'>
                Searching movies...
              </p>
            )}

            {/* Results list */}
            {!isSearchLoading && searchResults.length > 0 && (
              <div className='flex flex-col gap-8 md:gap-12'>
                {searchResults.map((movie) => (
                  <SearchResultCard
                    key={movie.id}
                    movie={movie}
                    imageBaseUrl={imageBaseUrl}
                    onWatchTrailer={onWatchTrailer}
                    isFavorite={isFavorite}
                    toggleFavorite={toggleFavorite}
                    onTitleClick={() => {
                      clearSearch();
                      navigate(`/movie/${movie.id}`);
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer at the end of the scrollable results */}
          <Footer />
        </div>
      )}
    </div>
  );
};
