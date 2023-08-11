import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getServerSession } from "next-auth/next";
import { getProviders, signIn } from "next-auth/react";
import { FaDiscord } from "react-icons/fa";

import Footer from "components/Footer/Footer";
import Navbar from "components/Navbar/Navbar";

import { authOptions } from "./api/auth/[...nextauth]";

import styles from "styles/signin.module.scss";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={styles["signin"]}>
      <Navbar />
      <main>
        <h1>Se connecter</h1>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              Se connecter via <FaDiscord /> {provider.name}
            </button>
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();
  return {
    props: { providers: providers ?? [] },
  };
}
