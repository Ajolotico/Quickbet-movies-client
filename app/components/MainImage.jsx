"use client";

import Image from "next/image";
import whiteLike from "../assets/whiteLike3.png";
import redLike from "../assets/redLike.png";
import { useState, useEffect } from "react";

export default function MainImage({
  imageUrl,
  title,
  description,
  rating,
  favorite,
  handlerFavoriteClick,
  movieId, // Asumiendo que necesitas un ID para identificar la película
}) {
  const [isFavorite, setIsFavorite] = useState(favorite);

  useEffect(() => {
    setIsFavorite(favorite);
  }, [favorite]);

  const rank = Math.round(rating * 10);
  const likeImage = isFavorite ? redLike : whiteLike;

  const handleFavoriteClick = (event) => {
    event.stopPropagation();
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    handlerFavoriteClick(movieId, newFavoriteState);
  };

  return (
    <div className="relative w-full h-[350px]">
      <Image
        src={imageUrl}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col md:flex-row items-end text-white justify-between py-4">
        <div className="px-5 mb-4 md:mb-0">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 text-left">
            {title}
          </h1>
          <p className="text-sm md:text-xl max-w-2xl text-left">
            {description}
          </p>
        </div>
        <div className="flex items-center px-5 md:px-10 gap-8 md:gap-16">
          <button
            onClick={handleFavoriteClick}
            className="focus:outline-none transition-transform duration-200 ease-in-out transform hover:scale-110"
          >
            <Image
              src={likeImage}
              alt={isFavorite ? "Remove from favorites" : "Add to favorites"}
              width={25}
              height={25}
            />
          </button>
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-bold">{rank}%</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
