import React from 'react';
import { FaDiscord } from 'react-icons/fa';

import styles from './needhelp.module.scss';

export default function NeedHelp() {
    return <>
        <a href='https://discord.gg/informatique' rel='noreferrer' className={styles['ineedhelp']} target='_blank'>
            <svg width='165px' height='50px' viewBox='0 0 165 50' className={styles['border']}>
                <polyline points='164,1 164,49 1,49 1,1 164,1' className={styles['bg-line']} />
                <polyline points='164,1 164,49 1,49 1,1 164,1' className={styles['hl-line']} />
            </svg>
            <div className={styles['text']}>
                <FaDiscord /> Besoin d'aide ?
            </div>
        </a>
    </>;
}