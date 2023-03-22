import { useMemo, useState } from 'react';
import { slugify } from '../../utils';
import CheckboxInput from './CheckboxInput';
import FormField from './FormField';
import Submit from './Submit';

export default function GuideForm({
    defaultValues,
    onSubmit,
    canSubmit,
}: {
    defaultValues: Guide;
    onSubmit: any;
    canSubmit: boolean;
}) {
    const [title, setTitle] = useState<Guide['title']>(defaultValues.title);
    const [slug, setSlug] = useState<Guide['slug']>(defaultValues.slug);
    const [thumbnail, setThumbnail] = useState<Guide['thumbnail']>(defaultValues.thumbnail);
    const [githubSource, setGithubSource] = useState<Guide['github']['source']>(
        defaultValues.github.source
    );
    const [githubRawSource, setGithubRawSource] = useState<Guide['github']['raw']>(
        defaultValues.github.raw
    );
    const [isDraft, setDraft] = useState<Guide['isDraft']>(defaultValues.isDraft);

    const fieldsTrimed = useMemo<string[]>(
        () => [title, slug, thumbnail, githubSource, githubRawSource].map(trimify),
        [githubRawSource, githubSource, slug, thumbnail, title]
    );
    return (
        <form onSubmit={onSubmit}>
            <h1>Ajouter un guide</h1>
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
                <label htmlFor="slug">Slug (ex: {slugify('Mon super guide de test')})</label>
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
            <FormField label="Brouillon" name="is-draft" inline reverse>
                <CheckboxInput
                    name="is-draft"
                    checked={isDraft}
                    onChange={({ checked }) => setDraft(checked)}
                />
            </FormField>
            <FormField name="submit-form">
                <Submit label="Ajouter le guide" disabled={!canSubmit} />
            </FormField>
        </form>
    );
}
