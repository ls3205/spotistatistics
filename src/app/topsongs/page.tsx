import Navbar from "@/components/Navbar";
import TopSongsPage from "@/components/TopSongs/TopSongsPage";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = async ({}) => {
    const session = await getAuthSession();

    return session && session.user ? (
        <main className="flex min-h-screen min-w-[400px] flex-col items-center bg-white pb-10 text-black subpixel-antialiased dark:bg-black dark:text-white">
            <Navbar user={session.user} />
            <TopSongsPage user={session.user} />
        </main>
    ) : (
        redirect("sign-in")
    );
};

export default page;
