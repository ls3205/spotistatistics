"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { User } from "next-auth";
import React, { useEffect, useState } from "react";
import SongCard from "./SongCard";
import { cn } from "@/lib/utils";

interface TopSongsProps {
    user: Pick<User, "name" | "image" | "email" | "accessToken">;
    dataRange?: "short_term" | "medium_term" | "long_term";
    mobileAccessible?: boolean | true;
    className?: string;
    dataLength?: number | 10;
}

const TopSongs: React.FC<TopSongsProps> = ({
    user,
    dataRange = "medium_term",
    mobileAccessible = true,
    className,
    dataLength = 10,
}) => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["GetTopSongs"],
        queryFn: async () => {
            const { data } = await axios.get(
                `https://api.spotify.com/v1/me/top/tracks?limit=${dataLength}&time_range=${dataRange}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`,
                        "Content-Type": "application/json",
                    },
                },
            );
            return data as TopTracksDataReturn;
        },
    });

    useEffect(() => {
        refetch();
    }, [dataRange]);

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
        data && (
            <div
                className={cn(
                    "flex h-min flex-col rounded-md bg-neutral-100 p-2 dark:bg-neutral-900",
                    mobileAccessible
                        ? "my-2 w-full p-2 2xl:m-0 2xl:mx-1 2xl:w-1/3"
                        : "m-0 mx-1 w-1/3",
                    className,
                )}
            >
                <h1 className="mb-2 ml-[15%] w-[70%] border-b-[1px] border-neutral-500 p-2 text-center text-2xl font-medium text-black dark:border-neutral-400 dark:text-white">
                    Top Songs
                </h1>
                <div
                    className={cn(
                        "flex overflow-x-auto overflow-y-hidden",
                        mobileAccessible ? "flex-row 2xl:flex-col" : "flex-col",
                    )}
                >
                    {data.items.map((song, index) => {
                        return (
                            <SongCard
                                song={song}
                                index={index}
                                mobileAccessible={mobileAccessible}
                            />
                        );
                    })}
                </div>
            </div>
        )
    );
};

export default TopSongs;
