import React from 'react';
import MediaQuery from 'react-responsive';
import ReactModal from 'react-modal';
import Carousel from 'react-elastic-carousel';

import Video from './Video';

export default function VideoList({ 
    queries,
    videos, 
    currentVideo,
    currentVideoIndex,
    showModal,
    isModalShow = false,
    setCarouselDesk,
    showVideo
}) {
    const itemsToShow = 5;
    return <>
        <MediaQuery minWidth={queries.minWidth}>
            <div className="video-list">
                <Carousel itemsToShow={itemsToShow} itemsToScroll={itemsToShow} ref={(ref) => setCarouselDesk(ref)}>
                    {videos.map((video, key) => (
                        <Video currentVideo={currentVideo} video={video} showVideo={showVideo} key={key} />    
                    ))}
                </Carousel>
            </div>
        </MediaQuery>
        <MediaQuery maxWidth={queries.maxWidth}>
            <div className="center-el">
                <button className="custom" onClick={() => showModal(true)}>
                    Afficher les vidéos • {currentVideoIndex + 1} / {videos.length}
                </button>
            </div>
            <ReactModal
                isOpen={isModalShow}
                contentLabel="Vidéos de Piwi_"
                className="Modal"
                overlayClassName="Modal_Overlay"
            >
                <button onClick={() => showModal(false)} className="modal-close-btn custom">
                    Fermer le modal
                </button>
                <div className="video-list">
                    {videos.map((video, key) => (
                        <Video currentVideo={currentVideo} video={video} showVideo={showVideo} key={key} />
                    ))}
                </div>
            </ReactModal>
        </MediaQuery>
    </>;    
}