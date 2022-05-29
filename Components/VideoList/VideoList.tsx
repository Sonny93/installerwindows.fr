import React, { useEffect, useState } from 'react';
import MediaQuery from 'react-responsive';

import Carousel, { ResponsiveType } from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import styles from '../../styles/videos.module.scss';
import VideoItem from './VideoItem';

export default function VideoList({
    queries,
    carouselQueries,
    videos,
    currentVideo,
    deviceType,
    carouselRef,
    handleChangeVideo
}: {
    queries: { minWidth: number; maxWidth: number; }
    carouselQueries: ResponsiveType;
    videos: Video[];
    currentVideo: Video;
    deviceType: string;
    carouselRef: React.Ref<any>;
    handleChangeVideo: (currentVideoId: string, videos: Video[], direction: 'next' | 'keep' | 'previous') => void;
}) {
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (<>
        <MediaQuery minWidth={queries.minWidth}>
            <div className={styles['video-list']}>
                <Carousel
                    responsive={carouselQueries}
                    itemClass={styles['carousel-item']}
                    deviceType={deviceType}
                    ssr={true}
                    showDots={true}
                    shouldResetAutoplay={false}
                    swipeable={true}
                    draggable={true}
                    ref={carouselRef}
                >
                    {videos.map((video, key) => (
                        <VideoItem
                            video={video}
                            videos={videos}
                            currentVideo={currentVideo}
                            handleChangeVideo={handleChangeVideo}
                            key={key}
                        />
                    ))}
                </Carousel>
            </div>
        </MediaQuery>
        <MediaQuery maxWidth={queries.maxWidth}>
            <div className={styles['button-list-container']}>
                <button className={styles['button-list']} onClick={handleOpenModal}>
                    Afficher les vidéos
                </button>
            </div>
            {showModal && (<div className={styles['modal']}>
                <div className={styles['button-list-container']}>
                    <button className={styles['button-list']} onClick={handleCloseModal}>
                        Fermer les vidéos
                    </button>
                </div>
                <div className={styles['video-list-mobile']}>
                    {videos.map((video, key) => (
                        <VideoItem
                            video={video}
                            videos={videos}
                            currentVideo={currentVideo}
                            handleChangeVideo={handleChangeVideo}
                            onClick={handleCloseModal}
                            key={key}
                        />
                    ))}
                </div>
            </div>)}
        </MediaQuery>
    </>);
}