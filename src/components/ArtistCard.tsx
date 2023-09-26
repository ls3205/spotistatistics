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
            className="flex h-[150px] w-[150px] flex-col justify-center items-center aspect-square"
            target="_blank"
        >
            <Image
                src={artist.images[1].url}
                alt="artist-image"
                width={100}
                height={100}
                className="object-cover w-[100px] h-[100px] rounded-md"
            />
            <h1 className="text-black dark:text-white mt-3">{index + 1}. {' '}{artist.name}</h1>
        </Link>
    );
};

export default ArtistCard;
