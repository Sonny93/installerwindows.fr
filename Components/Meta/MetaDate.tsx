import React from 'react';
import styles from '../../styles/videos.module.scss';

const months = [
	'jan.',
	'févr.',
	'mars',
	'avr.',
	'mai',
	'juin',
	'juill.',
	'aout',
	'sept.',
	'oct.',
	'nov.',
	'déc.'
];

export default function MetaDate({ date = null }: { date: Date; }) {
	if (date) {
		const currentDate = new Date(date);
		const day = currentDate.getDate();
		const month = currentDate.getMonth();
		const year = currentDate.getFullYear();

		return (<>
			<div className={styles['date']}>
				Vidéo publiée le {day} {months[month]} {year}
			</div>
		</>);
	} else {
		return (<>
			<div className={styles['date']}>
				Date indisponible
			</div>
		</>);
	}
}