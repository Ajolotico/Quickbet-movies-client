"use client";

import MovieGrid from "./MovieGid";
import { useState, useEffect, useCallback } from "react";
import { BASE_URL } from "../constants";

function formatText(text) {
  return text
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function fetchMovies(title) {
  try {
    const url = `${BASE_URL}/movie/${title}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return { results: [] };
  }
}

export default function MoviesCategories({
  title,
  handlerFavoriteClick,
  handlerMovieClick,
  selectedGenre,
}) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [endScrolling, setEndScrolling] = useState();

  const loadMovies = useCallback(async () => {
    try {
      const results = await fetchMovies(title);
      setMovies(results.results);
    } catch (error) {
      console.error(`Error loading ${title} movies:`, error);
      setError(error.message);
    }
  }, [title]);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  useEffect(() => {
    console.log(`${title} movies state:`, movies);
  }, [title, movies]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genre_ids.includes(Number(selectedGenre)))
    : movies;

  return (
    <div className="py-5 pl-5 overflow-x-hidden">
      <h2 className="font-poppins font-bold pb-2 md:text-xl">
        {formatText(title)}
      </h2>
      <MovieGrid
        movies={filteredMovies}
        handlerFavoriteClick={handlerFavoriteClick}
        handlerMovieClick={handlerMovieClick}
        endScrolling={setEndScrolling}
      />
    </div>
  );
}
