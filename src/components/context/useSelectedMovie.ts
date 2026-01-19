import { useContext } from 'react';
import {
  SelectedMovieContext,
  type SelectedMovieContextValue,
} from './SelectedMovieContext';

export function useSelectedMovie(): SelectedMovieContextValue {
  const ctx = useContext(SelectedMovieContext);
  if (!ctx) {
    throw new Error(
      'useSelectedMovie must be used within a SelectedMovieProvider'
    );
  }
  return ctx;
}
