import React from 'react';

import Title from './Title';
import Description from './Description';
import MetaDate from './MetaDate';

import styles from '../../styles/videos.module.scss';

export default function Meta({ video = null }: { video: Video; }) {
    if (!video) {
        throw new Error('Données vidéo manquantes');
    }

    const { title, description, date } = video;
    return (<>
        <div className={styles['meta']}>
            <Title title={title} />
            <MetaDate date={date} />
            <Description description={description} />
        </div>
    </>);
}