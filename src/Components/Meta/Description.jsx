import React from 'react';

export default function Description({ content = null }) {
    if (content)
        return <div className="description" dangerouslySetInnerHTML={{ __html: urlify(content) }} />;
    else
        return <div className="description">Description indisponible</div>;
}

const urlify = (text) => text.replace(/(https?:\/\/[^\s]+)/g, (url) => `<a href="${url}" target="_blank">${url}</a>`);