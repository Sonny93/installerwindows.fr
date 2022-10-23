import React, { useCallback, useEffect, useState } from 'react';

import { ResponsiveType } from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import VideoItem from './VideoItem';
import styles from './VideoList.module.scss';

const MOBILE_MEDIA_QUERY = 900;

export default function VideoList({
    videos,
    currentVideo,
    handleChangeVideo
}: {
    videos: Video[];
    currentVideo: Video;
    handleChangeVideo: (currentVideoId: string, videos: Video[], direction: 'next' | 'keep' | 'previous') => void;
}) {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const handleResize = useCallback(({ target }) => target.innerWidth === MOBILE_MEDIA_QUERY ? handleCloseModal() : null, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    return (<>
        <div className={styles['video-list-desktop']}>
            <ul className={styles['video-list']}>
                {videos.map((video, key) => (
                    <VideoItem
                        video={video}
                        videos={videos}
                        currentVideo={currentVideo}
                        handleChangeVideo={handleChangeVideo}
                        key={key}
                    />
                ))}
            </ul>
        </div>
        <div className={styles['video-list-mobile']}>
            <button type='button' className={styles['button-list']} onClick={handleOpenModal}>
                Afficher les vidéos
            </button>
            {isModalOpen && (
                <div className={styles['modal']}>
                    <button type='button' className={styles['button-list']} onClick={handleCloseModal}>
                        Fermer les vidéos
                    </button>
                    <ul className={styles['video-list']}>
                        {videos.map((video, key) => (
                            <VideoItem
                                video={video}
                                videos={videos}
                                currentVideo={currentVideo}
                                handleChangeVideo={handleChangeVideo}
                                key={key}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    </>);
}