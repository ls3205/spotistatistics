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

const generateCodeChallenge = async (codeVerifier: string) => {
    const base64encode = (string: string) => {
        // @ts-expect-error
        return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await subtle.digest('SHA-256', data)

    //@ts-expect-error
    return base64encode(digest);
}

export const generateAuthURL = async (): Promise<string> => {
    let codeVerifierStr = generateRandomString(128);

    const args = generateCodeChallenge(codeVerifierStr).then(codeChallenge => {
        let state = generateRandomString(16);
        let scope = 'user-read-private user-read-email';

        // localStorage.setItem('code_verifier', codeVerifier);

        let params = new URLSearchParams({
            response_type: 'code',
            scope: scope,
            state: state,
            client_id: process.env.SPOTIFY_CLIENT_ID!,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge
        });

        return params
    })

    const argsFinal = await args;

    return 'https://accounts.spotify.com/authorize?' + argsFinal
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
                response_type: 'code',
                scope: 'user-read-private user-read-email',
                state: generateRandomString(16),
                client_id: process.env.SPOTIFY_CLIENT_ID!,
            }),
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
        redirect({url, baseUrl}) {
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

        const data = 'grant_type=authorization_code';

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