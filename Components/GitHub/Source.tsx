import { urlify } from '../../Utils';
import styles from '../../styles/markdown.module.scss';

export default function Source({ url, raw }: { url: string; raw: string; }) {
	return (<>
		<code className={styles['source']}
			dangerouslySetInnerHTML={{
				__html: `Source : ${urlify(url)}
					<br />
					Raw : ${urlify(raw)}`
			}}
		/>
	</>);
}