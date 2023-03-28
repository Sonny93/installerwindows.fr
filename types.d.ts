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
    'public' = 'public',
}

interface DbType {
    guides: Guide[];
    admin_accounts: string[];
}
interface Guide {
    title: string;
    slug: string;
    thumbnail: string;

    github: {
        source: string;
        raw: string;
    };

    isDraft: boolean;
}
type GuideFormValues = Guide;

interface Chapter {
    id: string;
    name: string;
}

interface ChapterWithHTMLElement extends Chapter {
    element: HTMLElement;
}
