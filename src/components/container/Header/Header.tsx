// Container-level Header component.
// - Owns all state and side effects (scroll behavior, search, mobile menu).
// - Fetches search results via TanStack Query.
// - Wires up UI-only components from `components/ui/header`.

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api, fetchMovieDetail } from '../../../lib/api';
import type {
  TrendingMovie,
  MovieDetail as MovieDetailType,
} from '../../../lib/api';
import { useFavorites } from '../../context/useFavorites';
import { toast } from 'sonner';

import {
  Logo,
  DesktopNav,
  DesktopSearchBar,
  MobileActions,
  MobileMenu,
  SearchOverlay,
} from '../../ui/header';

// Centralized base URL so it can be re-used in multiple components.
const IMAGE_BASE_URL =
  import.meta.env.VITE_IMAGE_BASE_URL ?? 'https://image.tmdb.org/t/p/w500';

const Header = () => {
  // Visual state of the header itself.
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Search state (used by both desktop input and overlay).
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { toggleFavorite, isFavorite } = useFavorites();

  /* ------------------------ Header background on scroll ------------------------ */

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);

    // Set initial value and subscribe to scroll.
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ----------------------------- Debounce search ------------------------------ */

  useEffect(() => {
    // Wait 400ms after the user stops typing before updating debouncedTerm.
    const id = setTimeout(() => setDebouncedTerm(searchTerm.trim()), 400);
    return () => clearTimeout(id);
  }, [searchTerm]);

  /* --------------- Lock body scroll when overlays / menu open ---------------- */

  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen, isSearchOpen]);

  /* -------------------------- UI action handlers ----------------------------- */

  const toggleMobileMenu = () =>
    setIsMobileMenuOpen((prev) => {
      const next = !prev;
      // If opening the menu, close the search overlay.
      if (next) setIsSearchOpen(false);
      return next;
    });

  const openSearch = () => {
    setIsSearchOpen(true);
    setIsMobileMenuOpen(false);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setDebouncedTerm('');
    setIsSearchOpen(false);
  };

  const headerBgClass =
    isMobileMenuOpen || isSearchOpen
      ? 'bg-black'
      : isScrolled
        ? 'bg-black/40 backdrop-blur-2xl'
        : 'bg-transparent';

  /* ------------------------------- Data fetching ------------------------------ */

  const { data: searchResults = [], isLoading: isSearchLoading } = useQuery<
    TrendingMovie[]
  >({
    queryKey: ['search-movies', debouncedTerm],
    // Only run the query when there is a non-empty search term.
    enabled: debouncedTerm.length > 0,
    queryFn: async () => {
      const res = await api.get<{ results: TrendingMovie[] }>('/search/movie', {
        params: {
          query: debouncedTerm,
          language: 'en-US',
          include_adult: false,
        },
      });
      return res.data.results;
    },
  });

  const hasQuery = debouncedTerm.length > 0;
  const noResults = hasQuery && !isSearchLoading && searchResults.length === 0;

  /* -------------------------- Trailer button handler ------------------------- */

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

  /* ------------------- Desktop search field integrations --------------------- */

  const handleDesktopSearchChange = (value: string) => {
    setSearchTerm(value);
    if (value.length > 0) setIsSearchOpen(true);
    else clearSearch();
  };

  const handleDesktopSearchFocus = () => {
    if (searchTerm) setIsSearchOpen(true);
  };

  /* --------------------------------- Render ---------------------------------- */

  return (
    <>
      {/* Fixed header at the top of the viewport */}
      <header
        className={`header-container flex fixed top-0 left-0 right-0 px-4 h-16 justify-between items-center z-50 md:px-35 md:h-22.5 transition-colors duration-300 ${headerBgClass}`}
      >
        <div className='header-left flex gap-20'>
          {/* Logo (also used to clear state when clicked) */}
          <Logo
            onClick={() => {
              setIsMobileMenuOpen(false);
              clearSearch();
            }}
          />

          {/* Desktop navigation links */}
          <DesktopNav clearSearch={clearSearch} />
        </div>

        {/* Desktop search input embedded in the header bar */}
        <DesktopSearchBar
          searchTerm={searchTerm}
          onChange={handleDesktopSearchChange}
          onClear={clearSearch}
          onFocus={handleDesktopSearchFocus}
        />

        {/* Right-side actions (search + hamburger) for mobile */}
        <MobileActions
          isMobileMenuOpen={isMobileMenuOpen}
          onOpenSearch={openSearch}
          onToggleMenu={toggleMobileMenu}
        />
      </header>

      {/* Full-screen mobile-only menu (Home / Favorites) */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Full-screen search overlay (mobile + desktop) */}
      <SearchOverlay
        isOpen={isSearchOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        clearSearch={clearSearch}
        searchResults={searchResults}
        isSearchLoading={isSearchLoading}
        hasQuery={hasQuery}
        noResults={noResults}
        imageBaseUrl={IMAGE_BASE_URL}
        onWatchTrailer={handleWatchTrailer}
        isFavorite={isFavorite}
        // Favorites context expects a "FavoriteMovie", but for this UI we can
        // safely treat the TrendingMovie as compatible, so we cast here.
        toggleFavorite={toggleFavorite as (m: TrendingMovie) => void}
      />
    </>
  );
};

export default Header;
