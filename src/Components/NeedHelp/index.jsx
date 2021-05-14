import React from 'react';
import { FaDiscord } from 'react-icons/fa';

export default function NeedHelp({ }) {
    return <>
        <a href="https://discord.gg/informatique" className="ineedhelp" target="_blank">
            <div className="text">
                Besoin d'aide ?
            </div>
            <div className="icon">
                <FaDiscord />
            </div>
        </a>
    </>;
}