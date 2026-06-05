import { Data } from '@generated/data';
import { ClientOnly } from '@minimalstuff/ui';
import { VideoList } from '~/components/videos/video_list';
import { VideoMeta } from '~/components/videos/video_meta';
import { VideoPlayer } from '~/components/videos/video_player';

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
	if (!videos.at(0)) {
		return (
			<p className="text-gray-600 dark:text-slate-400">Aucune vidéo disponible.</p>
		);
	}

	return (
		<div className="flex flex-col lg:flex-row items-start gap-8">
			<div className="flex w-full min-w-0 flex-1 flex-col gap-5">
				<ClientOnly>
					<VideoPlayer url={currentVideo.url} />
				</ClientOnly>
				<div className="border-t border-gray-100 dark:border-white/5 pt-5">
					<VideoMeta
						title={currentVideo.title}
						description={currentVideo.description}
						publishedAt={currentVideo.publishedAt}
					/>
				</div>
			</div>

			<aside className="w-full lg:w-[340px] lg:shrink-0">
				<div className="sticky top-[84px]">
					<div className="mb-4 flex items-center justify-between">
						<h2 className="text-xs font-medium uppercase tracking-widest text-gray-600 dark:text-slate-400">
							File de lecture
						</h2>
						<span className="text-xs text-gray-500 dark:text-slate-500">
							{videos.length} vidéo{videos.length > 1 ? 's' : ''}
						</span>
					</div>
					<div className="overflow-y-auto max-h-[calc(100vh-140px)] scrollbar-thin pr-0.5">
						<VideoList
							videos={videos}
							nextVideo={nextVideo}
							activeVideoId={currentVideo.id}
						/>
					</div>
				</div>
			</aside>
		</div>
	);
}
