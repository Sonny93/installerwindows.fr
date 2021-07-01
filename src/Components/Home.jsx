import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

import '../assets/Home.css';
import Loader from './Loader/index.jsx';

export default function Home() {
	const [ mdText, setMdText ] = useState(null);
	useEffect(async () => setMdText(await fetch('https://raw.githubusercontent.com/Piwielle/oui/master/README.md').then(res => res.text())));

	if (!mdText) {
		return <Loader show={true}>
			<p>Chargement de la page d'accueil en cours</p>
			<a className="custom" href="https://discord.gg/informatique" rel="noreferrer" target="_blank">
				https://discord.gg/informatique
			</a>
		</Loader>
	}

	return (<>
		<div className="Home">
			<ReactMarkdown children={mdText} linkTarget='_blank' />
			<Link className='link-anim' to='/videos'>
				Voir les vidéos
			</Link>
		</div>
	</>);
}