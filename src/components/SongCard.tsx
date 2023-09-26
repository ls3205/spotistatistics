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
            className="flex aspect-square h-[150px] w-[150px] flex-col items-center justify-center rounded-md py-2 transition-all duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 2xl:aspect-auto 2xl:h-min 2xl:w-full 2xl:flex-row 2xl:justify-start 2xl:pl-4 2xl:font-semibold"
            target="_blank"
        >
            <Image
                src={song.album.images[1].url}
                alt="artist-image"
                width={100}
                height={100}
                className="h-[100px] w-[100px] rounded-md object-cover 2xl:mr-2 2xl:h-[50px] 2xl:w-[50px]"
            />
            <div className="flex flex-col items-center 2xl:hidden">
                <h1 className="mt-3 text-black dark:text-white 2xl:mt-0">
                    {index + 1}.{" "}
                    {song.name.length <= 13
                        ? song.name
                        : song.name.slice(0, 10) + "..."}
                </h1>
                <h3 className="text-xs text-neutral-500 dark:text-neutral-400 2xl:text-base">
                    {song.artists[0].name.length <= 20
                        ? song.artists[0].name
                        : song.artists[0].name.slice(0, 20) + "..."}
                </h3>
            </div>

            <div className="hidden flex-col 2xl:flex">
                <h1 className="text-black dark:text-white">
                    {index + 1}. {song.name}
                </h1>
                <h3 className="text-xs text-neutral-500 dark:text-neutral-400">
                    {song.artists[0].name}
                </h3>
            </div>
        </Link>
    );
};

export default SongCard;
