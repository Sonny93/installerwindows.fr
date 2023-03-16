import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getServerSession } from 'next-auth/next';
import { getProviders, signIn } from 'next-auth/react';
import Footer from '../Components/Footer/Footer';
import Navbar from '../Components/Navbar/Navbar';
import { authOptions } from './api/auth/[...nextauth]';

export default function SignIn({
    providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div>
            <Navbar />
            <h1>Se connecter</h1>
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button onClick={() => signIn(provider.id)}>{provider.name}</button>
                </div>
            ))}
            <Footer />
        </div>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (session) {
        return { redirect: { destination: '/' } };
    }

    const providers = await getProviders();
    return {
        props: { providers: providers ?? [] },
    };
}
