import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface ArtistCardProps {
    artist: Artist;
    index: number;
    key: number;
    mobileAccessible?: boolean | true;
}

const ArtistCard: React.FC<ArtistCardProps> = ({
    artist,
    index,
    key,
    mobileAccessible = true,
}) => {
    return (
        <Link
            href={artist.external_urls.spotify}
            className={cn(
                "flex rounded-md py-2 transition-all duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 ",
                mobileAccessible
                    ? "aspect-square h-[175px] w-[150px] flex-col items-center justify-center 2xl:aspect-auto 2xl:h-min 2xl:w-full 2xl:flex-row 2xl:justify-start 2xl:pl-4 2xl:font-semibold"
                    : "aspect-auto h-min w-full flex-row items-center justify-start pl-4 font-semibold",
            )}
            target="_blank"
        >
            <h1
                className={cn(
                    "w-8 text-2xl font-medium text-neutral-500 dark:text-neutral-400",
                    mobileAccessible
                        ? "text-center 2xl:mr-4 2xl:text-right"
                        : "mr-4 text-right",
                )}
            >
                {index + 1}
            </h1>
            <Image
                src={artist.images[1].url}
                alt="artist-image"
                width={150}
                height={150}
                className={cn(
                    "rounded-md object-cover",
                    mobileAccessible
                        ? "h-[75px] w-[75px] 2xl:mr-2 2xl:h-[50px] 2xl:w-[50px]"
                        : "mr-2 h-[50px] w-[50px]",
                )}
            />
            <h1
                className={cn(
                    "overflow-hidden text-ellipsis whitespace-nowrap text-black dark:text-white",
                    mobileAccessible ? "mt-3 2xl:mt-0" : "mt-0",
                )}
            >
                {artist.name}
            </h1>
        </Link>
    );
};

export default ArtistCard;
