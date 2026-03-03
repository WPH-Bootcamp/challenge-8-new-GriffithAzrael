// src/components/context/FavoritesContext.ts
import { createContext } from 'react';
import type { TrendingMovie } from '../../lib/api';

export type FavoriteMovie = TrendingMovie;

export type FavoritesContextValue = {
  favorites: FavoriteMovie[];
  toggleFavorite: (movie: FavoriteMovie) => void;
  isFavorite: (id: number) => boolean;
};

export const FavoritesContext = createContext<
  FavoritesContextValue | undefined
>(undefined);
