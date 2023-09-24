import React from "react";
import ThemeToggle from "./ThemeToggle";
import AccountDropdown from "./AccountDropdown";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "./ui/Sheet";
import { AlignJustifyIcon } from "lucide-react";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = async ({}) => {
    const session = await getServerSession();

    return session?.user ? (
        <>
            <div className="absolute left-0 top-0 hidden w-full flex-row items-center justify-center md:flex">
                <div className="mt-2 flex h-20 w-4/5 flex-row items-center rounded-2xl bg-neutral-100 dark:bg-neutral-900">
                    <div className="relative mr-auto">
                        <p>spotistatistics</p>
                    </div>
                    <div className="relative ml-auto">
                        <ThemeToggle />
                        <AccountDropdown user={session.user} />
                    </div>
                </div>
            </div>

            <Sheet>
                <SheetTrigger className="absolute left-5 top-5 md:hidden">
                    <AlignJustifyIcon className="text-black dark:text-white" />
                </SheetTrigger>
                <SheetContent
                    side={"left"}
                    className="flex flex-col border-neutral-100 bg-white dark:border-neutral-900 dark:bg-black"
                >
                    <div className="h-full bg-neutral-100 dark:bg-neutral-900 rounded-2xl">spotistatistics</div>
                    <div className="relative mt-auto flex flex-row justify-center rounded-2xl bg-neutral-100 py-5 dark:bg-neutral-900">
                        <ThemeToggle />
                        <AccountDropdown user={session.user} />
                    </div>
                </SheetContent>
            </Sheet>
        </>
    ) : (
        redirect("/sign-in")
    );
};

export default Navbar;
