"use client";
import MovieGrid from "./MovieGid";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

async function fetchFavoriteMovies() {
  try {
    const url = `http://localhost:5001/favorites`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching favorite movies:", error);
    return [];
  }
}

export default function Favorites({
  handlerFavoriteClick,
  handlerMovieClick,
  selectedGenre,
}) {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("No token found");
        }

        const decodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken); // For debugging

        // Asume que el userId está en el claim 'sub' o 'id'
        const userId = decodedToken.sub || decodedToken.id;

        if (!userId) {
          throw new Error("No user ID found in token");
        }

        const movies = await fetchFavoriteMovies();
        setFavoriteMovies(movies);
      } catch (err) {
        console.error("Error in Favorites component:", err);
        setError(err.message);
      }
    };

    fetchFavorites();
  }, []);

  const filteredMovies = selectedGenre
    ? favoriteMovies.filter((movie) =>
        movie.genre_ids.includes(Number(selectedGenre))
      )
    : favoriteMovies;

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="py-5 pl-5 overflow-x-hidden">
      <h2 className="font-poppins font-bold pb-2 md:text-xl">Favorites</h2>
      {filteredMovies.length > 0 ? (
        <MovieGrid
          movies={filteredMovies}
          handlerFavoriteClick={handlerFavoriteClick}
          handlerMovieClick={handlerMovieClick}
        />
      ) : (
        <p>No favorite movies found. Start adding some!</p>
      )}
    </div>
  );
}
