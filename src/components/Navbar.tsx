"use client";

import React from "react";
import ThemeToggle from "./ThemeToggle";
import AccountDropdown from "./AccountDropdown";
import { User } from "next-auth";
import { redirect, usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "./ui/Sheet";
import { AlignJustifyIcon } from "lucide-react";
import Link from "next/link";
import { Separator } from "./ui/Separator";

interface NavbarProps {
    user: Pick<User, "name" | "image" | "email" | "accessToken">;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
    const pathname = usePathname();

    return user ? (
        <>
            <div className="relative left-0 top-0 hidden w-full flex-row items-center justify-center xl:flex">
                <div className="mt-2 flex h-14 w-4/5 flex-row items-center rounded-md bg-neutral-100 dark:bg-neutral-900">
                    <div className="relative mr-auto flex h-full w-full flex-row items-center p-2">
                        <Link
                            href={"/"}
                            data-status={pathname == "/"}
                            className="navbar-link"
                        >
                            Musistics
                        </Link>
                        <Separator orientation="vertical" />
                        <Link
                            href={"/topartists"}
                            data-status={pathname === "/topartists"}
                            className="navbar-link"
                        >
                            Top Artists
                        </Link>
                        <Separator orientation="vertical" />
                        <Link
                            href={"/topsongs"}
                            data-status={pathname === "/topsongs"}
                            className="navbar-link"
                        >
                            Top Songs
                        </Link>
                        <Separator orientation="vertical" />
                        <Link
                            href={"/recents"}
                            data-status={pathname === "/recents"}
                            className="navbar-link"
                        >
                            Recently Played
                        </Link>
                        <Separator orientation="vertical" />
                        <Link
                            href={"/player"}
                            data-status={pathname === "/player"}
                            className="navbar-link"
                        >
                            Spotify Player
                        </Link>
                    </div>
                    <div className="relative ml-auto flex h-full flex-row justify-center py-2">
                        <Separator orientation="vertical" />
                        {/* <ThemeToggle /> */}
                        <AccountDropdown user={user} />
                    </div>
                </div>
            </div>

            <Sheet>
                <SheetTrigger className="relative my-2 flex h-auto w-[95%] flex-row justify-center rounded-md bg-neutral-100 p-2 dark:bg-neutral-900 xl:hidden">
                    <AlignJustifyIcon className="absolute left-[2.5%] text-black dark:text-white" />
                    <h1 className="text-black dark:text-white">
                        Musistics
                    </h1>
                </SheetTrigger>
                <SheetContent
                    side={"left"}
                    className="flex flex-col border-neutral-100 bg-white dark:border-neutral-900 dark:bg-black"
                >
                    <div className="flex h-full flex-col items-center justify-center rounded-md bg-neutral-100 dark:bg-neutral-900">
                        <Link
                            href={"/"}
                            data-status={pathname == "/"}
                            className="mobile-navbar-link"
                        >
                            Musistics
                        </Link>
                        <Separator
                            orientation="horizontal"
                            className="relative w-[95%]"
                        />
                        <Link
                            href={"/topartists"}
                            data-status={pathname === "/topartists"}
                            className="mobile-navbar-link"
                        >
                            Top Artists
                        </Link>
                        <Separator
                            orientation="horizontal"
                            className="relative w-[95%]"
                        />
                        <Link
                            href={"/topsongs"}
                            data-status={pathname === "/topsongs"}
                            className="mobile-navbar-link"
                        >
                            Top Songs
                        </Link>
                        <Separator
                            orientation="horizontal"
                            className="relative w-[95%]"
                        />
                        <Link
                            href={"/recents"}
                            data-status={pathname === "/recents"}
                            className="mobile-navbar-link"
                        >
                            Recently Played
                        </Link>
                        <Separator
                            orientation="horizontal"
                            className="relative w-[95%]"
                        />
                        <Link
                            href={"/player"}
                            data-status={pathname === "/player"}
                            className="mobile-navbar-link"
                        >
                            Spotify Player
                        </Link>
                    </div>
                    <div className="relative mt-auto flex flex-row justify-center rounded-md bg-neutral-100 py-5 dark:bg-neutral-900">
                        {/* <ThemeToggle /> */}
                        <AccountDropdown user={user} />
                    </div>
                </SheetContent>
            </Sheet>
        </>
    ) : (
        redirect("/sign-in")
    );
};

export default Navbar;
