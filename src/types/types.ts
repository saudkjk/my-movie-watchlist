export type DisplayInfiniteMoviesProps = {
    movies: Movie[];
    param: string;
    fetchMoviesWithDbStatus: (
        genre: string,
        page: number,
        currentUserId: string
    ) => Promise<Movie[]>,
    currentUserId: string,
}


export type Movie = {
    id: string;
    title: string;
    runtime?: number;
    vote_average: number;
    poster_path?: string;
    isLiked: boolean | null;
    inWatchlist: boolean | null;
    inCompleted: boolean | null;
}

export type WatchlistButtonProps = {
    currentUserId: string;
    movie: Movie;
};


export type MovieCardProps = {
    currentUserId: string;
    movie: Movie;
    isLCP: boolean;
};


export type ImageHoverProps = {
    imageUrl: string;
    children: React.ReactNode | string;
    childrenClassName?: string;
    className?: string;
    isLCP: boolean;
}


export type DisplayMoviesProps = {
    movies: Movie[];
    currentUserId: string;
}

export type Comment = {
    id: string;
    userId: string;
    targetUserId: string;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
};

export type User = {
    username: string | null;
    imageUrl: string;
    id: string;
};

export type CommentsProps = {
    currentWatchlistUserId: string;
    usersList: User[];
    currentUserId: string;
};


export type CompletedButtonProps = {
    currentUserId: string;
    movie: Movie;
};


export type CommentFormProps = {
    username: string;
    targetUserId: string;
    currentUserId: string;
};


export type ChangeVisibilitySwitchProps = {
    userId: string;
    watchListVisibility: boolean;
}

export type NavbarItemProps = {
    title: string;
    href: string;
    path: string;
    children?: React.ReactNode;
};


export type Genre = {
    id: number;
    name: string;
};


export type UserComment = {
    user: User;
    comment: Comment;
}