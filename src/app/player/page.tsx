import Navbar from "@/components/Navbar";
import { getAuthSession } from "@/lib/auth";
import { ConstructionIcon } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = async ({}) => {
    const session = await getAuthSession();
    return session && session.user ? (
        <main className="flex min-h-screen min-w-[400px] flex-col items-center bg-white pb-10 text-black subpixel-antialiased dark:bg-black dark:text-white">
            <Navbar user={session.user} />
            <div className="absolute top-1/2 flex -translate-y-1/2 flex-col items-center">
                <ConstructionIcon className="text-green-500" size={"50px"} />
                <h1 className="text-4xl font-bold text-green-500">
                    Under Construction
                </h1>
            </div>
        </main>
    ) : (
        redirect("/sign-in")
    );
};

export default page;
