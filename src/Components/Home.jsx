import React from 'react';
import ReactModal from 'react-modal';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch,
	useParams
} from "react-router-dom";

export default function Home() {
	return (<>
		<div className="App">
            <h1>Komen kon fé pour opti windauz ?</h1>
			<Link className='link-anim' to='/videos'>
                cliké la pour allé voir lé vidéo
            </Link>
		</div>
	</>);
}