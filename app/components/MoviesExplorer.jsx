"use client";
import MoviesCategories from "./MoviesCategories";
import MoviesSearched from "./MoviesSearched";

export default function MoviesExplorer({
  movies,
  handlerFavoriteClick,
  handlerMovieClick,
  selectedGenre,
}) {
  return (
    <div className="bg-[#454545] overflow-x-hidden">
      <MoviesSearched movies={movies} />
      <MoviesCategories
        title="popular"
        handlerFavoriteClick={handlerFavoriteClick}
        handlerMovieClick={handlerMovieClick}
        selectedGenre={selectedGenre}
      />
      <MoviesCategories
        title="now_playing"
        handlerFavoriteClick={handlerFavoriteClick}
        handlerMovieClick={handlerMovieClick}
        selectedGenre={selectedGenre}
      />
      <MoviesCategories
        title="upcoming"
        handlerFavoriteClick={handlerFavoriteClick}
        handlerMovieClick={handlerMovieClick}
        selectedGenre={selectedGenre}
      />
      <MoviesCategories
        title="top_rated"
        handlerFavoriteClick={handlerFavoriteClick}
        handlerMovieClick={handlerMovieClick}
        selectedGenre={selectedGenre}
      />
    </div>
  );
}