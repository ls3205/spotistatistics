"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "next-auth";
import React from "react";

interface CurrentPlayerInfoProps {
    user: Pick<User, "name" | "image" | "email" | "sub" | "accessToken">;
}

const CurrentPlayerInfo: React.FC<CurrentPlayerInfoProps> = ({ user }) => {
    const { data, isLoading, error } = useQuery({
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

    return data && <div className="relative ml-auto"></div>;
};

export default CurrentPlayerInfo;
