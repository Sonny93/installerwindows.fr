export function urlify(text) {
    return text.replace(
        /(https?:\/\/[^\s]+)/g,
        (url) => `<a href="${url}" class="link-anim" rel="noreferrer" target="_blank">${url}</a>`
    );
}

export async function downloadMarkdown(url: string): Promise<string> {
    const response = await fetch(url);
    if (response.status !== 200) {
        throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.text();
    if (!data) {
        throw new Error("Impossible de récupérer le contenu de la page d'accueil");
    }

    return data;
}

export async function getVideos(): Promise<Video[]> {
    const response = await fetch('https://api.installerwindows.fr/api/video');
    if (response.status !== 200) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    if (data?.videos === null || data?.videos === undefined) {
        throw new Error('Aucune vidéo reçue');
    } else if (!Array.isArray(data?.videos)) {
        throw new Error(`Tableau de vidéo attendu; reçu: ${typeof data?.videos}`);
    }

    const videosAPI = data.videos as VideoAPI[];
    const videos = videosAPI.map((video) => VideoBuilder(video));

    return videos;
}

export function VideoBuilder(video: VideoAPI): Video {
    const { title, description, video_id, date, statut } = video;

    for (const [key, value] of Object.entries(video)) {
        if (value === null || value === undefined || value === '') {
            console.error('missing', key, video);
            return null;
        }
    }

    return {
        title,
        description,
        videoId: video_id,
        date,
        statut,
    };
}

export function getIndexByVideoId(videoId: string, videos: Video[]): number | null {
    const videoIndex = videos.findIndex((v) => v.videoId === videoId);
    return videoIndex === -1 ? null : videoIndex;
}

export function trimify(str: string = '') {
    return str.trim();
}

export function slugify(str: string = '') {
    return str
        .normalize('NFD')
        .replaceAll(' ', '-')
        .replaceAll(/[\u0300-\u036f'"=\(\)&_]/g, '')
        .replace(/^-+|-+(?=-|$)/g, '')
        .toLowerCase();
}

export function isUrl(str: string = '') {
    return str.match(
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    );
}

export function isGithubUrl(str: string = '') {
    return str.match(/(http(s)?):\/\/github\.com\/\w+\/(.+|)(?:\.git)?/) ? true : false;
}

export function isGithubUserContentUrl(str: string = '') {
    return str.match(/(http(s)?):\/\/raw\.githubusercontent\.com\/\w+\/(.+|)(?:\.git)?/)
        ? true
        : false;
}

export function isImgurUrl(str: string = '') {
    return str.match(/(http(s)?):\/\/(i\.)?imgur\.com\/\w+(\.\w+)?/) ? true : false;
}

export function isStringEmpty(str: string = '') {
    return !str || str === '';
}

export function getPathFromUrl(url: string = null, domain: string = null) {
    if (!url || !domain) return url;
    const path = url.split(domain)[1];
    return path;
}

export function getVideoIdFromPath(path: string = null) {
    if (!path) return path;
    const videoId = path.startsWith('watch?v=') ? path.split('watch?v=')[1] : path;
    return videoId;
}

export function buildYTBThumbnailUrl(videoId: string = '') {
    return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
}
