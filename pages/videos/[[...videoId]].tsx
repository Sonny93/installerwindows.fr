import { NextSeo } from 'next-seo';
import Router, { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import toastr from 'toastr';
import 'toastr/build/toastr.css';

import Meta from '../../Components/Meta/Meta';
import Navbar from '../../Components/Navbar/Navbar';
import VideoList from '../../Components/VideoList/VideoList';
import VideoPlayer from '../../Components/VideoPlayer/VideoPlayer';

import { getIndexByVideoId, getVideos } from '../../Utils/index';

import styles from '../../styles/videos.module.scss';
import Footer from '../../Components/Footer/Footer';

export default function Videos({ videos, video }: { videos: Video[]; video: Video }) {
    const { query } = useRouter();
    const [currentVideo, setCurrentVideo] = useState<Video>(video);
    const canGoPrevious = useMemo<boolean>(
        () => getIndexByVideoId(currentVideo.videoId, videos) > 0,
        [currentVideo.videoId, videos]
    );
    const canGoNext = useMemo<boolean>(
        () => getIndexByVideoId(currentVideo.videoId, videos) < videos.length - 1,
        [currentVideo.videoId, videos]
    );

    useEffect(() => {
        const videoId = query.videoId[0];
        if (videoId === currentVideo.videoId) return;

        const video = videos.find((v) => v.videoId === videoId);
        if (video) {
            setCurrentVideo(video);
        }
    }, [currentVideo.videoId, query.videoId, videos]);

    const handleChangeVideo = (currentVideoId: string = '', direction: 'previous' | 'next') => {
        const videoIndex = getIndexByVideoId(currentVideoId, videos);
        if (!currentVideoId || videoIndex === -1) {
            return toastr.error('Vidéo introuvable', 'Erreur');
        }

        let video: Video;
        switch (direction) {
            case 'previous':
                if (!canGoPrevious) {
                    return toastr.error('Impossible de charger la vidéo précédente');
                }

                video = videos[videoIndex - 1];
                break;

            case 'next':
                if (!canGoNext) {
                    return toastr.error('Impossible de charger la vidéo suivante');
                }

                video = videos[videoIndex + 1];
                break;

            default:
                video = videos[videoIndex];
                break;
        }

        setCurrentVideo(video);
        Router.push(`/videos/${video.videoId}`);
    };

    return (
        <>
            <NextSeo
                title={currentVideo.title}
                description={currentVideo.description}
                openGraph={{
                    type: 'image',
                    url: '/videos/' + video.videoId,
                    images: [
                        {
                            url: `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`,
                        },
                    ],
                }}
            />
            <div className={styles['App']}>
                <Navbar shadowEnable={false} />
                <div className={styles['content-wrapper']}>
                    <main>
                        <VideoPlayer
                            currentVideo={currentVideo}
                            handleChangeVideo={handleChangeVideo}
                            canGoPrevious={canGoPrevious}
                            canGoNext={canGoNext}
                        />
                        <Meta video={currentVideo} />
                    </main>
                    <aside>
                        <VideoList videos={videos} currentVideo={currentVideo} />
                    </aside>
                </div>
                <Footer />
            </div>
        </>
    );
}

export async function getServerSideProps({ query }) {
    const videoId = query?.videoId?.[0] as string;
    const videos = await getVideos();

    // Aucune vidéo disponible
    if (videos.length < 1) {
        return {
            // Aucune vidéo
            redirect: {
                permanent: false,
                destination: '/novideo',
            },
            props: {},
        };
    }

    // Redirige vers la première vidéo
    if (!videoId) {
        const firstVideo = videos[0];
        return {
            redirect: {
                permanent: false,
                destination: `/videos/${firstVideo.videoId}`,
            },
            props: {
                videos: JSON.parse(JSON.stringify(videos)),
                video: JSON.parse(JSON.stringify(firstVideo)),
            },
        };
    }

    // Vidéo introuvable
    const currentVideo = videos.find((v) => v.videoId === videoId);
    if (!currentVideo) {
        return {
            redirect: {
                permanent: false,
                destination: '/',
            },
            props: {},
        };
    }

    // OK
    return {
        props: {
            videos: JSON.parse(JSON.stringify(videos)),
            video: JSON.parse(JSON.stringify(currentVideo)),
        },
    };
}
