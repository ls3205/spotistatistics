"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "next-auth";
import Image from "next/image";
import React from "react";
import { Progress } from "./ui/Progress";
import { AlertCircleIcon, Loader2 } from "lucide-react";

interface CurrentPlayerInfoProps {
    user: Pick<User, "name" | "image" | "email" | "sub" | "accessToken">;
}

const CurrentPlayerInfo: React.FC<CurrentPlayerInfoProps> = ({ user }) => {
    const { data, isLoading, error, refetch, isSuccess } = useQuery({
        refetchOnWindowFocus: true,
        queryKey: ["GetPlayerData"],
        queryFn: async () => {
            const { data } = await axios.get(
                "https://api.spotify.com/v1/me/player",
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`,
                        "Content-Type": "application/json",
                    },
                },
            );

            return data as PlayerStateReturnData;
        },
    });

    if (isLoading) {
        <div className="relative m-2 ml-auto flex flex-col items-center rounded-md bg-green-500 p-2">
            <Loader2 className="animate-spin" />
        </div>;
    }

    return data ? (
        <div className="relative m-2 z-[1] ml-auto flex flex-col items-center rounded-md bg-green-500 p-2">
            <div className="absolute -z-[1] h-full w-full bg-green-500 blur-xl" />
            <div className="flex flex-row">
                <Image
                    src={data.item.album.images[0].url}
                    alt="Song Playing Image"
                    width={150}
                    height={150}
                    className="h-16 w-16"
                />
                <div className="ml-2 flex flex-col justify-center">
                    <h1 className="font-medium text-black">{data.item.name}</h1>
                    <h3 className="text-sm text-neutral-700">
                        {data.item.artists[0].name}
                    </h3>
                </div>
            </div>
            <Progress
                className="mt-2 w-[250px]"
                value={(data.progress_ms / data.item.duration_ms) * 100}
            />
        </div>
    ) : (
        // <div className="relative m-2 ml-auto flex flex-col items-center rounded-md bg-green-500 p-2">
        //     <h1 className="flex flex-row">
        //         <AlertCircleIcon className="mr-2" />
        //         No Player Detected
        //     </h1>
        // </div>
        
        ""
    );
};

export default CurrentPlayerInfo;
