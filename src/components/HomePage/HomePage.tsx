"use client"

import { User } from "next-auth";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";
import TopArtists from "./TopArtists";
import TopSongs from "./TopSongs";
import RecentlyPlayed from "./RecentlyPlayed";

interface HomePageProps {
    user: Pick<User, "name" | "image" | "email" | "accessToken">;
}

const HomePage: React.FC<HomePageProps> = ({ user }) => {
    const [dataRange, setDataRange] = useState<'short_term' | 'medium_term' | 'long_term'>("short_term");

    useEffect(() => {
        console.log(dataRange)
    }, [dataRange])

    return (
        <>
            <Tabs
                defaultValue={dataRange}
                className="mx-2 flex h-full min-w-[95%] flex-col 2xl:mb-2 2xl:flex-row z-50"
            >
                <TabsList className="fixed bottom-0 left-0 w-full rounded-b-none bg-neutral-100 dark:bg-neutral-900">
                    <TabsTrigger
                        value="short_term"
                        className="rounded-md hover:bg-neutral-200 data-[state=active]:text-green-500 dark:hover:bg-neutral-800 dark:data-[state=active]:text-green-500"
                        onClick={() => setDataRange('short_term')}
                    >
                        4 Weeks
                    </TabsTrigger>
                    <TabsTrigger
                        value="medium_term"
                        className="rounded-md hover:bg-neutral-200 data-[state=active]:text-green-500 dark:hover:bg-neutral-800 dark:data-[state=active]:text-green-500"
                        onClick={() => setDataRange('medium_term')}
                    >
                        6 Months
                    </TabsTrigger>
                    <TabsTrigger
                        value="long_term"
                        className="rounded-md hover:bg-neutral-200 data-[state=active]:text-green-500 dark:hover:bg-neutral-800 dark:data-[state=active]:text-green-500"
                        onClick={() => setDataRange('long_term')}
                    >
                        Lifetime
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="mx-2 flex h-full w-[95%] flex-col 2xl:mb-2 2xl:flex-row">
                <TopArtists user={user} dataRange={dataRange} />
                <TopSongs user={user} dataRange={dataRange} />
                <RecentlyPlayed user={user} />
            </div>
        </>
    );
};

export default HomePage;
