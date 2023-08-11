import Link from "next/link";

import LoaderSVG from "./Loader.svg";
import styles from "./loader.module.scss";

export default function FullLoader({
  text = "Chargement en cours",
}: {
  text?: string;
}) {
  return (
    <div className={styles["loader"]}>
      <div className={styles["logo"]}>
        <LoaderSVG />
      </div>
      <div className={styles["text"]}>
        <p>{text}</p>
        <Link
          href="https://discord.gg/informatique"
          rel="noreferrer"
          target="_blank"
        >
          https://discord.gg/informatique
        </Link>
      </div>
    </div>
  );
}
