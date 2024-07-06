import Image from "next/image";
import React from "react";
import SpotifyLogo from "@/public/spotify_logo.png";
import { cn } from "@/lib/utils";

interface SpotifyTagProps {
    className?: string;
}

const SpotifyTag: React.FC<SpotifyTagProps> = ({ className }) => {
    return (
        <div
            className={cn(
                className,
                "overflow-hidden rounded-lg",
            )}
        >
            <Image
                src={SpotifyLogo}
                alt="spotify-logo"
                className="w-full h-full scale-125"
            />
        </div>
    );
};

export default SpotifyTag;
