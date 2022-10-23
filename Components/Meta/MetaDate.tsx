import React from 'react';
import styles from './Meta.module.scss';

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
	const currentDate = new Date(date);
	const day = currentDate.getDate();
	const month = currentDate.getMonth();
	const year = currentDate.getFullYear();

	return (
		<>
			{date ? (
				<div className={styles['date']}>
					Vidéo publiée le {day} {months[month]} {year}
				</div>
			) : (
				<div className={styles['date']}>
					Date indisponible
				</div>
			)}
		</>
	);
}