import { FormEvent, useState } from 'react';

import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';

import styles from './guide-create.module.scss';

export default function PageCreateGuide() {
    const [guide, setGuide] = useState<Guide>(undefined);

    const [title, setTitle] = useState<string>('');
    const [slug, setSlug] = useState<string>('');
    const [githubSource, setGithubSource] = useState<string>('');
    const [githubRawSource, setGithubRawSource] = useState<string>('');
    const [isDraft, setIsDraft] = useState<boolean>(false);

    const trimify = (str: string = '') => str.trim();
    const slugify = (str: string = '') =>
        str
            .normalize('NFD')
            .replaceAll(' ', '-')
            .replaceAll(/[\u0300-\u036f'"=\(\)&_]/g, '')
            .replace(/^-+|-+(?=-|$)/g, '')
            .toLowerCase();

    const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const titleTrimed = trimify(title);
            if (!titleTrimed || titleTrimed === '') {
                throw new Error('Missing guide title');
            }

            const slugTrimed = trimify(slug);
            console.log(slugTrimed, slug);
            if (!slugTrimed || slugTrimed === '') {
                setSlug(slugify(titleTrimed));
            }

            const githubSourceTrimed = trimify(githubSource);
            if (!githubSourceTrimed || githubSourceTrimed === '') {
                throw new Error('Missing github source');
            }

            const githubRawSourceTrimed = trimify(githubRawSource);
            if (!githubRawSourceTrimed || githubRawSourceTrimed === '') {
                throw new Error('Missing github raw source ');
            }

            const request = await fetch(`/api/guide/create`, {
                method: 'post',
                body: JSON.stringify({
                    title: titleTrimed,
                    slug: slugTrimed,
                    githubSource: githubSourceTrimed,
                    githubRawSource: githubRawSourceTrimed,
                    isDraft,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await request.json();
            if (request.ok) {
                console.log(data);
                setGuide(data?.guide);
            } else {
                alert('Une erreur est survenue lors de la création du guide');
            }
        } catch (error: any) {
            console.warn(error);
        }
    };
    return (
        <div className={styles['guide-create']}>
            <Navbar />
            <form onSubmit={handleSubmitForm}>
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
                    <button type="submit">Ajouter le guide</button>
                </div>
                {guide && <pre className="form-field">{JSON.stringify(guide, null, 2)}</pre>}
            </form>
            <Footer />
        </div>
    );
}
