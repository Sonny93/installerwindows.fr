import { Data } from '@generated/data';
import { ClientOnly } from '@minimalstuff/ui';
import { VideoList } from '~/components/videos/video_list';
import { VideoMeta } from '~/components/videos/video_meta';
import { VideoPlayer } from '~/components/videos/video_player';
import { useMediaQuery } from '~/hooks/use_media_query';

const MQ_MD = '(max-width: 991px)';

interface VideosPageProps {
	videos: Data.Video[];
	currentVideo: Data.Video;
	nextVideo: Data.Video | undefined;
}

export default function VideosPage({
	videos,
	currentVideo,
	nextVideo,
}: Readonly<VideosPageProps>) {
	const isSmallScreen = useMediaQuery(MQ_MD);

	return (
		<div
			className={`flex w-full flex-nowrap items-start gap-8 ${isSmallScreen ? 'flex-col' : 'flex-row'}`}
		>
			{videos.at(0) ? (
				<div className="flex w-full flex-col gap-6 lg:min-w-0 lg:flex-1">
					<ClientOnly>
						<VideoPlayer url={currentVideo.url} />
					</ClientOnly>
					<VideoMeta
						title={currentVideo.title}
						description={currentVideo.description}
						publishedAt={currentVideo.publishedAt}
					/>
				</div>
			) : null}

			<div
				className={isSmallScreen ? 'w-full' : 'w-full max-w-[350px] shrink-0'}
			>
				<VideoList
					videos={videos}
					nextVideo={nextVideo}
					activeVideoId={currentVideo.id}
				/>
			</div>
		</div>
	);
}
