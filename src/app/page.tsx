import RecentlyPlayed from "@/components/HomePage/RecentlyPlayed";
import TopArtists from "@/components/HomePage/TopArtists";
import TopSongs from "@/components/HomePage/TopSongs";
import UserInfoPanel from "@/components/HomePage/UserInfoPanel";
import Navbar from "@/components/Navbar";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await getAuthSession();

    return session && session.user ? (
        <main className="flex min-h-screen flex-col items-center bg-white text-white subpixel-antialiased dark:bg-black dark:text-black">
            <Navbar />
            <UserInfoPanel user={session.user} />
            <TopArtists user={session.user} />
            <TopSongs user={session.user} />
            <RecentlyPlayed user={session.user} />
        </main>
    ) : (
        redirect("/sign-in")
    );
}
