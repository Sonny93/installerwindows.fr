import React, { useState } from 'react';
import Link from 'next/link';

import YouTube, { YouTubeProps } from 'react-youtube';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { AiOutlineHome } from 'react-icons/ai';

import styles from './VideoPlayer.module.scss';

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
    currentVideo,
    handleChangeVideo,
    canGoNext,
    canGoPrevious
}: {
    currentVideo: Video;
    handleChangeVideo: (currentVideoId: string, direction: 'previous' | 'next') => void;
    canGoPrevious: boolean;
    canGoNext: boolean;
}) {
    const [playerLoaded, setPlayerLoaded] = useState<boolean>(false);

    const onLeftArrowClick = () => handleChangeVideo(currentVideo.videoId, 'previous');
    const onRightArrowClick = () => handleChangeVideo(currentVideo.videoId, 'next');

    const playerOnReady = () => setPlayerLoaded(true);

    const classNameWrapper = `${styles['wrapper-video-player']} ${playerLoaded ? styles['loaded'] : ''}`;
    return (<>
        <div className={classNameWrapper}>
            <div className={styles['player-video']}>
                <YouTube
                    videoId={currentVideo.videoId}
                    opts={options}
                    containerClassName={styles['video-player-container']}
                    onReady={playerOnReady}
                />
            </div>
            <div className={styles['mobile-controls']}>
                <div className={styles['controls']}>
                    <FaArrowLeft
                        className={!canGoPrevious ? styles['disabled'] : null}
                        onClick={onLeftArrowClick}
                    />
                </div>
                <Link href={'/'}>
                    <a className={`${styles['home-btn']} reset`}>
                        <AiOutlineHome />
                    </a>
                </Link>
                <div className={styles['controls']}>
                    <FaArrowRight
                        className={!canGoNext ? styles['disabled'] : null}
                        onClick={onRightArrowClick}
                    />
                </div>
            </div>
        </div>
    </>);
}