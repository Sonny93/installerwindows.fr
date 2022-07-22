import React from 'react';
import { FaDiscord } from 'react-icons/fa';

import styles from './needhelp.module.scss';

export default function NeedHelp() {
    return <>
        <a
            href='https://discord.gg/informatique'
            rel='noreferrer'
            className={`reset ${styles['ineedhelp']}`}
            target='_blank'
            data-tip="Besoin d'aide ?"
        >
            <FaDiscord />
        </a>
    </>;
}