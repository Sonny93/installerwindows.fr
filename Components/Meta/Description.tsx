import React from 'react';
import { urlify } from '../../Utils/index';
import styles from '../../styles/videos.module.scss';

export default function Description({
    description = 'Discord : https://discord.gg/informatique'
}: { description: string; }) {
    return (<>
        <div
            className={styles['description']}
            dangerouslySetInnerHTML={{ __html: urlify(description) }}
        />
    </>);
}