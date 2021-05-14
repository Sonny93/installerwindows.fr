import React from 'react';

export default function Description({ content = null }) {
    if (content) {
        return <>
            <div className="description">
                {content}
            </div>
        </>;
    } else {
        return <>
            Description indisponible
        </>;
    }
}