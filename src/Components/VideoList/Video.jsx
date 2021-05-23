import React from 'react';

export default function Video({ video, currentVideo, showVideo, key, onClick }) {
    const { video_id, title, id } = video;
    const miniature_url = `https://i.ytimg.com/vi/${video_id}/maxresdefault.jpg`;
    const className = `box ${currentVideo.id === id ? 'keep_show' : null}`;

    return <div className={className} onClick={() => {
        showVideo(id);
        if (onClick)
            onClick();
    }} key={key}>
        <img src={miniature_url} alt="Miniature YTB" />
        <div className='title'>{title}</div>
    </div>;
}