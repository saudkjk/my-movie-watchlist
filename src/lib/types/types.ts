export type DisplayInfiniteMoviesProps = {
  movies: Movie[];
  fetchMoviesWithDbStatus: (
    genre: string,
    userId: string,
    sortBy: string,
    page: number,
  ) => Promise<Movie[]>;
  param: string;
  userId: string;
  sortBy: string;
  username: string;
};

export type MovieList = {
  id: string;
  name: string;
  isPublic: boolean;
  userId: string;
  username: string;
  listItems: ListItem[];
  likes: Like[];
  comments: Comment[];
};

export type MovieListCardProps = {
  movieList: MovieList;
};

export type Movie = {
  id: number;
  title: string;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
  runtime?: number;
  vote_average: number;
  poster_path?: string;
  backdrop_path?: string;
  backdrop?: string;
  overview: string;
  release_date: string;
  isLiked: boolean | null;
  inWatchlist: boolean | null;
  inCompleted: boolean | null;
  inCustomLists: string[];
};

export type WatchlistButtonProps = {
  userId: string;
  movie: Movie;
  className?: string;
  inWatchlistButton: React.ReactNode;
  notInWatchlistButton: React.ReactNode;
};

export type MovieCardProps = {
  userId?: string;
  movie: Movie;
  index?: number;
  username: string;
};

export type ImageHoverProps = {
  imageURL: string;
  children: React.ReactNode | string;
  childrenClassName?: string;
  className?: string;
  isLCP: boolean;
  responsiveCard: boolean;
};

export type Like = {
  id: string;
  userId: string;
  listId: string;
  createdAt: Date;
};

export type Comment = {
  id: string;
  content: string;
  userId: string;
  username: string;
  listId: string;
  createdAt: Date;
};

export type ListItem = {
  id: string;
  listId: string;
  movieId: string;
  moviePoster: string;
  addedAt: Date;
};

export type DisplayMoviesProps = {
  movies: Movie[];
  userId: string;
  username: string;
};

export type ListWithInfo = {
  id: string;
  name: string;
  username: string;
  isPublic: boolean;
  userId: string;
  listItems: ListItem[];
  likes: Like[];
  comments: Comment[];
};

export type DisplayMovieListsProps = {
  movieLists: ListWithInfo[];
};

export type User = {
  username: string | null;
  imageUrl: string;
  id: string;
};

export type CommentsProps = {
  comments: Comment[];
  userId: string;
};

export type CompletedListButtonWrapperProps = {
  userId: string;
  movie: Movie;
  className?: string;
  triggerButton: React.ReactNode;
  dislikedButton: React.ReactNode;
  likedButton: React.ReactNode;
};

export type CompletedButtonProps = {
  userId: string;
  movie: Movie;
};

export type CommentFormProps = {
  username: string;
  listid: string;
  userId: string;
};

export type ChangeVisibilitySwitchProps = {
  userId: string;
  watchListVisibility: boolean;
};

export type NavbarItemProps = {
  title: string;
  href: string;
  children?: React.ReactNode;
};

export type Genre = {
  id: number;
  name: string;
};

export type UserComment = {
  user: User;
  comment: Comment;
};
