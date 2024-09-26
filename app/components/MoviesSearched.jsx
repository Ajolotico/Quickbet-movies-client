"use client";

import MovieGrid from "./MovieGid.jsx";
import { useEffect } from "react";

export default function MoviesSearched({
  movies,
  handlerFavoriteClick,
  handlerMovieClick,
}) {
  useEffect(() => {
    console.log("Searched movies:", movies);
  }, [movies]);

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="py-5 pl-5">
      <h2 className="font-poppins font-bold pb-2 md:text-xl">Search Results</h2>
      <MovieGrid
        movies={movies}
        handlerFavoriteClick={handlerFavoriteClick}
        handlerMovieClick={handlerMovieClick}
      />
    </div>
  );
}
