import Navbar from "@/components/Navbar";
import RecentlyPlayed from "@/components/RecentlyPlayed";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = async ({}) => {
    const session = await getAuthSession();
    return session && session.user ? (
        <main className="flex min-h-screen min-w-[400px] flex-col items-center bg-white pb-10 text-black subpixel-antialiased dark:bg-black dark:text-white">
            <Navbar user={session.user} />
            <div className="mx-2 mb-2 flex h-full min-w-[95%] max-w-[95%] flex-col items-center xl:min-w-[66.66%] xl:max-w-[66.66%]">
                <RecentlyPlayed
                    user={session.user}
                    className="w-full xl:mt-2"
                    dataLength={50}
                    mobileAccessible={false}
                />
            </div>
        </main>
    ) : (
        redirect("/sign-in")
    );
};

export default page;
