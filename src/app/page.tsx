import HomePage from "@/components/HomePage/HomePage";
import UserInfoPanel from "@/components/HomePage/UserInfoPanel";
import Navbar from "@/components/Navbar";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await getAuthSession();

    return session && session.user ? (
        <main className="flex min-h-screen flex-col items-center bg-white pb-10 text-white subpixel-antialiased dark:bg-black dark:text-black">
            <Navbar />
            <UserInfoPanel user={session.user} />
            <HomePage user={session.user} />
        </main>
    ) : (
        redirect("/sign-in")
    );
}
