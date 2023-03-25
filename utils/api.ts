import {
    isGithubUrl,
    isGithubUserContentUrl,
    isImgurUrl,
    isStringEmpty,
    slugify,
    trimify,
} from './string';

export function verifyGuideForm(formValues: GuideFormValues): Guide {
    const { title, slug, thumbnail, github, isDraft = false } = formValues;

    const titleTrimed = trimify(title);
    if (isStringEmpty(titleTrimed)) {
        throw new Error('Titre du guide manquant');
    }

    const slugTrimed = slugify(trimify(slug));
    if (isStringEmpty(slugTrimed)) {
        throw new Error('Slug du guide manquant');
    }

    const thumbnailTrimed = trimify(thumbnail);
    if (!isStringEmpty(thumbnail) && !isImgurUrl(thumbnailTrimed)) {
        throw new Error('Un lien imgur est requis\n(ex: https://i.imgur.com/example.png)');
    }

    const githubSourceTrimed = trimify(github?.source);
    if (isStringEmpty(githubSourceTrimed) || !isGithubUrl(githubSourceTrimed)) {
        throw new Error('Un lien Github est requis\n(ex: https://github.com/user/repo)');
    }

    const githubRawSourceTrimed = trimify(github?.raw);
    if (isStringEmpty(githubRawSourceTrimed) || !isGithubUserContentUrl(githubRawSourceTrimed)) {
        throw new Error(
            'Un lien githubusercontent est requis\n(ex: https://raw.githubusercontent.com/user/repo/file)'
        );
    }

    return {
        title: titleTrimed,
        slug: slugTrimed,
        thumbnail: thumbnailTrimed,
        github: {
            source: githubSourceTrimed,
            raw: githubRawSourceTrimed,
        },
        isDraft,
    };
}
