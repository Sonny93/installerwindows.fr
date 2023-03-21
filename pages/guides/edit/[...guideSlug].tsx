import { FormEvent, useMemo, useState } from 'react';

import Footer from '../../../Components/Footer/Footer';
import Navbar from '../../../Components/Navbar/Navbar';

import { getGuides } from '../../../lib/db';
import {
    isGithubUrl,
    isGithubUserContentUrl,
    isImgurUrl,
    isStringEmpty,
    slugify,
    trimify,
} from '../../../Utils';

import styles from './guide-edit.module.scss';

export default function GuideEdit({ guide }: { guide: Guide }) {
    const [title, setTitle] = useState<Guide['title']>(guide.title);
    const [slug, setSlug] = useState<Guide['slug']>(guide.slug);
    const [thumbnail, setThumbnail] = useState<Guide['thumbnail']>(guide.thumbnail);
    const [githubSource, setGithubSource] = useState<Guide['github']['source']>(
        guide.github.source
    );
    const [githubRawSource, setGithubRawSource] = useState<Guide['github']['raw']>(
        guide.github.raw
    );
    const [isDraft, setIsDraft] = useState<Guide['isDraft']>(guide.isDraft);

    const [isLoading, setLoading] = useState<boolean>(false);
    const [guideEdited, setEdited] = useState<boolean>(false);

    const canEdit = useMemo<boolean>(() => {
        const titleTrimed = trimify(title);
        const slugTrimed = trimify(slug);
        const thumbnailTrimed = trimify(thumbnail);
        const githubSourceTrimed = trimify(githubSource);
        const githubRawSourceTrimed = trimify(githubRawSource);

        const isTitleOk = !isStringEmpty(titleTrimed) && titleTrimed !== guide.title;
        const isSlugOk = !isStringEmpty(slugTrimed) && slugTrimed !== guide.slug;
        const isThumbnailSourceOk =
            (!isStringEmpty(thumbnailTrimed) ? isImgurUrl(thumbnailTrimed) : true) &&
            thumbnailTrimed !== guide.thumbnail;
        const isGituhbSourceOk =
            !isStringEmpty(githubSourceTrimed) &&
            isGithubUrl(githubSourceTrimed) &&
            githubSourceTrimed !== guide.github.source;
        const isGituhbSourceRawOk =
            !isStringEmpty(githubRawSourceTrimed) &&
            isGithubUserContentUrl(githubRawSourceTrimed) &&
            githubRawSourceTrimed !== guide.github.raw;
        const isDraftOk = isDraft !== guide.isDraft;
        return (
            isTitleOk &&
            isSlugOk &&
            isThumbnailSourceOk &&
            isGituhbSourceOk &&
            isGituhbSourceRawOk &&
            isDraftOk &&
            !isLoading &&
            !guide
        );
    }, [githubRawSource, githubSource, guide, isDraft, isLoading, slug, thumbnail, title]);

    const handleEditGuide = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <div className={styles['guide-delete']}>
            <Navbar />
            <main>
                <form onSubmit={handleEditGuide}>
                    <h1>Supprimer un guide</h1>
                    <div className="form-field">
                        <label htmlFor="title">Titre</label>
                        <input
                            type="text"
                            placeholder="Titre"
                            name="title"
                            id="title"
                            onChange={({ target }) => setTitle(target.value)}
                            onBlur={({ target }) => {
                                if (trimify(slug) === '') {
                                    setSlug(slugify(target.value));
                                }
                            }}
                            value={title}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="slug">
                            Slug (ex: {slugify('Mon super guide de test')})
                        </label>
                        <input
                            type="text"
                            placeholder="Slug"
                            name="slug"
                            id="slug"
                            onChange={({ target }) => setSlug(target.value)}
                            onBlur={({ target }) => setSlug(slugify(target.value))}
                            value={slug}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="github-source">Miniature</label>
                        <input
                            type="text"
                            placeholder="Miniature"
                            name="thumbnail"
                            id="thumbnail"
                            onChange={({ target }) => setThumbnail(target.value)}
                            value={thumbnail}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="github-source">Source Github</label>
                        <input
                            type="text"
                            placeholder="Source Github"
                            name="github-source"
                            id="github-source"
                            onChange={({ target }) => setGithubSource(target.value)}
                            value={githubSource}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="github-raw-source">Source Github Raw</label>
                        <input
                            type="text"
                            placeholder="Source Github Raw"
                            name="github-raw-source"
                            id="github-raw-source"
                            onChange={({ target }) => setGithubRawSource(target.value)}
                            value={githubRawSource}
                        />
                    </div>
                    <div className="form-radio-container">
                        <div className="form-radio-btn">
                            <input
                                type="checkbox"
                                name="is-draft"
                                id="is-draft"
                                onChange={(event) => setIsDraft(event.target.checked)}
                                checked={isDraft}
                            />
                            <label htmlFor="is-draft">brouillon?</label>
                        </div>
                    </div>
                    <div className="form-field">
                        <button type="submit" disabled={!canEdit}>
                            Modifier le guide
                        </button>
                    </div>
                </form>
            </main>
            <Footer />
        </div>
    );
}

export async function getServerSideProps({ query }) {
    const guideSlug = query.guideSlug?.[0] || '';
    const guide = (await getGuides()).find(({ slug }) => slug === guideSlug);
    if (!guide) {
        return { redirect: { destination: '/guides' } };
    }

    return {
        props: {
            guide,
        },
    };
}
