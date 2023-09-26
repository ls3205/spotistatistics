"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { User } from "next-auth";
import React from "react";
import ArtistCard, { ArtistCardProps, SpotifyImageArr } from "../ArtistCard";
import Link from "next/link";
import Image from "next/image";

interface TopArtistsProps {
    user: Pick<User, "name" | "image" | "email" | "accessToken">;
}

export interface TopArtistsDataReturn {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: ArtistCardProps[];
}

const TopArtists: React.FC<TopArtistsProps> = ({ user }) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["GetTopArtists"],
        queryFn: async () => {
            const { data } = await axios.get(
                "https://api.spotify.com/v1/me/top/artists",
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`,
                        "Content-Type": "application/json",
                    },
                },
            );
            return data.items;
        },
    });

    if (isLoading) {
        return (
            <div className="m-2 flex h-auto w-[95%] items-center justify-center rounded-md bg-neutral-100 p-2 align-middle dark:bg-neutral-900">
                <Loader2 className="animate-spin text-black dark:text-white" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="m-2 h-auto w-[95%] rounded-md bg-neutral-100 p-2 dark:bg-neutral-900">
                <h1 className="text-black dark:text-white">something broke</h1>
            </div>
        );
    }

    return (
        <div className="m-2 h-auto w-[95%] rounded-md bg-neutral-100 p-2 dark:bg-neutral-900">
            {data
                ? data.forEach(
                      (item: {
                          external_urls: {
                              spotify: string;
                          };
                          followers: {
                              href: string;
                              total: number;
                          };
                          genres: string[];
                          href: string;
                          id: string;
                          images: SpotifyImageArr[];
                          name: string;
                          popularity: number;
                          type: string;
                          uri: string;
                      }) => {
                          return (
                              <Link
                                  href={item.external_urls.spotify}
                                  className="flex h-auto w-auto flex-col justify-center"
                              >
                                  <Image
                                      fill
                                      src={item.images[1].url}
                                      alt="artist-image"
                                      width={item.images[1].width}
                                      height={item.images[1].width}
                                  />
                                  <h1>{item.name}</h1>
                              </Link>
                          );
                      },
                  )
                : ""}
        </div>
    );
};

export default TopArtists;
