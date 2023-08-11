import styles from "styles/markdown.module.scss";
import { urlify } from "utils/string";

export default function Source({ url, raw }: { url?: string; raw?: string }) {
  if (!url && !raw) {
    return <></>;
  }

  return (
    <code className={styles["source"]}>
      {url && (
        <p dangerouslySetInnerHTML={{ __html: `Source : ${urlify(url)}` }} />
      )}
      {raw && (
        <p dangerouslySetInnerHTML={{ __html: `Raw : ${urlify(raw)}` }} />
      )}
    </code>
  );
}
