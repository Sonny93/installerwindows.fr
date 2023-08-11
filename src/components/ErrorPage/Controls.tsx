import Link from "next/link";
import styles from "styles/error-page.module.scss";

export default function Controls() {
  return (
    <div className={styles["controls"]}>
      <Link href={"/"}>⟵ Page d'accueil</Link>
      <hr />
      <Link href={"/videos"}>Guide en version vidéo</Link>
      <Link href={"/texte"}>Guide en version texte</Link>
    </div>
  );
}
