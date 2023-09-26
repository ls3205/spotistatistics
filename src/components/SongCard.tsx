import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SongCardProps {
    song: Song;
    index: number;
}

const SongCard: React.FC<SongCardProps> = ({ song, index }) => {
    return (
        <Link
            href={song.external_urls.spotify}
            className="flex aspect-square min-h-[150px] w-[150px] flex-col items-center justify-center rounded-md py-2 transition-all duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-800"
            target="_blank"
        >
            <Image
                src={song.album.images[1].url}
                alt="artist-image"
                width={100}
                height={100}
                className="h-[100px] w-[100px] rounded-md object-cover"
            />
            <h1 className="mt-3 text-black dark:text-white">
                {index + 1}.{" "}
                {song.name.length <= 13
                    ? song.name
                    : song.name.slice(0, 10) + "..."}
            </h1>
            <h3 className="text-xs text-black dark:text-white">
                {song.artists[0].name.length <= 20
                    ? song.artists[0].name
                    : song.artists[0].name.slice(0, 20) + "..."}
            </h3>
        </Link>
    );
};

export default SongCard;
