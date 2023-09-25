import TopArtists from "@/components/HomePage/TopArtists";
import UserInfoPanel from "@/components/HomePage/UserInfoPanel";
import Navbar from "@/components/Navbar";
import { getAuth } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await getServerSession();
    // const accessToken = await getAuth();

    return session ? (
        <main className="flex min-h-screen flex-col items-center bg-white text-white subpixel-antialiased dark:bg-black dark:text-black">
            <Navbar />
            <UserInfoPanel user={session.user ? session.user : null} />
            {/* <TopArtists user={session.user ? session.user : null} accessToken={accessToken} /> */}
        </main>
    ) : (
        redirect("/sign-in")
    );
}
