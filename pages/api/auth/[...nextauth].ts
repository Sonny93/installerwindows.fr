import NextAuth, { NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { db } from '../../../lib/db';

export const authOptions = {
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
        }),
    ],
    secret: process.env.SECRET,
    callbacks: {
        async signIn({ account: accountParam, profile }) {
            console.log(
                'User',
                accountParam.providerAccountId,
                profile.email,
                profile.name,
                'try to connect via',
                accountParam.provider
            );

            const userIndex = db.data.admin_accounts.findIndex(
                (userId) => userId === accountParam.providerAccountId
            );
            if (userIndex === -1) {
                return false;
            }

            console.log(
                'User',
                accountParam.providerAccountId,
                profile.email,
                profile.name,
                'connected via',
                accountParam.provider
            );

            return true;
        },
    },
    pages: {
        signIn: '/signin',
    },
} as NextAuthOptions;
export default NextAuth(authOptions);
