import NextAuth, { NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

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
                'Connexion via',
                accountParam.provider,
                accountParam.providerAccountId,
                profile.email,
                profile.name
            );

            return true;
        },
    },
    pages: {
        signIn: '/signin',
    },
} as NextAuthOptions;
export default NextAuth(authOptions);
