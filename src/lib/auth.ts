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
            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.display_name,
                    email: profile.email,
                    image: profile.images?.[0]?.url
                }
            }
        })
    ],
    callbacks: {
        async session({ session, user }) {
            session.user = user

            return session
        },
        async jwt({ token, profile, account }) {
            if (account) {
                token.accessToken = account.refresh_token;
            }

            return token
        },
        redirect() {
            return '/'
        }
    }
}

export const getAuthSession = () => getServerSession(authOptions)