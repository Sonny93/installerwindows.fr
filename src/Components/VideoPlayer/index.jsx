import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import MediaQuery from 'react-responsive';

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
                        onClick={() => {
                            previousVideo();
                            let index = currentVideoIndex;
                            if (index !== 0 && index % 5 === 0) {
                                carouselDesk.slidePrev();
                            }
                        }}
                    />
                </div>
            </MediaQuery>
            <div className="video-content">
                <iframe
                    width="853"
                    height="480"
                    src={`https://www.youtube.com/embed/${currentVideo.video_id}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                />
            </div>
            <MediaQuery minWidth={queries.minWidth}>
                <div className="controls">
                    <FaArrowRight
                        className={currentVideoIndex >= videos.length - 1 ? 'disabled' : null}
                        onClick={() => {
                            nextVideo();
                            let index = currentVideoIndex + 1;
                            if (index !== videos.length && index % 5 === 0) {
                                carouselDesk.slideNext();
                            }
                        }}
                    />
                </div>
            </MediaQuery>
        </div>
    </>;
}