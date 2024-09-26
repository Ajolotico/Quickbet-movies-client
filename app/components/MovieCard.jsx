import whiteLike2 from "../assets/whiteLike3.png";
import redLike from "../assets/redLike.png";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function MovieCard({
  movie,
  initialFavorite,
  handlerFavoriteClick,
  handlerMovieClick,
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(initialFavorite || false);
  }, [initialFavorite]);

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const truncatedTitle =
    movie.title.length > 20
      ? movie.title.substring(0, 20) + "..."
      : movie.title;
  const rating = Math.round(movie.vote_average * 10);

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  const likeImage = isFavorite ? redLike : whiteLike2;

  const handleFavoriteClick = (event) => {
    event.stopPropagation();
    const newFavoriteState = !isFavorite;
    //handlerFavoriteClick()
    setIsFavorite(newFavoriteState);
    handlerFavoriteClick(movie.id, newFavoriteState);
  };

  return (
    <div className="bg-[#262626] rounded-lg flex flex-col w-[200px] h-[335px] overflow-hidden">
      <div
        className="relative w-full h-[200px] cursor-pointer"
        onClick={() => {}}
      >
        <Image
          src={imageUrl}
          alt={movie.title}
          fill
          style={{ objectFit: "cover" }} // o usa className
          className="rounded-md w-fit h-fit"
        />
      </div>
      <div className="p-2 flex flex-col h-[125px]">
        <div className="pb-2">
          <h3 className="text-sm font-bold mb-1 line-clamp-2">{movie.title}</h3>
          <p className="text-xs mb-1">{formatDate(movie.release_date)}</p>
        </div>
        <div className="flex place-content-evenly items-center">
          <div className="flex flex-col items-center">
            <p className="text-xs pb-2">Rating</p>
            <p className="font-bold text-sm">{rating}%</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-xs pb-2">Favorites</p>
            <button
              onClick={handleFavoriteClick}
              className="focus:outline-none transition-transform duration-200 ease-in-out transform hover:scale-110"
            >
              <Image
                src={likeImage}
                alt={isFavorite ? "Remove from favorites" : "Add to favorites"}
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
