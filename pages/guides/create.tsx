import { FormEvent, useState } from 'react';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';

export default function PageCreateGuide() {
    const [isDraft, setIsDraft] = useState<boolean>(true);

    const getFieldValue = (formData: FormData, key: string) =>
        (formData.get(key) || '').toString().trim();
    const slugify = (str: string = '') =>
        str
            .normalize('NFD')
            .replaceAll(/[\u0300-\u036f]/g, '')
            .replaceAll("'", '')
            .replaceAll('"', '')
            .replaceAll("'", '')
            .replaceAll(' ', '-')
            .toLowerCase();

    const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        try {
            const title = getFieldValue(formData, 'title');
            console.log(title);
            if (!title || title === '') {
                throw new Error('Missing guide title');
            }

            const slug = slugify(getFieldValue(formData, 'slug'));
            if (!slug || slug === '') {
                throw new Error('Missing guide slug');
            }

            const githubSource = getFieldValue(formData, 'github-source');
            if (!githubSource || githubSource === '') {
                throw new Error('Missing github source');
            }

            const githubRawSource = getFieldValue(formData, 'github-raw-source');
            if (!githubRawSource || githubRawSource === '') {
                throw new Error('Missing github raw source ');
            }

            console.log(title, slug, githubSource, githubRawSource, isDraft);
            const request = await fetch(`/api/guide/create`, {
                method: 'post',
                body: JSON.stringify({
                    title,
                    slug,
                    githubSource,
                    githubRawSource,
                    isDraft,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const response = await request.json();
            if (request.ok) {
                console.log(response);
            } else {
                console.error(response);
            }
        } catch (error: any) {
            console.warn(error);
        }
    };
    return (
        <div>
            <Navbar />
            <form onSubmit={handleSubmitForm}>
                <h1>Ajouter un guide</h1>
                <div className="field">
                    <label htmlFor="title">Titre</label>
                    <input type="text" placeholder="Titre" name="title" id="title" />
                </div>
                <div className="field">
                    <label htmlFor="slug">Slug</label>
                    <input type="text" placeholder="Slug" name="slug" id="slug" />
                </div>
                <div className="field">
                    <label htmlFor="github-source">Source Github</label>
                    <input
                        type="text"
                        placeholder="Source Github"
                        name="github-source"
                        id="github-source"
                    />
                </div>
                <div className="field">
                    <label htmlFor="github-raw-source">Source Github Raw</label>
                    <input
                        type="text"
                        placeholder="Source Github Raw"
                        name="github-raw-source"
                        id="github-raw-source"
                    />
                </div>
                <div className="field">
                    <input
                        type="checkbox"
                        name="is-draft"
                        id="is-draft"
                        onChange={(event) => setIsDraft(event.target.checked)}
                        checked={isDraft}
                    />
                    <label htmlFor="is-draft">brouillon?</label>
                </div>
                <div className="field">
                    <button type="submit">Ajouter guide</button>
                </div>
            </form>
            <Footer />
        </div>
    );
}
