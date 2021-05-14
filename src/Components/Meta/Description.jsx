import React from 'react';

export default function Description({ content = null }) {
    const regexLink = /(https?:\/\/[^\s]+)/g;
    if (content) {
        return <>
            <div className="description" dangerouslySetInnerHTML={{ __html: urlify(content) }}>
            </div>
        </>;
    } else {
        return <>
            Description indisponible
        </>;
    }
}

const urlify = (text) => text.replace(/(https?:\/\/[^\s]+)/g, (url) => `<a href="${url}" target="_blank">${url}</a>`);