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
}

const TopArtists: React.FC<TopArtistsProps> = ({
    user,
    dataRange = "medium_term",
    mobileAccessible = true,
    className,
    dataLength = 10,
}) => {
    const { data, isLoading, error, refetch } = useQuery({
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
                mobileAccessible
                    ? "my-1 flex h-min w-full flex-col rounded-md bg-neutral-100 p-2 dark:bg-neutral-900 2xl:m-0 2xl:mx-1 2xl:ml-0 2xl:w-1/3"
                    : "mx-1 my-1 ml-0 flex h-min w-1/3 flex-col rounded-md bg-neutral-100 p-2 dark:bg-neutral-900",
                className,
            )}
        >
            <h1
                className={
                    mobileAccessible
                        ? "ml-[15%] w-[70%] border-b-[1px] border-neutral-500 p-2 text-center text-2xl font-medium text-black dark:border-neutral-400 dark:text-white 2xl:mb-2"
                        : "mb-2 ml-[15%] w-[70%] border-b-[1px] border-neutral-500 p-2 text-center text-2xl font-medium text-black dark:border-neutral-400 dark:text-white"
                }
            >
                Top Artists
            </h1>
            <div
                className={
                    mobileAccessible
                        ? "flex flex-row overflow-x-auto 2xl:flex-col"
                        : "flex flex-col overflow-x-auto"
                }
            >
                {data &&
                    data.items.map((artist, index) => {
                        return <ArtistCard artist={artist} index={index} mobileAccessible={mobileAccessible} />;
                    })}
            </div>
        </div>
    );
};

export default TopArtists;
