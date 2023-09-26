import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface ArtistCardProps {
    artist: Artist;
    index: number;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, index }) => {
    return (
        <Link
            href={artist.external_urls.spotify}
            className="flex aspect-square h-[150px] w-[150px] flex-col items-center justify-center rounded-md py-2 transition-all duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 2xl:aspect-auto 2xl:h-min 2xl:w-full 2xl:flex-row 2xl:justify-start 2xl:pl-4 2xl:font-semibold"
            target="_blank"
        >
            <Image
                src={artist.images[1].url}
                alt="artist-image"
                width={100}
                height={100}
                className="h-[100px] w-[100px] rounded-md object-cover 2xl:mr-2 2xl:h-[50px] 2xl:w-[50px]"
            />
            <h1 className="mt-3 text-black dark:text-white 2xl:mt-0 2xl:text-2xl">
                {index + 1}. {artist.name}
            </h1>
        </Link>
    );
};

export default ArtistCard;
