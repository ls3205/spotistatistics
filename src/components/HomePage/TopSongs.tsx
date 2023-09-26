"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { User } from "next-auth";
import React from "react";
import SongCard from "../SongCard";

interface TopSongsProps {
    user: Pick<User, "name" | "image" | "email" | "accessToken">;
    dataRange?: "short_term" | "medium_term" | "long_term";
}

const TopSongs: React.FC<TopSongsProps> = ({ user, dataRange }) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["GetTopSongs"],
        queryFn: async () => {
            const { data } = await axios.get(
                `https://api.spotify.com/v1/me/top/tracks?limit=25&time_range=${
                    dataRange ? dataRange : "medium_term"
                }`,
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

    if (isLoading) {
        return (
            <div className="m-2 flex h-44 w-[95%] items-center justify-center rounded-md bg-neutral-100 p-2 align-middle dark:bg-neutral-900">
                <Loader2 className="animate-spin text-black dark:text-white" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="m-2 h-auto w-[95%] rounded-md bg-neutral-100 p-2 dark:bg-neutral-900">
                <h1 className="text-black dark:text-white">something broke</h1>
            </div>
        );
    }

    return (
        <div className="m-2 flex h-auto w-[95%] flex-row overflow-x-scroll rounded-md bg-neutral-100 p-2 dark:bg-neutral-900">
            {data &&
                data.items.map((song, index) => {
                    return <SongCard song={song} index={index} />;
                })}
        </div>
    );
};

export default TopSongs;
