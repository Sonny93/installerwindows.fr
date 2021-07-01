import React, { useState } from 'react';
import ReactModal from 'react-modal';
import toastr from 'toastr';
import 'toastr/build/toastr.css';

import { v4 as uuidv4 } from 'uuid';

import Meta from './Components/Meta/index.jsx';
import NeedHelp from './Components/NeedHelp/index.jsx';
import VideoPlayer from './Components/VideoPlayer/index.jsx';
import VideoList from './Components/VideoList/index.jsx';
import Loader from './Components/Loader/index.jsx';

import './App.css';
import './Modal.css';
import './Carousel.css';
import './Components/Loader/Loader.css';

ReactModal.setAppElement('#root');
React.lazy();

export default function App() {
	const [ videos, setVideos ] = useState([]);
	const [ currentVideo, setCurrentVideo ] = useState(null);
	const [ showModal, setShowModal ] = useState(false);
	const [ itemsToShow, setItemsToShow ] = useState(0);
	const [ carouselDesk, setCarouselDesk ] = useState(null);

	useState(async () => {
		try {
			const response = await fetch('https://api.installerwindows.fr/api/video');
			if (response.status !== 200)
				throw new Error(`HTTP Error: ${response.status}`);

			const data = await response.json();
			if (!data?.videos)
				throw new Error(`There is no videos`);

			const { videos: videosData } = data;
			if (!Array.isArray(videosData))
				throw new Error(`Array expected, but receive ${typeof (videosData)}`);

			for (let i = 0; i < videosData.length; i++) {
				const video = videosData[i];
				video.id = new uuidv4();
				video.title = htmlDecode(video.title);
				videosData[i] = video;
			}

			setVideos(videosData);
			setCurrentVideo(videosData[0]);
		} catch (error) {
			console.error(error);
		}
	}, []);

	const queries = {
		minWidth: 1070,
		maxWidth: 1069
	}
	
	if (videos.length < 1 || !currentVideo) {
		return <>
			<Loader show={true}>
				<p>Chargement des vidéos en cours</p>
				<a className="custom" href="https://discord.gg/informatique" rel="noreferrer" target="_blank">
					https://discord.gg/informatique
				</a>
			</Loader>
		</>;
	}
	
	const currentVideoIndex = getCurrentVideoIndex(currentVideo, videos);
	return (<>
		<div className="App">
			<VideoList
				queries={queries}
				showModal={setShowModal}
				isModalShow={showModal}
				videos={videos}
				setCurrentVideo={setCurrentVideo}
				currentVideo={currentVideo}
				currentVideoIndex={currentVideoIndex}
				setCarouselDesk={setCarouselDesk}
				showVideo={showVideo}
				setItemsToShow={setItemsToShow}
				itemsToShow={itemsToShow}
			/>
			<VideoPlayer
				queries={queries}
				videos={videos}
				setCurrentVideo={setCurrentVideo}
				currentVideo={currentVideo}
				currentVideoIndex={currentVideoIndex}
				previousVideo={previousVideo}
				nextVideo={nextVideo}
				carouselDesk={carouselDesk}
				setItemsToShow={setItemsToShow}
				itemsToShow={itemsToShow}
			/>
			<Meta video={currentVideo} />
			<NeedHelp />
		</div>
	</>);
}

function showVideo(video_id, videos, setCurrentVideo) {
	const video_index = videos.findIndex(video => video.id === video_id);
	if (video_index === -1)
		return toastr.error('Une erreur est survenue (impossible de trouver la vidéo demandée)');

	showVideoByIndex(video_index, videos, setCurrentVideo);
}

function showVideoByIndex(video_index, videos, setCurrentVideo) {
	if (videos[video_index] === null)
		return toastr.error('Une erreur est survenue (impossible de trouver la vidéo demandée)');

	setCurrentVideo(videos[video_index]);
}

function getCurrentVideoIndex(video, videos) {
	const index = videos.findIndex(v => v.id === video.id);
	if (index === -1) {
		toastr.error('Impossible de trouver la vidéo demandée');
		return false;
	} else return index;
}

function previousVideo(currentVideo, videos, setCurrentVideo) {
	const video_index = videos.findIndex(v => v.id === currentVideo.id);
	if (video_index === -1)
		return toastr.error('Impossible de trouver la précédente vidéo');

	const newIndex = video_index - 1;
	if (newIndex >= 0)
		showVideoByIndex(newIndex, videos, setCurrentVideo);
}

function nextVideo(currentVideo, videos, setCurrentVideo) {
	const video_index = videos.findIndex(v => v.id === currentVideo.id);
	if (video_index === -1)
		return toastr.error('Impossible de trouver la prochaine vidéo');

	const newIndex = video_index + 1;
	if (newIndex < videos.length)
		showVideoByIndex(newIndex, videos, setCurrentVideo);
}

function htmlDecode(input) {
	const e = document.createElement('textarea');
	e.innerHTML = input;
	return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}