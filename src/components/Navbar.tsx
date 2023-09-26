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
            <div className="relative left-0 top-0 hidden w-full flex-row items-center justify-center md:flex">
                <div className="mt-2 flex h-14 w-4/5 flex-row items-center rounded-md bg-neutral-100 dark:bg-neutral-900">
                    <div className="relative mr-auto">
                        <p>spotistatistics</p>
                    </div>
                    <div className="relative ml-auto flex flex-row justify-center">
                        <ThemeToggle />
                        <AccountDropdown user={session.user} />
                    </div>
                </div>
            </div>

            <Sheet>
                <SheetTrigger className="relative md:hidden w-[95%] h-auto bg-neutral-100 dark:bg-neutral-900 rounded-md my-2 p-2 flex flex-row justify-center">
                    <AlignJustifyIcon className="text-black dark:text-white absolute left-[2.5%]" />
                    <h1 className="text-black dark:text-white">spotistatistics</h1>
                </SheetTrigger>
                <SheetContent
                    side={"left"}
                    className="flex flex-col border-neutral-100 bg-white dark:border-neutral-900 dark:bg-black"
                >
                    <div className="h-full bg-neutral-100 dark:bg-neutral-900 rounded-md">spotistatistics</div>
                    <div className="relative mt-auto flex flex-row justify-center rounded-md bg-neutral-100 py-5 dark:bg-neutral-900">
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
