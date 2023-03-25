import { _db } from '../lib/db';

export async function findGuideBySlugOrThrow(guideSlug: Guide['slug']) {
    const guide = await findGuideBySlug(guideSlug);
    if (!guide) {
        throw new Error('Unable to find guide with slug ' + guideSlug);
    }
    return guide;
}

export async function findGuideBySlug(guideSlug: Guide['slug']) {
    return (await _db.data.guides).find(({ slug }) => slug === guideSlug);
}

export async function findGuideIndexBySlugOrThrow(guideSlug: Guide['slug']) {
    const guideIndex = await findGuideIndexBySlug(guideSlug);
    if (guideIndex === -1) {
        throw new Error('Unable to find guide with slug ' + guideSlug);
    }
    return guideIndex;
}

export async function findGuideIndexBySlug(guideSlug: Guide['slug']) {
    return (await _db.data.guides).findIndex(({ slug }) => slug === guideSlug);
}
