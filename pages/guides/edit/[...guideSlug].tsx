import { FormEvent, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import Footer from '../../../Components/Footer/Footer';
import CheckboxInput from '../../../Components/Form/CheckboxInput';
import FormField from '../../../Components/Form/FormField';
import TextInput from '../../../Components/Form/TextInput';
import Navbar from '../../../Components/Navbar/Navbar';

import { getGuides } from '../../../lib/db';
import {
    isGithubUrl,
    isGithubUserContentUrl,
    isImgurUrl,
    isStringEmpty,
    slugify,
    trimify,
} from '../../../utils';

import styles from './guide-edit.module.scss';

export default function GuideEdit({ guide }: { guide: Guide }) {
    const { register, handleSubmit, formState } = useForm();

    const [title, setTitle] = useState<Guide['title']>(guide.title);
    const [slug, setSlug] = useState<Guide['slug']>(guide.slug);
    const [thumbnail, setThumbnail] = useState<Guide['thumbnail']>(guide.thumbnail);
    const [githubSource, setGithubSource] = useState<Guide['github']['source']>(
        guide.github.source
    );
    const [githubRawSource, setGithubRawSource] = useState<Guide['github']['raw']>(
        guide.github.raw
    );
    const [isDraft, setDraft] = useState<Guide['isDraft']>(guide.isDraft);

    const [isLoading, setLoading] = useState<boolean>(false);
    const [guideEdited, setEdited] = useState<boolean>(false);

    const fieldsTrimed = useMemo<string[]>(
        () => [title, slug, thumbnail, githubSource, githubRawSource].map(trimify),
        [githubRawSource, githubSource, slug, thumbnail, title]
    );
    const fieldsValid = useMemo<boolean>(() => {
        const [
            titleTrimed,
            slugTrimed,
            thumbnailTrimed,
            githubSourceTrimed,
            githubRawSourceTrimed,
        ] = fieldsTrimed;

        const isTitleValid = !isStringEmpty(titleTrimed);
        const isSlugValid = !isStringEmpty(slugTrimed);
        const isThumbnailSourceValid = !isStringEmpty(thumbnailTrimed)
            ? isImgurUrl(thumbnailTrimed)
            : true;
        const isGituhbSourceValid =
            !isStringEmpty(githubSourceTrimed) && isGithubUrl(githubSourceTrimed);
        const isGituhbSourceRawValid =
            !isStringEmpty(githubRawSourceTrimed) && isGithubUserContentUrl(githubRawSourceTrimed);

        return (
            isTitleValid &&
            isSlugValid &&
            isThumbnailSourceValid &&
            isGituhbSourceValid &&
            isGituhbSourceRawValid
        );
    }, [fieldsTrimed]);
    const isOneOrMoreFieldEdited = useMemo<boolean>(() => {
        const [
            titleTrimed,
            slugTrimed,
            thumbnailTrimed,
            githubSourceTrimed,
            githubRawSourceTrimed,
        ] = fieldsTrimed;

        return (
            titleTrimed !== guide.title ||
            slugTrimed !== guide.slug ||
            thumbnailTrimed !== guide.thumbnail ||
            githubSourceTrimed !== guide.github.source ||
            githubRawSourceTrimed !== guide.github.raw ||
            isDraft !== guide.isDraft
        );
    }, [fieldsTrimed, guide, isDraft]);

    const canEdit = useMemo<boolean>(
        () => fieldsValid && isOneOrMoreFieldEdited && !isLoading && !guideEdited,
        [fieldsValid, guideEdited, isLoading, isOneOrMoreFieldEdited]
    );

    const handleEditGuide = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            const [
                titleTrimed,
                slugTrimed,
                thumbnailTrimed,
                githubSourceTrimed,
                githubRawSourceTrimed,
            ] = fieldsTrimed;

            if (fieldsValid) {
                return;
            }
        } catch (error: any) {
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles['guide-edit']}>
            <Navbar />
            <main>
                <form onSubmit={handleEditGuide}>
                    <h1>Modifier un guide</h1>
                    <FormField
                        label="Titre"
                        name="title"
                        rule={{
                            validation: !isStringEmpty(title),
                            error: 'Champ requis',
                        }}
                    >
                        <TextInput
                            name="title"
                            placeholder="Titre"
                            value={title}
                            onChange={({ value }) => setTitle(value)}
                            onBlur={({ value }) => {
                                if (trimify(slug) === '') {
                                    setSlug(slugify(value));
                                }
                            }}
                        />
                    </FormField>
                    <FormField
                        label={`Slug (ex: ${slugify('Mon super guide')})`}
                        name="slug"
                        rule={{
                            validation: !isStringEmpty(title),
                            error: 'Champ requis',
                        }}
                    >
                        <TextInput
                            name="slug"
                            placeholder={slugify('Mon super guide')}
                            value={slug}
                            onChange={({ value }) => setSlug(value)}
                            onBlur={({ value }) => setSlug(slugify(value))}
                        />
                    </FormField>
                    <FormField label="Miniature (optionnel)" name="thumbnail">
                        <TextInput
                            name="thumbnail"
                            placeholder="Lien miniature"
                            value={thumbnail}
                            onChange={({ value }) => setThumbnail(value)}
                        />
                    </FormField>
                    <FormField label="Source Github" name="github-source">
                        <TextInput
                            name="github-source"
                            placeholder="Lien Github"
                            value={githubSource}
                            onChange={({ value }) => setGithubSource(value)}
                        />
                    </FormField>
                    <FormField label="Source Github Raw" name="github-source-raw">
                        <TextInput
                            name="github-source-raw"
                            placeholder="Lien vers le fichier brut (raw)"
                            value={githubRawSource}
                            onChange={({ value }) => setGithubRawSource(value)}
                        />
                    </FormField>
                    <FormField label="Brouillon" name="is-draft" inline reverse>
                        <CheckboxInput
                            name="is-draft"
                            checked={isDraft}
                            onChange={({ checked }) => setDraft(checked)}
                        />
                    </FormField>
                    <FormField name="form-submit">
                        <button type="submit" disabled={!canEdit}>
                            Modifier le guide
                        </button>
                    </FormField>
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
