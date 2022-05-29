import React, { useState } from 'react';
import Link from 'next/link';

import YouTube, { YouTubeProps } from 'react-youtube';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { AiOutlineHome } from 'react-icons/ai';

import styles from '../../styles/videos.module.scss';

const options: YouTubeProps['opts'] = {
    width: '853',
    height: '480',
    playerVars: {
        autoplay: 0,
        modestbranding: 1,
        showinfo: 1,
        rel: 0,
        playsinline: 1
    }
}

export default function VideoPlayer({
    videos,
    currentVideo,
    deviceType,
    handleChangeVideo,
    canGoNext,
    canGoPrevious
}: {
    videos: Video[];
    currentVideo: Video;
    deviceType: string;
    handleChangeVideo: (currentVideoId: string, videos: Video[], direction: 'next' | 'keep' | 'previous') => void;
    canGoPrevious: boolean;
    canGoNext: boolean;
}) {
    const [playerLoaded, setPlayerLoaded] = useState<boolean>(false);

    const onLeftArrowClick = () => canGoPrevious ? handleChangeVideo(currentVideo.videoId, videos, 'previous') : null;
    const onRightArrowClick = () => canGoNext ? handleChangeVideo(currentVideo.videoId, videos, 'next') : null;

    const playerOnReady = () => setPlayerLoaded(true);

    const classNameWrapper = `${styles['wrapper-video-player']} ${playerLoaded ? styles['loaded'] : ''}`;
    if (deviceType !== 'mobile') {
        return (<>
            <div className={classNameWrapper}>
                <div className={styles['controls']}>
                    <FaArrowLeft
                        className={!canGoPrevious ? styles['disabled'] : null}
                        onClick={onLeftArrowClick}
                    />
                </div>
                <div className={styles['player-video']}>
                    <YouTube
                        videoId={currentVideo.videoId}
                        opts={options}
                        onReady={playerOnReady}
                    />
                </div>
                <div className={styles['controls']}>
                    <FaArrowRight
                        className={!canGoNext ? styles['disabled'] : null}
                        onClick={onRightArrowClick}
                    />
                </div>
            </div>
        </>);
    }
    return (<>
        <div className={classNameWrapper + ' ' + styles['mobile']}>
            <div className={styles['mobile-controls']}>
                <div className={styles['controls']}>
                    <FaArrowLeft
                        className={!canGoPrevious ? styles['disabled'] : null}
                        onClick={onLeftArrowClick}
                    />
                </div>
                <Link href={'/'}>
                    <a className={`${styles['home-btn']} reset`}>
                        <AiOutlineHome /> Accueil
                    </a>
                </Link>
                <div className={styles['controls']}>
                    <FaArrowRight
                        className={!canGoNext ? styles['disabled'] : null}
                        onClick={onRightArrowClick}
                    />
                </div>
            </div>
            <div className={styles['player-video']}>
                <YouTube
                    videoId={currentVideo.videoId}
                    opts={options}
                    onReady={playerOnReady}
                />
            </div>
        </div>
    </>);
}