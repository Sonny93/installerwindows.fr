import React from 'react';
import urlify from '../../Utils/Urlify.js';

export default function Description({ content = 'Discord : https://discord.gg/informatique' }) {
    return <div className="description" dangerouslySetInnerHTML={{ __html: urlify(content) }} />;
}