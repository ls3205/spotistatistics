"use client";

import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/Dropdown";
import { getAuthSession } from "@/lib/auth";
import { Avatar, AvatarFallback } from "./ui/Avatar";
import Image from "next/image";
import { LogOutIcon, UserIcon } from "lucide-react";
import { Button } from "./ui/Button";
import { signOut } from "next-auth/react";
import { User } from "next-auth";

interface AccountDropdownProps {
    user: Pick<User, "name" | "image" | "email">;
}

const AccountDropdown: React.FC<AccountDropdownProps> = ({ user }) => {
    console.log(user);

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
                <DropdownMenuItem className="flex flex-row">
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
                        <h1>{user.name}</h1>
                        <h3>{user.email}</h3>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Button
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
