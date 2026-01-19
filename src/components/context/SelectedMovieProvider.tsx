import { useState, type ReactNode } from 'react';
import {
  SelectedMovieContext,
  type SelectedMovieContextValue,
} from './SelectedMovieContext';
import type { TrendingMovie } from '../../lib/api';

export const SelectedMovieProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedMovie, setSelectedMovie] = useState<TrendingMovie | null>(
    null
  );

  const value: SelectedMovieContextValue = {
    selectedMovie,
    setSelectedMovie,
  };

  return (
    <SelectedMovieContext.Provider value={value}>
      {children}
    </SelectedMovieContext.Provider>
  );
};
