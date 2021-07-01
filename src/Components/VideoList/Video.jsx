import React from 'react';

export default function Video({ video, currentVideo, videos, setCurrentVideo, showVideo, key, onClick, isMobile = false }) {
    const { video_id, title, id } = video;
    const miniature_url = `https://i.ytimg.com/vi/${video_id}/maxresdefault.jpg`;
    const className = `box ${currentVideo.id === id ? 'keep_show' : null} ${isMobile ? 'mobile' : ''}`;

    return <div className={className} onClick={() => {
        showVideo(id, videos, setCurrentVideo);
        if (onClick)
            onClick();
    }} key={key}>
        <img src={miniature_url} alt="Miniature YTB" />
        <div className='title'>{title}</div>
    </div>;
}