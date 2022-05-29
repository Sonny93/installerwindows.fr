import React, { useEffect, useRef, useState } from 'react';

import Head from 'next/head';
import Router from 'next/router';

import toastr from 'toastr';
import 'toastr/build/toastr.css';

import Meta from '../../Components/Meta/Meta';
import VideoPlayer from '../../Components/VideoPlayer/VideoPlayer';
import VideoList from '../../Components/VideoList/VideoList';

import { getIndexByVideoId, getVideos } from '../../Utils/index';
import styles from '../../styles/videos.module.scss';

const MEDIA_QUERIES = {
	minWidth: 931,
	maxWidth: 930
}

const CAROUSEL_QUERIES = {
	'extra-large-desktop': {
		breakpoint: { max: 5000, min: 1920 },
		items: 7,
		slidesToSlide: 7
	},
	'full-hd-desktop': {
		breakpoint: { max: 1920, min: 1700 },
		items: 6,
		slidesToSlide: 6
	},
	'large-desktop': {
		breakpoint: { max: 1700, min: 1440 },
		items: 5,
		slidesToSlide: 5
	},
	'medium-desktop': {
		breakpoint: { max: 1440, min: 1175 },
		items: 4,
		slidesToSlide: 4
	},
	'small-desktop': {
		breakpoint: { max: 1175, min: 1070 },
		items: 3,
		slidesToSlide: 3
	},
	'tablet': {
		breakpoint: { max: 1070, min: 900 },
		items: 3,
		slidesToSlide: 3
	},
	'mobile': {
		breakpoint: { max: 900, min: 0 },
		items: 2,
		slidesToSlide: 2
	}
}

export default function Videos({ videos, video }: { videos: Video[]; video: Video; }) {
	const [currentVideo, setCurrentVideo] = useState<Video>(video);
	const [canGoPrevious, setGoPrevious] = useState<boolean>(false);
	const [canGoNext, setGoNext] = useState<boolean>(false);

	const [deviceType, setDeviceType] = useState<string>(null);
	const carouselRef = useRef(null);

	useEffect(() => {
		handleResize(deviceType, setDeviceType);
		window.addEventListener('resize', () => handleResize(deviceType, setDeviceType), false);
		return () => window.removeEventListener('resize', () => handleResize(deviceType, setDeviceType), false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const index = getIndexByVideoId(currentVideo.videoId, videos);
		if (index === -1) {
			return;
		}

		if (index > 0) {
			setGoPrevious(true);
		} else {
			setGoPrevious(false);
		}

		if (index < videos.length - 1) {
			setGoNext(true);
		} else {
			setGoNext(false);
		}
	}, [currentVideo, videos]);

	if (videos.length < 1 || !currentVideo) {
		return (<>
			<div className={styles['App']}>
				<Head>
					<title>Installerwindows.fr — Aucune vidéo disponible</title>
				</Head>
				<p>Aucune vidéo disponible</p>
			</div>
		</>);
	}

	const handleChangeVideo = (currentVideoId: string, videos: Video[], direction: 'previous' | 'next' | 'keep' = 'keep'): Video => {
		if (!videos || videos.length === 0) {
			console.error('missing param "videos"');
			return null;
		}

		const currentIndex = getIndexByVideoId(currentVideoId, videos);
		if (currentIndex === -1) {
			toastr.error('Vidéo introuvable', 'Erreur');
			return null;
		}

		const device = CAROUSEL_QUERIES[deviceType];
		let index = currentIndex;
		if (direction === 'next') {
			if (index + 1 <= videos.length - 1) {
				index += 1;
			}

			if (index % device.items === 0) {
				carouselRef.current?.next();
			}
		} else if (direction === 'previous') {
			if (index - 1 >= 0) {
				index -= 1;
			}

			if (index % device.items === 0) {
				carouselRef.current?.previous();
			}
		}

		const video = videos[index];
		setCurrentVideo(video);
		Router.push(`/videos/${video.videoId}`);

		return video;
	}

	return (<>
		<div className={styles['App']}>
			<Head>
				<title>
					Installerwindows.fr — {currentVideo.title}
				</title>
			</Head>
			<VideoList
				carouselQueries={CAROUSEL_QUERIES}
				videos={videos}
				currentVideo={currentVideo}
				deviceType={deviceType}
				carouselRef={carouselRef}
				handleChangeVideo={handleChangeVideo}
			/>
			<VideoPlayer
				videos={videos}
				currentVideo={currentVideo}
				deviceType={deviceType}
				handleChangeVideo={handleChangeVideo}
				canGoPrevious={canGoPrevious}
				canGoNext={canGoNext}
			/>
			<Meta video={currentVideo} />
		</div>
	</>);
}

export async function getServerSideProps({ query }) {
	const videoId = query?.videoId?.[0] as undefined | string;
	const videos = await getVideos();

	if (videos.length < 1) {
		return { // Aucune vidéo
			redirect: {
				permanent: false,
				destination: '/novideo'
			},
			props: {}
		}
	}

	if (!videoId) {
		const firstVideo = videos[0];
		return { // Redirige vers la première vidéo 
			redirect: {
				permanent: false,
				destination: `/videos/${firstVideo.videoId}`
			},
			props: {
				videos: JSON.parse(JSON.stringify(videos)),
				video: JSON.parse(JSON.stringify(firstVideo))
			}
		}
	}

	const currentVideo = videos.find(v => v.videoId === videoId);
	if (!currentVideo) {
		return { // Vidéo introuvable
			redirect: {
				permanent: false,
				destination: '/'
			},
			props: {}
		}
	}

	return { // OK
		props: {
			videos: JSON.parse(JSON.stringify(videos)),
			video: JSON.parse(JSON.stringify(currentVideo))
		}
	}
}

const handleResize = (currentDeviceType: string, setDeviceType) => {
	for (const [key, { breakpoint }] of Object.entries(CAROUSEL_QUERIES)) {
		const { matches } = window.matchMedia(`(min-width:${breakpoint.min}px)`);
		if (!matches || currentDeviceType === key)
			continue;

		setDeviceType(key);
		break;
	}
}