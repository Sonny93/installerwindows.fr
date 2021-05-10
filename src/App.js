import React from 'react';
import { FaArrowLeft, FaArrowRight, FaDiscord } from 'react-icons/fa';
import MediaQuery from 'react-responsive';
import ReactModal from 'react-modal';
import Carousel from 'react-elastic-carousel';

import { v4 as uuidv4 } from 'uuid';

import './App.css';
import './Modal.css';
import './Carousel.css';

ReactModal.setAppElement('#root');

const settings = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1
};

export default class App extends React.Component {
	constructor() {
		super();

		const temp = [
			'1RFmGfmmUls',
			'0L2XpBGKUa4',
			'aScZ5G3AMd4',
			'WWOQYY0HCmE',
			'3OjsyDnyN2U'
		]
		const videos = [];
		for (let i = 0; i < 60; i++) {
			videos.push({
				id: new uuidv4(),
				video_id: temp[Math.floor(Math.random() * temp.length)],
				title: `Test title #${i + 1}`,
				description: `Test description #${i + 1}`,
			});
		}

		this.state = {
			videos,
			currentVideo: videos[0],
			showModal: false
		}
	}

	componentDidMount() {

	}

	showVideo(video_id) {
		const { videos } = this.state;
		const video_index = videos.findIndex(v => v.id === video_id);

		if (video_index === -1)
			return alert('Une erreur est survenue (impossible de trouver la vidéo demandée)');

		this.setState({ currentVideo: videos[video_index] });
	}

	showVideoByIndex(video_index) {
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

	render() {
		const { videos, currentVideo, showModal } = this.state;
		const currentVideoIndex = this.getCurrentVideoIndex(currentVideo);
		const queries = {
			minWidth: 1440,
			maxWidth: 1439
		}
		const itemsToShow = 5;

		return (<>
			<div className="App">
				<MediaQuery minWidth={queries.minWidth}>
					<div className="video-list">
						<Carousel 
							itemsToShow={itemsToShow} 
							itemsToScroll={itemsToShow} 
							ref={(ref) => this.carouselDesk = ref}
						>
							{videos.map((video, key) => (
								<div
									className={`box ${currentVideo.id === video.id ? 'keep_show' : null}`}
									onClick={() => this.showVideo(video.id)}
									key={key}
								>
									<img
										src={`https://i.ytimg.com/vi_webp/${video.video_id}/maxresdefault.webp`}
										alt="Miniature YTB"
									/>
									<div className='title'>{video.title}</div>
								</div>
							))}
						</Carousel>
					</div>
				</MediaQuery>
				<MediaQuery maxWidth={queries.maxWidth}>
					<div className="center-el">
						<button className="custom" onClick={() => this.setState({ showModal: true })}>
							Afficher les vidéos • {currentVideoIndex + 1} / {videos.length}
						</button>
					</div>
					<ReactModal
						isOpen={showModal}
						contentLabel="Vidéos de Piwi_"
						className="Modal"
						overlayClassName="Modal_Overlay"
					>
						<button
							onClick={() => this.setState({ showModal: false })}
							className="modal-close-btn custom">
							Fermer le modal
						</button>
						<div className="video-list">
							{videos.map((video) => (
								<div
									className={`box ${currentVideo.id === video.id ? 'keep_show' : null}`}
									onClick={() => {
										this.showVideo(video.id);
										this.setState({ showModal: false });
									}}
								>
									<img
										src={`https://i.ytimg.com/vi_webp/${video.video_id}/maxresdefault.webp`}
										alt="Miniature YTB"
									/>
									<div className='title'>{video.title}</div>
								</div>
							))}
						</div>
					</ReactModal>
				</MediaQuery>
				<div className="video">
					<MediaQuery minWidth={queries.minWidth}>
						<div className="controls">
							<FaArrowLeft
								className={currentVideoIndex < 1 ? 'disabled' : null}
								onClick={() => {
									this.previousVideo();
									let index = currentVideoIndex;
									console.log(currentVideoIndex, index);
									if (index !== 0 && index % 5 === 0) {
										this.carouselDesk.slidePrev();
									}
								}}
							/>
						</div>
					</MediaQuery>
					<div className="video-content">
						<iframe
							width="853"
							height="480"
							src={`https://www.youtube.com/embed/${currentVideo.video_id}`}
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							title="Embedded youtube"
						/>
					</div>
					<MediaQuery minWidth={queries.minWidth}>
						<div className="controls">
							<FaArrowRight
								className={currentVideoIndex >= videos.length - 1 ? 'disabled' : null}
								onClick={() => {
									this.nextVideo();
									let index = currentVideoIndex + 1;
									if (index !== videos.length && index % 5 === 0) {
										this.carouselDesk.slideNext();
									}
								}}
							/>
						</div>
					</MediaQuery>
				</div>
				<div className="meta">
					<h1 className="title">{currentVideo.title}</h1>
					<hr />
					<div className="description">
						{currentVideo.description}
					</div>
				</div>
				<a
					href="https://discord.gg/informatique"
					className="ineedhelp"
					target="_blank"
				>
					<div className="text">
						Besoin d'aide ?
					</div>
					<div className="icon">
						<FaDiscord />
					</div>
				</a>
			</div>
		</>);
	}
}