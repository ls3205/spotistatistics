import ThemeToggle from "@/components/ThemeToggle";
import SignInButton from "@/components/UserAuthForm";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
    return (
        <main className="flex min-h-[100svh] min-w-full flex-col items-center justify-center bg-white align-middle dark:bg-black">
            <ThemeToggle className="absolute right-5 bottom-5" />
            <SignInButton />
        </main>
    );
};

export default page;
