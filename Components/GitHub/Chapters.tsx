import Link from 'next/link';

import { Chapter } from './Markdown';

import styles from './markdown.module.scss';

interface ChaptersProps {
    chapters: Chapter[];
    onSelect?: (event: any, chapter: Chapter) => void;
}
export default function Chapters({ chapters, onSelect }: ChaptersProps) {
    return (
        <ul className={styles['chapters']}>
            {chapters.map(({ id, name }, index) => (
                <li key={index}>
                    <Link href={`#${id}`} className="reset" onClick={(event) => onSelect && onSelect(event, { id, name })}>
                        {name}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
