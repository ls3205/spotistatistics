"use client";

import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/Dropdown";
import { Avatar, AvatarFallback } from "./ui/Avatar";
import Image from "next/image";
import { ExternalLink, InfoIcon, LogOutIcon, UserIcon } from "lucide-react";
import { Button, buttonVariants } from "./ui/Button";
import { signOut } from "next-auth/react";
import { User } from "next-auth";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/HoverCard";

interface AccountDropdownProps {
    user: Pick<User, "name" | "image" | "email">;
}

const AccountDropdown: React.FC<AccountDropdownProps> = ({ user }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="mx-2">
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
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col justify-center border-white bg-neutral-100 dark:border-black dark:bg-neutral-900">
                <DropdownMenuItem className="my-2 flex flex-row">
                    <Avatar className="mx-2">
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

                    <div className="flex flex-col">
                        <h1 className="text-lg">{user.name}</h1>
                        <h3>{user.email}</h3>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link
                        href={"https://www.spotify.com/account/apps/"}
                        className={cn(
                            "my-2",
                            buttonVariants({ variant: "secondary" }),
                        )}
                        target="_blank"
                    >
                        <ExternalLink className="mr-2" />
                        Disconnect from Musistics
                        <HoverCard>
                            <HoverCardTrigger className="ml-2">
                                <InfoIcon />
                            </HoverCardTrigger>
                            <HoverCardContent>
                                <div>
                                    To disconnect your Spotify account from
                                    Musistics, click this button, find the app
                                    named "musistics", and select "Remove
                                    Access".
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Button
                        className="my-2"
                        variant={"destructive"}
                        onClick={(e) => {
                            e.preventDefault();
                            signOut({
                                callbackUrl: "/sign-in",
                            });
                        }}
                    >
                        <LogOutIcon className="mr-2" />
                        Sign Out
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AccountDropdown;
