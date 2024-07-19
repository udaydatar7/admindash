import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [Google({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string,
        authorization:{
            params: {
                prompt: "consent",
                access_type: "offline",
                response_type:"code"
            }
        }
    })]
}

export default NextAuth(authOptions);