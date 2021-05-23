import React, { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import MediaQuery from 'react-responsive';
import YouTube from 'react-youtube';

import './video-player.css';

const options = {
    width: 853,
    height: 480,
    playerVars: {
        autoplay: 0,
        modestbranding: 0,
        showinfo: 1,
        rel: 0,
        playsinline: 1
    }
}

let interval = null;

export default function VideoPlayer({ 
    queries, 
    videos,
    currentVideo, 
    currentVideoIndex,
    previousVideo,
    nextVideo,
    carouselDesk,
    itemsToShow
}) {
    return <>
        <div className="video">
            <MediaQuery minWidth={queries.minWidth}>
                <div className="controls">
                    <FaArrowLeft
                        className={currentVideoIndex < 1 ? 'disabled' : null}
                        onClick={() => funcPreviousVideo(previousVideo, currentVideoIndex, carouselDesk, videos, itemsToShow)}
                    />
                </div>
            </MediaQuery>
            <div className="video-content">
                <YouTube 
                    videoId={currentVideo.video_id} 
                    opts={options} 
                    onReady={() => clearInterval(interval)} 
                    onPlay={onPlay}
                    onPause={() => clearInterval(interval)}
                />
            </div>
            <MediaQuery minWidth={queries.minWidth}>
                <div className="controls">
                    <FaArrowRight
                        className={currentVideoIndex >= videos.length - 1 ? 'disabled' : null}
                        onClick={() => funcNextVideo(nextVideo, currentVideoIndex, carouselDesk, videos, itemsToShow)}
                    />
                </div>
            </MediaQuery>
        </div>
    </>;
}

function funcPreviousVideo(previousVideo, currentVideoIndex, carouselDesk, videos, itemsToShow) {
    previousVideo();
    const index = currentVideoIndex;
    if (index !== 0 && index % itemsToShow === 0) {
        carouselDesk.slidePrev();
    }
}

function funcNextVideo(nextVideo, currentVideoIndex, carouselDesk, videos, itemsToShow) {
    nextVideo();
    const index = currentVideoIndex + 1;
    if (index !== videos.length && index % itemsToShow === 0) {
        carouselDesk.slideNext();
    }
}

function onPlay(event) {
    const player = event.target;
    clearInterval(interval);
    // interval = setInterval(() => console.log('Current time:', player.getCurrentTime()), 1000);
}