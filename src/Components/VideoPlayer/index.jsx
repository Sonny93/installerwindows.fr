import React, { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import MediaQuery from 'react-responsive';
import YouTube from 'react-youtube';

const options = {
    width: 853,
    height: 480,
    playerVars: {
        autoplay: 1,
        modestbranding: 0,
        showinfo: 0
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
    carouselDesk
}) {
    return <>
        <div className="video">
            <MediaQuery minWidth={queries.minWidth}>
                <div className="controls">
                    <FaArrowLeft
                        className={currentVideoIndex < 1 ? 'disabled' : null}
                        onClick={() => funcPreviousVideo(previousVideo, currentVideoIndex, carouselDesk, videos)}
                    />
                </div>
            </MediaQuery>
            <div className="video-content">
                <YouTube 
                    videoId={currentVideo.video_id} 
                    opts={options} 
                    onReady={onReady} 
                    onPlay={onPlay} 
                    onEnd={() => {
                        funcNextVideo(nextVideo, currentVideoIndex, carouselDesk, videos);
                        clearInterval(interval);
                    }}
                    onPause={() => clearInterval(interval)}
                />
            </div>
            <MediaQuery minWidth={queries.minWidth}>
                <div className="controls">
                    <FaArrowRight
                        className={currentVideoIndex >= videos.length - 1 ? 'disabled' : null}
                        onClick={() => funcNextVideo(nextVideo, currentVideoIndex, carouselDesk, videos)}
                    />
                </div>
            </MediaQuery>
        </div>
    </>;
}

function funcPreviousVideo(previousVideo, currentVideoIndex, carouselDesk, videos) {
    previousVideo();
    let index = currentVideoIndex;
    if (index !== 0 && index % 5 === 0) {
        carouselDesk.slidePrev();
    }
}

function funcNextVideo(nextVideo, currentVideoIndex, carouselDesk, videos) {
    nextVideo();
    let index = currentVideoIndex + 1;
    if (index !== videos.length && index % 5 === 0) {
        carouselDesk.slideNext();
    }
}

function onReady(event) {
    const player = event.target;
    console.log('La vidéo dure', player.getDuration() / 60, 'minutes ->', player.getDuration());
}

function onPlay(event) {
    const player = event.target;
    interval = setInterval(() => {
        console.log('Current time:', player.getCurrentTime());
    }, 1000);
}