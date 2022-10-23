import React from 'react';
import styles from './Meta.module.scss';

export default function Title({ title = null }: { title: string; }) {
    return <>
        <h1 className={styles['title']}>
            {title || 'Titre indisponible'}
        </h1>
    </>;
}