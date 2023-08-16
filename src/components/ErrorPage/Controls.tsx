import Link from "next/link";
import styles from "styles/error-page.module.scss";

export default function Controls() {
  return (
    <div className={styles["controls"]}>
      <Link href={"/"}>⟵ Page d'accueil</Link>
      <hr />
      <Link href={"/videos"}>Guide vidéo</Link>
      <Link href={"/guides"}>Voir les guides textuels</Link>
    </div>
  );
}
