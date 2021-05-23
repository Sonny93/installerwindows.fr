import React from 'react';

export default function NeedHelp({ }) {
    return <>
        <a href="https://discord.gg/informatique" className="ineedhelp" target="_blank">
            <svg width="150px" height="50px" viewBox="0 0 150 50" className="border">
                <polyline points="149,1 149,49 1,49 1,1 149,1" className="bg-line" />
                <polyline points="149,1 149,49 1,49 1,1 149,1" className="hl-line" />
            </svg>
            <div className="text">
                Besoin d'aide ?
            </div>
        </a>
    </>;
}