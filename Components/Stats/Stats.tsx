import { useMemo } from 'react';

import styles from './stats.module.scss';

export default function Stats({ markdownContent }: { markdownContent: string }) {
    const contentSplitted = useMemo<string[]>(
        () => markdownContent.replaceAll('\n', ' ').replaceAll('\r', ' ').split(' '),
        [markdownContent]
    );
    const wordCount = useMemo<number>(() => contentSplitted.length, [contentSplitted.length]);
    const charCount = useMemo<number>(() => contentSplitted.join('').length, [contentSplitted]);

    return (
        <ul className={styles['stats']}>
            <li>{wordCount} mots</li>
            <li>{charCount} caractères</li>
        </ul>
    );
}
