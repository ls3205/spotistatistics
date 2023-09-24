import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await getServerSession();

    return session ? (
        <main className="flex min-h-screen flex-col items-center bg-white dark:bg-black">
            <Navbar />
        </main>
    ) : (
        redirect('/sign-in')
    );
}
