"use client";

import React from "react";
import { Button } from "./ui/Button";
import Image from "next/image";
import { signIn } from "next-auth/react";

interface SignInButtonProps {}

const SignInButton: React.FC<SignInButtonProps> = ({}) => {
    const loginWithSpotify = async () => {
        try {
            await signIn("spotify");
        } catch (err) {
            console.error(err);
        } finally {
        }
    };

    return (
        <Button variant={"ghost"} onClick={loginWithSpotify}>
            <Image
                src={
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/512px-Spotify_icon.svg.png"
                }
                alt="spotify-svg"
                width={25}
                height={25}
            />
            <p className="ml-2 text-lg">Login with Spotify</p>
        </Button>
    );
};

export default SignInButton;
