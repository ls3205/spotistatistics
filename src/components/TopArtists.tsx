"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { User } from "next-auth";
import React, { useEffect } from "react";
import ArtistCard from "./ArtistCard";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface TopArtistsProps {
    user: Pick<User, "name" | "image" | "email" | "accessToken">;
    dataRange?: "short_term" | "medium_term" | "long_term";
    mobileAccessible?: boolean | true;
    className?: string;
    dataLength?: number | 10;
    overflow?: "overflow-x-auto" | "overflow-x-hidden" | "overflow-x-scroll";
}

const TopArtists: React.FC<TopArtistsProps> = ({
    user,
    dataRange = "medium_term",
    mobileAccessible = true,
    className,
    dataLength = 10,
    overflow = "overflow-x-auto",
}) => {
    const { data, isLoading, isFetching, error, refetch } = useQuery({
        queryKey: ["GetTopArtists"],
        queryFn: async () => {
            const { data } = await axios.get(
                `https://api.spotify.com/v1/me/top/artists?limit=${dataLength}&time_range=${dataRange}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`,
                        "Content-Type": "application/json",
                    },
                },
            );
            return data as TopArtistsDataReturn;
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

    if (isFetching) {
        return (
            <div className="m-2 flex h-44 w-full items-center justify-center rounded-md bg-neutral-100 p-2 align-middle dark:bg-neutral-900 2xl:m-0 2xl:mx-1 2xl:w-1/3">
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
                    ? "my-2 w-full p-2 2xl:m-0 2xl:mr-1 2xl:w-1/3"
                    : "m-0 mr-1 w-1/3",
                className,
            )}
        >
            <h1 className="mb-2 ml-[15%] w-[70%] border-b-[1px] border-neutral-500 p-2 text-center text-2xl font-medium text-black dark:border-neutral-400 dark:text-white">
                Top Artists
            </h1>
            <div
                className={cn(
                    "flex",
                    mobileAccessible ? "flex-row 2xl:flex-col" : "flex-col",
                    overflow,
                )}
            >
                {data &&
                    data.items.map((artist, index) => {
                        return (
                            <ArtistCard
                                artist={artist}
                                index={index}
                                key={index}
                                mobileAccessible={mobileAccessible}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default TopArtists;
