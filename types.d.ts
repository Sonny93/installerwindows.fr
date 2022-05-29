interface VideoAPI {
    title?: string;
    description?: string;
    video_id?: string;
    date?: Date;
    statut?: VideoStatus;
}

interface Video {
    title: string;
    description: string;
    videoId: string;
    date: Date;
    statut: VideoStatus;
}


enum VideoStatus {
    'unlisted' = 'unlisted',
    'private' = 'private',
    'public' = 'public'
}