import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface SpotifyImageArr {
    url: string;
    height: number;
    width: number;
}

export interface ArtistCardProps {
    artist: {
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
    };
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
    return (
        <Link href={artist.external_urls.spotify} className="flex h-auto w-auto flex-col justify-center">
            <Image
                src={artist.images[1].url}
                alt="artist-image"
                width={artist.images[1].width}
                height={artist.images[1].width}
            />
            <h1>{artist.name}</h1>
        </Link>
    );
};

export default ArtistCard;
