import Link from 'next/link';

import styles from './markdown.module.scss';

interface ChaptersProps {
    chapters: Chapter[];
    onSelect?: (event: any, chapter: Chapter) => void;
}
export default function Chapters({ chapters, onSelect }: ChaptersProps) {
    return (
        <ul className={styles['chapters']}>
            {chapters.map((chapter) => (
                <Chapter chapter={chapter} onSelect={onSelect} key={chapter.id} />
            ))}
        </ul>
    );
}

function Chapter({ chapter, onSelect }: { chapter: Chapter; onSelect: ChaptersProps['onSelect'] }) {
    const { id, name } = chapter;
    return (
        <li>
            <Link
                href={`#${id}`}
                className="reset"
                onClick={(event) => onSelect && onSelect(event, { id, name })}
                title={name}
            >
                {name}
            </Link>
        </li>
    );
}
