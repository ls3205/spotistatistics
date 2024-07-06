import { HistoryIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SpotifyTag from "./SpotifyTag";

interface RecentlyPlayedSongCardProps {
    song: Song;
    key: number;
    played_at: string;
}

const RecentlyPlayedSongCard: React.FC<RecentlyPlayedSongCardProps> = ({
    song,
    key,
    played_at,
}) => {
    return (
        <Link
            href={song.external_urls.spotify}
            className="relative flex aspect-auto h-min w-full flex-row items-center justify-start rounded-md py-2 pl-4 font-semibold transition-all duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-800"
            target="_blank"
        >
            <Image
                src={song.album.images[1].url}
                alt="artist-image"
                width={100}
                height={100}
                className="mr-2 h-[50px] w-[50px] object-cover"
            />

            <div className="flex w-full flex-col overflow-hidden">
                <div className="flex flex-row">
                    <h1 className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-black dark:text-white">
                        {song.name}
                    </h1>
                    <SpotifyTag className="ml-2 h-6 w-6" />
                </div>
                <h3 className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-neutral-500 dark:text-neutral-400">
                    {song.artists[0].name}
                </h3>
            </div>

            <div className="absolute right-4 flex h-full w-[50px] flex-col items-center text-neutral-500 dark:text-neutral-400 ">
                <HistoryIcon />
                {Date.now() - new Date(played_at).getTime() < 3600000
                    ? Math.round(
                          (Date.now() - new Date(played_at).getTime()) / 60000,
                      ) + " m"
                    : Math.round(
                          (Date.now() - new Date(played_at).getTime()) /
                              3600000,
                      ) + " h"}
            </div>
        </Link>
    );
};

export default RecentlyPlayedSongCard;
