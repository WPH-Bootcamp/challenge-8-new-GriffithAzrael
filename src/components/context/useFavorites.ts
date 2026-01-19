import { useContext } from 'react';
import {
  FavoritesContext,
  type FavoritesContextValue,
} from './FavoritesContext';

export const useFavorites = (): FavoritesContextValue => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return ctx;
};
