import Image from 'next/image';
import Link from 'next/link';

import styles from './VideoList.module.scss';

export default function VideoItem({ video, currentVideo }: { video: Video; currentVideo: Video }) {
    const { videoId, title } = video;
    const miniatureUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

    const className = `${styles['video-item']} ${
        currentVideo.videoId === videoId ? styles['selected'] : ''
    }`;
    return (
        <>
            <li className={className}>
                <Link href={`/videos/${videoId}`} className="reset">
                    <Image
                        height={140}
                        width={250}
                        priority={true}
                        src={miniatureUrl}
                        alt="Miniature YTB"
                    />
                    <div className={styles['title']}>{title}</div>
                </Link>
            </li>
        </>
    );
}
