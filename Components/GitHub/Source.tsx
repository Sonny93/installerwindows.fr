import { urlify } from '../../Utils';
import styles from '../../styles/markdown.module.scss';

export default function Source({ url, raw }: { url?: string; raw?: string }) {
    if (!url && !raw) {
        return <></>;
    }

    return (
        <code className={styles['source']}>
            {url && <div dangerouslySetInnerHTML={{ __html: `Source : ${urlify(url)}` }} />}
            {raw && <div dangerouslySetInnerHTML={{ __html: `Raw : ${urlify(raw)}` }} />}
        </code>
    );
}
