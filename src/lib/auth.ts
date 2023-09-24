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
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async session({ token, session }) {
            if (token) {
                session.user!.name = token.name
                session.user!.email = token.email
                session.user!.image = token.image as string
            }

            return session
        },
        async jwt({ token, profile }) {
            return {
                token: token,
                name: profile?.name,
                email: profile?.email,
                image: profile?.image,
            }
        },
        redirect() {
            return '/'
        }
    }
}

export const getAuthSession = () => getServerSession(authOptions)