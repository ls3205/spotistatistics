"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { User } from "next-auth";
import React from "react";
import SongCard from "../SongCard";

interface RecentlyPlayedProps {
    user: Pick<User, "name" | "image" | "email" | "accessToken">;
}

const RecentlyPlayed: React.FC<RecentlyPlayedProps> = ({ user }) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["GetRecentlyPlayed"],
        queryFn: async () => {
            const { data } = await axios.get(
                `https://api.spotify.com/v1/me/player/recently-played?limit=10`,
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
        <div className="my-2 flex h-auto w-full flex-row overflow-x-auto rounded-md bg-neutral-100 p-2 dark:bg-neutral-900 2xl:m-0 2xl:mx-1 2xl:mr-0 2xl:w-1/3 2xl:flex-col">
            {data &&
                data.items.map((song, index) => {
                    return <SongCard song={song.track} index={index} />;
                })}
        </div>
    );
};

export default RecentlyPlayed;
