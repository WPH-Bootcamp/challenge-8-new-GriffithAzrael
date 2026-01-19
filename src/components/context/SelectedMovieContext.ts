import { createContext } from 'react';
import type { TrendingMovie } from '../../lib/api';

export type SelectedMovieContextValue = {
  selectedMovie: TrendingMovie | null;
  setSelectedMovie: (movie: TrendingMovie | null) => void;
};

export const SelectedMovieContext = createContext<
  SelectedMovieContextValue | undefined
>(undefined);
