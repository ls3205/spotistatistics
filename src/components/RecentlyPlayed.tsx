"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { User } from "next-auth";
import React from "react";
import SongCard from "./SongCard";
import RecentlyPlayedSongCard from "./RecentlyPlayedSongCard";
import { cn } from "@/lib/utils";

interface RecentlyPlayedProps {
    user: Pick<User, "name" | "image" | "email" | "accessToken">;
    dataLength?: number;
    className?: string;
    mobileAccessible?: boolean;
}

const RecentlyPlayed: React.FC<RecentlyPlayedProps> = ({
    user,
    dataLength = 10,
    className,
    mobileAccessible = true,
}) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["GetRecentlyPlayed"],
        queryFn: async () => {
            const { data } = await axios.get(
                `https://api.spotify.com/v1/me/player/recently-played?limit=${dataLength}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`,
                        "Content-Type": "application/json",
                    },
                },
            );
            return data as RecentlyPlayedDataReturn;
        },
    });

    if (isLoading) {
        return (
            <div className="m-2 flex h-44 w-full items-center justify-center rounded-md bg-neutral-100 p-2 align-middle dark:bg-neutral-900 2xl:m-0 2xl:mx-1">
                <Loader2 className="animate-spin text-black dark:text-white" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="m-2 h-auto w-full rounded-md bg-neutral-100 p-2 dark:bg-neutral-900 2xl:m-0 2xl:mx-1">
                <h1 className="text-black dark:text-white">something broke</h1>
            </div>
        );
    }

    return (
        <div
            className={cn(
                "flex h-min flex-col rounded-md bg-neutral-100 p-2 dark:bg-neutral-900",
                mobileAccessible
                    ? "my-2 w-full p-2 2xl:m-0 2xl:mx-1 2xl:w-1/3"
                    : "m-0 mx-1 w-1/3",
                className,
            )}
        >
            <h1 className="ml-[15%] w-[70%] border-b-[1px] border-neutral-500 p-2 text-center text-2xl font-medium text-black dark:border-neutral-400 dark:text-white 2xl:mb-2">
                Recently Played
            </h1>
            <div className="flex flex-col overflow-y-auto">
                {data &&
                    data.items.map((song, index) => {
                        return (
                            <RecentlyPlayedSongCard
                                song={song.track}
                                key={index}
                                played_at={song.played_at}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default RecentlyPlayed;
