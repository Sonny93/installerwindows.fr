import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

export default function Date({ content = null }) {    
    if (content) {
        const newDate = dayjs(content).locale('fr').format('DD MMM YYYY');
        return <div className="date">
            Vidéo publiée le {newDate}
        </div>;
    } else {
        return <div className="date">
            Date indisponible
        </div>;
    }
}