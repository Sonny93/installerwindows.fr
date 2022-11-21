import Link from 'next/link';

import { Chapter } from './Markdown';

import styles from './markdown.module.scss';

export default function Chapters({ chapters }: { chapters: Chapter[] }) {
    return (
        <ul className={styles['chapters']}>
            {chapters.map(({ id, name }, index) => (
                <li key={index}>
                    <Link href={`#${id}`} className="reset">
                        {name} <span className={styles['number']}>- {index + 1}</span>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
