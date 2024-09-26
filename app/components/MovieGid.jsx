import React, { useRef, useState, useEffect } from "react";
import MovieCard from "./MovieCard";

export default function MovieGrid({
  movies,
  handlerFavoriteClick,
  handlerMovieClick,
}) {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const handleWheel = (e) => {
        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaY;
      };
      scrollContainer.addEventListener("wheel", handleWheel, {
        passive: false,
      });
      return () => scrollContainer.removeEventListener("wheel", handleWheel);
    }
  }, []);

  const startDragging = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const handleDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleCardClick = (e, movie) => {
    if (!isDragging) {
      handlerMovieClick(movie);
    }
  };

  if (!movies || movies.length === 0) {
    return <div className="text-center py-4">No movies available.</div>;
  }

  return (
    <div
      className="overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 cursor-grab active:cursor-grabbing"
      ref={scrollContainerRef}
      onMouseDown={startDragging}
      onMouseLeave={stopDragging}
      onMouseUp={stopDragging}
      onMouseMove={handleDrag}
    >
      <div className="flex space-x-4 p-4 select-none">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex-none"
            onMouseDown={(e) => e.preventDefault()}
          >
            <div onClick={(e) => handleCardClick(e, movie)}>
              <MovieCard movie={movie} favorite={handlerFavoriteClick} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
