"use client";

import { useState } from "react";
import { BASE_URL } from "../constants";
import Image from "next/image";
import searchIcon from "../assets/lupa.png";

async function searchMovies(query) {
  try {
    const res = await fetch(
      `${BASE_URL}/search/movie?api_key=${
        process.env.NEXT_PUBLIC_API_KEY
      }&query=${encodeURIComponent(query)}`
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error searching movies:", error);
    return { results: [] };
  }
}

export default function Sidebar({ onSearchResults, onGenreChange }) {
  const [query, setQuery] = useState("");

  async function handleSearch(e) {
    e.preventDefault();
    if (!query) return;

    try {
      const results = await searchMovies(query);
      onSearchResults(results.results || []); // Llamamos a la función prop con los resultados
      console.log("Search results:", results.results);
    } catch (error) {
      console.error("Error handling search:", error);
      onSearchResults([]);
    }
  }

  function handleGenreChange(e) {
    if (typeof onGenreChange === "function") {
      onGenreChange(e.target.value);
    } else {
      console.error("onGenreChange is not a function");
    }
  }

  return (
    <div className="bg-[#262626] px-4 py-6">
      <h4 className="font-semibold md:text-base">Search</h4>
      <form onSubmit={handleSearch} className="flex items-center">
        <div className="relative flex-grow">
          <input
            className=" bg-[#1C1C1C] text-white text-sm px-4 py-2 pr-10 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Keywords"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 h-full w-10 flex items-center justify-center bg-[#1C1C1C] rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Image src={searchIcon} alt="Search" width={15} height={15} />
          </button>
        </div>
      </form>
      <h4 className="font-semibold md:text-base">Genres</h4>
      <select
        id="genre-select"
        name="genre"
        className="w-full bg-[#1C1C1C] text-white px-4 py-2 text-sm rounded-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-zinc-500 focus:border-transparent appearance-none"
        onChange={handleGenreChange}
      >
        <option value="">All Genres</option>
        <option value="28">Action</option>
        <option value="12">Adventure</option>
        <option value="16">Animation</option>
        <option value="35">Comedy</option>
        <option value="80">Crime</option>
        <option value="99">Documentary</option>
        <option value="18">Drama</option>
        <option value="10751">Family</option>
        <option value="14">Fantasy</option>
        <option value="36">History</option>
        <option value="27">Horror</option>
        <option value="10402">Music</option>
        <option value="9648">Mystery</option>
        <option value="10749">Romance</option>
        <option value="878">Science Fiction</option>
        <option value="10770">TV Movie</option>
        <option value="53">Thiller</option>
        <option value="10752">War</option>
        <option value="37">Western</option>
      </select>
    </div>
  );
}
