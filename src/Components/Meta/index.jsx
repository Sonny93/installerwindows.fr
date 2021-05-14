import React from 'react';

import Title from './Title';
import Description from './Description';
import Date from './Date';

import './Meta.css';

export default function Meta({ video = null }) {
    if (!video)
        return console.error('need video');
    
    const { title, description, date } = video;
    return <div className="meta">
        <Title content={title} />
        <Date content={date} />
        <hr />
        <Description content={description} />
    </div>
}