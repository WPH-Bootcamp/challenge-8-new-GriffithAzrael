// src/components/context/FavoritesProvider.tsx
import { useEffect, useState, type ReactNode } from 'react';
import {
  FavoritesContext,
  type FavoritesContextValue,
  type FavoriteMovie,
} from './FavoritesContext';
import { toast } from 'sonner';

const STORAGE_KEY = 'favorites';
const FAVORITE_TOAST_ID = 'favorite-success';

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as FavoriteMovie[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (id: number) => favorites.some((m) => m.id === id);

  const showFavoriteToast = () => {
    toast.custom(
      (t) => (
        <div
          onClick={() => toast.dismiss(t)}
          className='
        fixed left-1/2 md:top-28.5 z-9999
        -translate-x-1/2
        h-13
        w-full max-w-[calc(100%-2rem)]
        rounded-2xl border border-white/10
        bg-black/25 px-6
        backdrop-blur-2xl shadow-none
        flex items-center justify-center gap-3
        text-white text-sm md:text-base font-medium
      '
        >
          <img src='/Check.svg' alt='Added to favs icon' />
          <span>Success Add to Favorites</span>
        </div>
      ),
      {
        id: FAVORITE_TOAST_ID,
        duration: 2000,
      }
    );
  };

  const toggleFavorite = (movie: FavoriteMovie) => {
    setFavorites((prev) => {
      const exists = prev.some((m) => m.id === movie.id);

      if (exists) {
        // remove silently
        return prev.filter((m) => m.id !== movie.id);
      }

      // show success toast when adding
      showFavoriteToast();
      return [...prev, movie];
    });
  };

  const value: FavoritesContextValue = {
    favorites,
    toggleFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
