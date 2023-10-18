import Providers from "@/components/Providers";
import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Musistics",
    description: "A Spotify statistics app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inclusive+Sans&display=swap"
                    rel="stylesheet"
                />
                <link
                    rel="icon"
                    href="/icon?<generated>"
                    type="image/png"
                    sizes="32x32"
                />
            </head>
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
