import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { FaPencilAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

import Footer from "components/Footer/Footer";
import Navbar from "components/Navbar/Navbar";
import { getGuides } from "lib/db";
import { authOptions } from "../api/auth/[...nextauth]";

import styles from "./guides.module.scss";

interface PageGuidesProps {
  guides: Guide[];
}
export default function PageGuides({ guides }: PageGuidesProps) {
  const session = useSession();

  return (
    <div className={styles["guides"]}>
      <NextSeo
        title={"Guides"}
        description="Tous les guides pour (ré)installer Windows 10/11 au propre et faire des optimisations saines pour votre machine."
      />
      <Navbar />
      <main>
        <h1 style={{ textAlign: "center" }}>Guides</h1>
        {session.data && <Link href={"/guides/create"}>Ajouter un guide</Link>}
        {guides.length > 0 ? (
          <GuideList guides={guides} />
        ) : (
          <p>Aucun guide disponible</p>
        )}
        <p style={{ textAlign: "center" }}>
          Vous souhaitez proposer un nouveau guide ou faire un retour ?<br />
          <Link
            href={"https://discord.com/invite/informatique"}
            target="_blank"
            rel="noreferrer"
          >
            Rejoignez le serveur Discord
          </Link>{" "}
          et faites une proposition dans le salon{" "}
          <Link
            href="https://discord.com/channels/475253577288253440/1036644757524451478"
            target="_blank"
            rel="noreferrer"
          >
            idées-pour-le-serveur
          </Link>
          .
        </p>
      </main>
      <Footer />
    </div>
  );
}

function GuideList({ guides }: { guides: Guide[] }) {
  return (
    <ul className={styles["guide-list"]}>
      {guides.map((guide: Guide) => (
        <GuideItem guide={guide} key={guide.slug} />
      ))}
    </ul>
  );
}

function GuideItem({ guide }: { guide: Guide }) {
  const defaultImageUrl = "/images/guides/default.png";
  const { slug, title, thumbnail, isDraft } = guide;

  const session = useSession();
  const [imageSource, setImageSource] = useState<string>(
    thumbnail || defaultImageUrl
  );

  return (
    <li className={styles["guide-item"]}>
      <Link href={`/guide/${slug}`} className={`reset ${styles["link"]}`}>
        <Image
          src={imageSource}
          onError={() => setImageSource(defaultImageUrl)}
          width={350}
          height={197}
          priority
          alt="Default Guide Thumbnail"
        />
        <span>{title}</span>
        {guide.isDraft}
      </Link>
      {session.data?.user && (
        <>
          {isDraft && <div className={styles["is-draft"]}>Brouillon</div>}
          <div className={styles["controls"]}>
            <Link
              href={`/guides/edit/${slug}`}
              className={`reset ${styles["edit"]}`}
            >
              <FaPencilAlt />
            </Link>
            <Link
              href={`/guides/delete/${slug}`}
              className={`reset ${styles["delete"]}`}
            >
              <RxCross2 />
            </Link>
          </div>
        </>
      )}
    </li>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions);
  const guides = await getGuides();

  const guidesFiltered = session
    ? guides
    : guides.filter(({ isDraft }) => !isDraft);
  return { props: { guides: guidesFiltered } };
}
