import Image from "next/image";
import React from "react";

type ActorCardProps = {
  actor: any;
};

const getImageUrl = (path: string) => `https://image.tmdb.org/t/p/w200/${path}`;

export default function ActorCard({ actor }: ActorCardProps) {
  //   let imageURL = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`;
  //   if (imageURL.endsWith("null")) imageURL = "/posterPlaceHolder.jpg";

  return (
    <article className="flex flex-col">
      <div className="group relative flex flex-col">
        <Image
          src={getImageUrl(actor.profile_path!)}
          width={270}
          height={180}
          style={{
            objectFit: "cover",
          }}
          alt={actor.name}
          className={`mb-[10px] rounded-lg object-contain transition sm:group-hover:brightness-75`}
          sizes="(min-width: 1540px) 248px, (min-width: 1280px) calc(10vw + 96px), (min-width: 1040px) calc(25vw - 36px), (min-width: 780px) calc(33.33vw - 43px), calc(49.13vw - 53px)"
        />
      </div>
      <div className="flex flex-col justify-center font-bold">{actor.name}</div>
      <div className="flex flex-col justify-center text-sm font-semibold text-gray-400">
        {actor.character}
      </div>
    </article>
  );
}
