import { create } from 'zustand';

interface MovieState {
    inWatchlist: boolean;
    inCompleted: boolean;
    isLiked: boolean;
}

interface MovieStore {
    movies: { [key: string]: MovieState };
    setMovieState: (id: string, state: Partial<MovieState>) => void;
    initializeMovieState: (id: string, initialState: MovieState) => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
    movies: {},
    setMovieState: (id, state) => set((prevState) => ({
        movies: {
            ...prevState.movies,
            [id]: { ...prevState.movies[id], ...state }
        }
    })),
    initializeMovieState: (id, initialState) => set((prevState) => ({
        movies: {
            ...prevState.movies,
            [id]: initialState
        }
    })),
}));
