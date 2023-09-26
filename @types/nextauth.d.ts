import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            sub?: string,
            accessToken?: string,
            tokenExpires?: number,
            refreshToken?: string
        } & DefaultSession["user"]
    }

    interface JWT extends DefaultJWT {
        accessToken?: string,
        tokenExpires?: number,
        refreshToken?: string
    }

    interface User extends DefaultUser {
        sub?: string
        accessToken?: string
    }
}