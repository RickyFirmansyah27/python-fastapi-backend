export interface Movie {
  id: string;
  title: string;
  genre: string[];
  posterUrl: string;
  description: string;
  duration: string;
  rating: number;
  trailerUrl: string;
  year: number;
  name?: string;
  language?: string;
}

export interface SearchFilters {
  genre?: string;
  minRating?: number;
}

export interface MovieResponse {
  data: Movie[];
  total: number;
  page: number;
  size: number;
}