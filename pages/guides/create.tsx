import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { FormEvent, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { authOptions } from '../api/auth/[...nextauth]';

import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';

import { isGithubUrl, isGithubUserContentUrl, isStringEmpty, slugify, trimify } from '../../Utils';

import Link from 'next/link';
import styles from './guide-create.module.scss';

export default function PageCreateGuide() {
    const [title, setTitle] = useState<string>('');
    const [slug, setSlug] = useState<string>('');
    const [githubSource, setGithubSource] = useState<string>('');
    const [githubRawSource, setGithubRawSource] = useState<string>('');
    const [isDraft, setIsDraft] = useState<boolean>(false);

    const [guide, setGuide] = useState<Guide>(undefined);
    const [isLoading, setLoading] = useState<boolean>(false);

    const canSubmit = useMemo<boolean>(() => {
        const titleTrimed = trimify(title);
        const slugTrimed = trimify(slug);
        const githubSourceTrimed = trimify(githubSource);
        const githubRawSourceTrimed = trimify(githubRawSource);

        return (
            !isStringEmpty(titleTrimed) &&
            !isStringEmpty(slugTrimed) &&
            !isStringEmpty(githubSourceTrimed) &&
            isGithubUrl(githubSourceTrimed) &&
            !isStringEmpty(githubRawSourceTrimed) &&
            isGithubUserContentUrl(githubRawSourceTrimed) &&
            !isLoading &&
            !guide
        );
    }, [githubRawSource, githubSource, guide, isLoading, slug, title]);

    const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            const titleTrimed = trimify(title);
            if (isStringEmpty(titleTrimed)) {
                throw new Error('Titre du guide manquant');
            }

            const slugTrimed = trimify(slug);
            if (isStringEmpty(slugTrimed)) {
                setSlug(slugify(titleTrimed));
            }

            const githubSourceTrimed = trimify(githubSource);
            if (isStringEmpty(githubSourceTrimed) || !isGithubUrl(githubSourceTrimed)) {
                throw new Error('Un lien Github est requis\n(ex: https://github.com/user/repo)');
            }

            const githubRawSourceTrimed = trimify(githubRawSource);
            if (
                isStringEmpty(githubRawSourceTrimed) ||
                !isGithubUserContentUrl(githubRawSourceTrimed)
            ) {
                throw new Error(
                    'Un lien githubusercontent est requis\n(ex: https://raw.githubusercontent.com/user/repo/file)'
                );
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
                toast.success('Guide créé avec succès');
                setGuide(data?.guide);
            } else {
                console.error(request, data);
                throw new Error('Une erreur est survenue lors de la création du guide');
            }
        } catch (error: any) {
            console.warn(error);
            toast.error(error?.message || 'Une erreur est survenue lors de la création du guide');
        } finally {
            setLoading(false);
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
                    <button type="submit" disabled={!canSubmit}>
                        Ajouter le guide
                    </button>
                </div>
                {guide && <Link href={`/guide/${guide.slug}`}>Lien vers le guide</Link>}
            </form>
            <Footer />
        </div>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);
    if (!session) {
        return { redirect: { destination: '/' } };
    }

    return {
        props: {},
    };
}
