import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_READ_ACCESS_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface TrendingMovie {
  id: number;
  title?: string;
  name?: string;
  overview?: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  vote_average: number;
}

export interface MovieVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface CastMember {
  id: number;
  name: string;
  character?: string;
  profile_path: string | null;
}

export interface MovieDetail extends TrendingMovie {
  release_date?: string;
  genres?: { id: number; name: string }[];
  adult?: boolean;
  videos?: { results: MovieVideo[] };
  credits?: { cast: CastMember[] };
}

export const fetchTrendingMovies = async (): Promise<TrendingMovie[]> => {
  const res = await api.get<{ results: TrendingMovie[] }>(
    '/trending/movie/week',
    { params: { language: 'en-US' } }
  );
  return res.data.results;
};

// GET /movie/:id with videos + credits
export const fetchMovieDetail = async (
  movieId: number
): Promise<MovieDetail> => {
  const res = await api.get<MovieDetail>(`/movie/${movieId}`, {
    params: {
      language: 'en-US',
      append_to_response: 'videos,credits',
    },
  });
  return res.data;
};