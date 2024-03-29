import { urlify } from "utils/string";

import styles from "./meta.module.scss";

export default function Description({
  description = "Discord : https://discord.gg/informatique",
}: {
  description: string;
}) {
  return (
    <div
      className={styles["description"]}
      dangerouslySetInnerHTML={{ __html: urlify(description) }}
    />
  );
}
