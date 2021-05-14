import React from 'react';

export default function Title({ content = null }) {
    if (content) {
        return <>
            <h1 className="title">
                {content}
            </h1>
        </>;
    } else {
        return <>
            Titre indisponible
        </>;
    }
}