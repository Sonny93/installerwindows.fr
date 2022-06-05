import { urlify } from '../../Utils';
import styles from '../../styles/markdown.module.scss';

export default function Source({ url, raw }: { url: string; raw: string; }) {
	return (<>
		<code className={styles['source']}>
			<div dangerouslySetInnerHTML={{ __html: `Source : ${urlify(url)}` }} />
			<div dangerouslySetInnerHTML={{ __html: `Raw : ${urlify(raw)}` }} />
		</code>
	</>);
}