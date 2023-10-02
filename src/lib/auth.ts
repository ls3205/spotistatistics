import axios from "axios";
import { subtle } from "crypto";
import { NextAuthOptions, getServerSession } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

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
                scope: 'user-read-private user-read-email user-top-read user-read-recently-played user-read-playback-state',
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

                return token

                //@ts-expect-error
            } else if (Date.now() < token.tokenExpires * 1000) {
                return token
            } else {
                try {
                    const { data } = await axios.post(`https://accounts.spotify.com/api/token`, {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            Authorization: 'Basic ' + (Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
                        },
                        params: {
                            grant_type: "refresh_token",
                            refresh_token: token.refreshToken
                        },
                        json: true
                    })

                    token.accessToken = data.access_token
                    token.tokenExpires = Math.floor(Date.now() / 1000 + data.expires_in)

                    return token
                } catch (err) {
                    console.error("Error refreshing access token", err)
                    return { ...token, error: "RefreshAccessTokenError" as const }
                }
            }
        },
        redirect({ url, baseUrl }) {
            return '/'
        }
    }
}

export const getAuthSession = () => getServerSession(authOptions)