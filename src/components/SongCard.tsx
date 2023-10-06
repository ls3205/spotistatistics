import { cn } from "@/lib/utils";
import { HistoryIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SongCardProps {
    song: Song;
    index: number;
    mobileAccessible: boolean | true;
}

const SongCard: React.FC<SongCardProps> = ({
    song,
    index,
    mobileAccessible = true,
}) => {
    return (
        <Link
            href={song.external_urls.spotify}
            className={cn(
                mobileAccessible
                    ? "flex aspect-square h-[150px] w-[125px] flex-col items-center justify-center rounded-md py-2 transition-all duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 2xl:aspect-auto 2xl:h-min 2xl:w-full 2xl:flex-row 2xl:justify-start 2xl:pl-4 2xl:font-semibold"
                    : "flex aspect-auto h-min w-full flex-row items-center justify-start rounded-md py-2 pl-4 font-semibold transition-all duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-800",
            )}
            target="_blank"
        >
            <Image
                src={song.album.images[1].url}
                alt="artist-image"
                width={150}
                height={150}
                className="h-[75px] w-[75px] rounded-md object-cover 2xl:mr-2 2xl:h-[50px] 2xl:w-[50px]"
            />
            <div className="flex flex-col items-center 2xl:hidden">
                <h1 className="mt-3 text-black dark:text-white 2xl:mt-0">
                    {index + 1}.{" "}
                    {song.name.length <= 12
                        ? song.name
                        : song.name.slice(0, 9) + "..."}
                </h1>
                <h3 className="text-xs text-neutral-500 dark:text-neutral-400 2xl:text-base">
                    {song.artists[0].name.length <= 20
                        ? song.artists[0].name
                        : song.artists[0].name.slice(0, 20) + "..."}
                </h3>
            </div>

            <div className="hidden flex-col 2xl:flex">
                <h1 className="text-black dark:text-white">
                    {index + 1}.{" "}
                    {song.name.length <= 40
                        ? song.name
                        : song.name.slice(0, 40) + "..."}
                </h1>
                <h3 className="text-xs text-neutral-500 dark:text-neutral-400">
                    {song.artists[0].name}
                </h3>
            </div>
        </Link>
    );
};

export default SongCard;
