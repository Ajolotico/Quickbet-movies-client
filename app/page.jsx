"use client";
import { useState, useEffect, useCallback } from "react";
import { BASE_URL } from "./constants";

import MoviesExplorer from "./components/MoviesExplorer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MainImage from "./components/MainImage";

async function fetchMovie() {
  try {
    const url = `${BASE_URL}/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.results[0]; // Return the first movie from the results
  } catch (error) {
    console.error("Error fetching top movie:", error);
    return null;
  }
}

export default function Home() {
  const [topMovie, setTopMovie] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    async function loadTopMovie() {
      const movie = await fetchMovie();
      if (movie) {
        setTopMovie(movie);
      }
    }
    loadTopMovie();
  }, []);

  useEffect(() => {
    console.log("Selected genre changed:", selectedGenre);
  }, [selectedGenre]);

  const handleSearchResults = useCallback((results) => {
    setSearchResults(results);
    console.log("Search results updated:", results.length, "movies found");
  }, []);

  const handleGenreChange = useCallback((genre) => {
    console.log("Genre changed to:", genre);
    setSelectedGenre(genre);
  }, []);

  const filteredMovies = searchResults.filter((movie) =>
    selectedGenre ? movie.genre_ids.includes(Number(selectedGenre)) : true
  );

  useEffect(() => {
    console.log(
      "Filtered movies:",
      filteredMovies.length,
      "movies after filtering"
    );
  }, [filteredMovies]);

  return (
    <div className="text-white">
      <main>
        <Navbar />
        {topMovie && (
          <MainImage
            imageUrl={`https://image.tmdb.org/t/p/original${topMovie.backdrop_path}`}
            title={topMovie.title}
            description={topMovie.overview}
            rating={topMovie.vote_average}
            favorite={false}
            handlerFavoriteClick={() => {
              /* Implement favorite logic */
            }}
          />
        )}
        <div className="flex row-span-1">
          <Sidebar
            onSearchResults={handleSearchResults}
            onGenreChange={handleGenreChange}
          />
          <MoviesExplorer
            movies={filteredMovies}
            handlerFavoriteClick={() => null}
            handlerMovieClick={() => null}
            selectedGenre={selectedGenre}
          />
        </div>
      </main>
    </div>
  );
}
