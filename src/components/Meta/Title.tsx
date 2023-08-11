import styles from "./meta.module.scss";

export default function Title({ title = null }: { title: string }) {
  return <h1 className={styles["title"]}>{title || "Titre indisponible"}</h1>;
}
