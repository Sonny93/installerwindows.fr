import React from 'react';
import { FaDiscord } from 'react-icons/fa';

import './ineedhelp.css';

export default function NeedHelp({ }) {
    return <>
        <a href="https://discord.gg/informatique" rel="noreferrer" className="ineedhelp" target="_blank">
            <svg width="165px" height="50px" viewBox="0 0 165 50" className="border">
                <polyline points="164,1 164,49 1,49 1,1 164,1" className="bg-line" />
                <polyline points="164,1 164,49 1,49 1,1 164,1" className="hl-line" />
            </svg>
            <div className="text">
                <FaDiscord /> Besoin d'aide ?
            </div>
        </a>
    </>;
}