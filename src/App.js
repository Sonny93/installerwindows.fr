import React from 'react';
import ReactModal from 'react-modal';

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

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			videos: [],
			currentVideo: null,
			showModal: false,
			itemsToShow: 0
		}
	}

	componentDidMount = async () => {
		try {
			const response = await fetch('https://api.installerwindows.fr/api/video');
			if (response.status !== 200)
				throw new Error(`HTTP Error: ${response.status}`);

			const data = await response.json();
			if (!data?.videos)
				throw new Error(`There is no videos`);

			const { videos } = data;
			if (!Array.isArray(videos))
				throw new Error(`Array expected, but receive ${typeof (videos)}`);

			for (let i = 0; i < videos.length; i++) {
				const video = videos[i];
				video.id = new uuidv4();
				video.title = htmlDecode(video.title);
				// const videoStorage = localStorage.getItem(`video-${video.video_id}`);
				// if (videoStorage) {
				// 	try {
				// 		const obj = JSON.parse(videoStorage);
				// 		if (!obj) return;
				// 		if (obj['time_view']) {
				// 			const time = obj['time_view'];
				// 			
				// 		}
				// 	} catch(e) {
				// 		console.error(e);
				// 	}
				// }
				videos[i] = video;
			}
			this.setState({
				videos: data.videos,
				currentVideo: data.videos[0]
			});
		} catch (error) {
			console.error(error);
		}
	}

	showVideo = (video_id) => {
		const { videos } = this.state;
		const video_index = videos.findIndex(v => v.id === video_id);

		if (video_index === -1)
			return alert('Une erreur est survenue (impossible de trouver la vidéo demandée)');

		this.setState({ currentVideo: videos[video_index] });
	}

	showVideoByIndex = (video_index) => {
		const { videos } = this.state;
		if (videos[video_index] === null)
			return alert('Une erreur est survenue (impossible de trouver la vidéo demandée)');

		this.setState({ currentVideo: videos[video_index] });
	}

	previousVideo = () => {
		const { currentVideo, videos } = this.state;
		const video_index = videos.findIndex(v => v.id === currentVideo.id);
		if (video_index === -1)
			return alert('Impossible de trouver la précédente vidéo');

		const newIndex = video_index - 1;
		if (newIndex >= 0)
			this.showVideoByIndex(newIndex);
	}

	nextVideo = () => {
		const { currentVideo, videos } = this.state;
		const video_index = videos.findIndex(v => v.id === currentVideo.id);
		if (video_index === -1)
			return alert('Impossible de trouver la prochaine vidéo');

		const newIndex = video_index + 1;
		if (newIndex < videos.length)
			this.showVideoByIndex(newIndex);
	}

	getCurrentVideoIndex = (video) => {
		const { videos } = this.state;
		const index = videos.findIndex(v => v.id === video.id);
		if (index === -1)
			return alert('Impossible de trouver la vidéo demandée');
		return index;
	}

	showModal = (s = false) => {
		this.setState({ showModal: !!s });
	}

	setCarouselDesk = (cd = null) => {
		if (cd !== null)
			this.carouselDesk = cd;
	}

	setItemsToShow = (its) => this.setState({ itemsToShow: its });

	render() {
		const { videos, currentVideo } = this.state;
		const queries = {
			minWidth: 1070,
			maxWidth: 1069
		}
		
		if (videos.length < 1) {
			return <>
				<Loader show={true}>
					<p>Chargement des vidéos en cours</p>
					<a className="custom" href="https://discord.gg/informatique" target="_blank">
						https://discord.gg/informatique
					</a>
				</Loader>
			</>;
		}

		const currentVideoIndex = this.getCurrentVideoIndex(currentVideo);
		return (<>
			<div className="App">
				<VideoList
					queries={queries}
					showModal={this.showModal}
					isModalShow={this.state.showModal}
					videos={videos}
					currentVideo={currentVideo}
					currentVideoIndex={currentVideoIndex}
					setCarouselDesk={this.setCarouselDesk}
					showVideo={this.showVideo}
					setItemsToShow={this.setItemsToShow}
					itemsToShow={this.state.itemsToShow}
				/>
				<VideoPlayer
					queries={queries}
					videos={videos}
					currentVideo={currentVideo}
					currentVideoIndex={currentVideoIndex}
					previousVideo={this.previousVideo}
					nextVideo={this.nextVideo}
					carouselDesk={this.carouselDesk}
					setItemsToShow={this.setItemsToShow}
					itemsToShow={this.state.itemsToShow}
				/>
				<Meta video={currentVideo} />
				<NeedHelp />
			</div>
		</>);
	}
}

function htmlDecode(input) {
	const e = document.createElement('textarea');
	e.innerHTML = input;
	return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}