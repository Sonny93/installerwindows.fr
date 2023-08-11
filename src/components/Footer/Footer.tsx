import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import Avatar from "components/Avatar/Avatar";
import ExternalLink from "components/ExternalLink";

import packageJson from "../../../package.json";
import styles from "./footer.module.scss";

export default function Footer() {
  const session = useSession();

  return (
    <footer className={styles["footer"]}>
      <p>
        Réalisé avec ❤️ par{" "}
        <ExternalLink href={"https://www.sonny.dev/"}>Sonny</ExternalLink> &{" "}
        <ExternalLink href={"https://github.com/Asthox"}>Asthox</ExternalLink>,
        rédaction par{" "}
        <ExternalLink href={"https://www.youtube.com/c/Piwi_youtube"}>
          Piwi
        </ExternalLink>
      </p>
      <ul className={styles["links"]}>
        <li>
          <Link href={"/videos"}>Vidéos</Link>
        </li>
        <li>
          <Link href={"/guides"}>Guides</Link>
        </li>
        <li>
          <Link href={"/cgu"}>CGU</Link>
        </li>
        {session.data ? (
          <>
            <li style={{ display: "flex", alignItems: "center", gap: ".25em" }}>
              <Avatar
                src={session.data?.user?.image}
                username={session.data?.user?.name}
              />
              {session.data?.user?.name}
            </li>
            <li
              onClick={() => signOut()}
              style={{ color: "salmon", cursor: "pointer" }}
            >
              Déconnexion
            </li>
          </>
        ) : (
          <li>
            <Link href={"/signin"}>Connexion</Link>
          </li>
        )}
        <li>
          <ExternalLink href={"https://github.com/Sonny93/installerwindows.fr"}>
            v{packageJson.version}
          </ExternalLink>
        </li>
      </ul>
    </footer>
  );
}
