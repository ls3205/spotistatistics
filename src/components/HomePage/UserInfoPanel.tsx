"use client";

import { UserIcon } from "lucide-react";
import { User } from "next-auth";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback } from "../ui/Avatar";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CurrentPlayerInfo from "../CurrentPlayerInfo";

interface UserInfoPanelProps {
    user: Pick<User, "name" | "image" | "email" | "sub" | "accessToken">;
}

const UserInfoPanel: React.FC<UserInfoPanelProps> = ({ user }) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["GetUserData"],
        queryFn: async () => {
            const { data } = await axios.get("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            return data as UserProfileReturnData;
        },
    });

    return (
        data && (
            <div className="m-1 h-auto w-[95%] flex-row rounded-md bg-neutral-100 p-2 dark:bg-neutral-900 md:mt-2 md:flex md:items-center">
                <h1 className="mb-2 ml-7 text-2xl font-semibold text-black dark:text-white md:mb-0">
                    Stats for
                </h1>
                <div className="ml-7 flex flex-row">
                    <Avatar className="h-16 w-16 ">
                        {user.image ? (
                            <Image
                                src={user.image}
                                fill
                                alt="profile-picture"
                                referrerPolicy="no-referrer"
                            />
                        ) : (
                            <AvatarFallback className="bg-white dark:bg-black">
                                <UserIcon className="text-black dark:text-white" />
                            </AvatarFallback>
                        )}
                    </Avatar>
                    <div className="ml-7 flex flex-col justify-center text-black dark:text-white">
                        <Link
                            href={data.external_urls.spotify}
                            className="flex w-min flex-row items-center text-2xl font-medium text-green-500 "
                        >
                            {user.name}
                        </Link>
                        <h3 className="text-base text-neutral-500 dark:text-neutral-400">
                            {user.email}
                        </h3>
                    </div>
                </div>
                <CurrentPlayerInfo user={user} />
            </div>
        )
    );
};

export default UserInfoPanel;
