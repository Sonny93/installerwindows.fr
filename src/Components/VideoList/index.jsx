import React, { useEffect } from 'react';
import MediaQuery from 'react-responsive';
import ReactModal from 'react-modal';
import Carousel from 'react-elastic-carousel';

import './video-list.css';
import Video from './Video';

export default function VideoList({ 
    queries,
    videos, 
    currentVideo,
    currentVideoIndex,
    setCurrentVideo,
    showModal,
    isModalShow = false,
    setCarouselDesk,
    showVideo,
    itemsToShow = 0,
    setItemsToShow
}) {
    useEffect(() => {
        updateItemsToShow(setItemsToShow, itemsToShow);
        window.addEventListener('resize', () => updateItemsToShow(setItemsToShow, itemsToShow));
    }, []);

    return <>
        <MediaQuery minWidth={queries.minWidth}>
            <div className="video-list">
                <Carousel itemsToShow={itemsToShow} itemsToScroll={itemsToShow} ref={(ref) => setCarouselDesk(ref)}>
                    {videos.map((video, key) => (
                        <Video 
                            currentVideo={currentVideo} 
                            setCurrentVideo={setCurrentVideo}
                            video={video} 
                            videos={videos} 
                            showVideo={showVideo} 
                            key={key} 
                        />    
                    ))}
                </Carousel>
            </div>
        </MediaQuery>
        <MediaQuery maxWidth={queries.maxWidth}>
            <div className="center-el">
                <button className="custom" style={{ width: '853px' }} onClick={() => showModal(true)}>
                    Afficher les vidéos
                </button>
            </div>
            <ReactModal
                isOpen={isModalShow}
                contentLabel="Vidéos de Piwi_"
                className="Modal"
                overlayClassName="Modal_Overlay"
            >
                <button onClick={() => showModal(false)} style={{ width: '853px' }} className="modal-close-btn custom">
                    Fermer
                </button>
                <div className="video-list">
                    {videos.map((video, key) => (
                        <Video 
                            currentVideo={currentVideo} 
                            setCurrentVideo={setCurrentVideo}
                            video={video} 
                            videos={videos} 
                            onClick={() => showModal(false)} 
                            showVideo={showVideo} 
                            key={key} 
                            isMobile={true}
                        />
                    ))}
                </div>
            </ReactModal>
        </MediaQuery>
    </>;    
}

function updateItemsToShow(setItemsToShow, itemsToShow) {
    if (window.innerWidth > 1920) {
        setItemsToShow(7);
    } else if (window.innerWidth > 1700) {
        setItemsToShow(6);
    } else if (window.innerWidth > 1440) {
        setItemsToShow(5);
    } else if (window.innerWidth > 1175) {
        setItemsToShow(4);
    } else {
        setItemsToShow(3);
    }
}