import { NextSeo } from "next-seo";

import Controls from "components/ErrorPage/Controls";
import styles from "styles/error-page.module.scss";

export default function Custom500() {
  return (
    <>
      <NextSeo
        title="Une erreur est survenue"
        description="Une erreur est survenue"
      />
      <div className={styles["App"]}>
        <div className={styles["title"]}>
          <h1>Oups</h1>
          <h2>Une erreur côté serveur est survenue.</h2>
        </div>
        <Controls />
      </div>
    </>
  );
}
