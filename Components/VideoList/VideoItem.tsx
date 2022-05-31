import React from 'react';
import Image from 'next/image';

import styles from '../../styles/videos.module.scss';

export default function VideoItem({
    video,
    videos,
    currentVideo,
    handleChangeVideo,
    onClick
}: {
    video: Video;
    currentVideo: Video;
    videos: Video[];
    handleChangeVideo: (currentVideoId: string, videos: Video[], direction: 'next' | 'keep' | 'previous') => void;
    onClick?: Function;
}) {
    const { videoId, title } = video;
    const miniatureUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    const onItemClick = () => {
        if (onClick)
            onClick();

        if (currentVideo.videoId !== videoId)
            handleChangeVideo(videoId, videos, 'keep');
    }

    const className = `${styles['box']} ${currentVideo.videoId === videoId ? styles['selected'] : ''}`;
    return (<>
        <div className={className} onClick={onItemClick}>
            <Image
                height={140}
                width={250}
                priority={true}
                layout='raw'
                src={miniatureUrl}
                alt='Miniature YTB'
            />
            <div className={styles['title']}>{title}</div>
        </div>
    </>);
}