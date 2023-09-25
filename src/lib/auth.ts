import axios from "axios";
import { subtle } from "crypto";
import { NextAuthOptions, getServerSession } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const generateRandomString = (length: number) => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

//---------------------------------------------------------------------------


export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/sign-in'
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID!,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
            authorization: 'https://accounts.spotify.com/authorize?' + new URLSearchParams({
                scope: 'user-read-private user-read-email user-top-read',
            }),
        })
    ],
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user!.name = token.name
                session.user!.sub = token.sub
                session.user!.email = token.email
                session.user!.accessToken = token.accessToken as string
                session.user!.tokenExpires = token.tokenExpires as number
                session.user!.refreshToken = token.refreshToken as string
            }

            return session
        },
        async jwt({ token, account }) {

            if (account) {
                token.id = account.id
                token.accessToken = account.access_token
                token.tokenExpires = account.expires_at
                token.refreshToken = account.refresh_token
            }

            return token
        },
        redirect({ url, baseUrl }) {
            return '/'
        }
    }
}

export const getAuthSession = () => getServerSession(authOptions)