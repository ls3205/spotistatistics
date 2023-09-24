import axios from "axios";
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
            authorization: {params: {scope: 'user-read-email,user-top-read'}},
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

export const getAuth = async () => {
    try {
        const client_id = process.env.SPOTIFY_CLIENT_ID!;
        const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
        const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');

        const config = {
            headers: {
                'Authorization': `Basic ${auth_token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        const data = 'grant_type=client_credentials';

        try {
            const response = await axios.post('https://accounts.spotify.com/api/token', data, config);
            const { access_token } = response.data;
            return access_token;
        } catch (error) {
            console.error('Error fetching access token:', error);
            throw error;
        }
    } catch (error) {
        console.log(error);
    }
}

export const getAuthSession = () => getServerSession(authOptions)