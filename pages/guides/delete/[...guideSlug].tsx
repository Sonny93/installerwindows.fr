import { FormEvent, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import Footer from '../../../Components/Footer/Footer';
import Navbar from '../../../Components/Navbar/Navbar';

import { getGuides } from '../../../lib/db';

import styles from './guide-delete.module.scss';

export default function GuideDelete({ guide }: { guide: Guide }) {
    const { title, slug, github, thumbnail, isDraft } = guide;

    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [guideDeleted, setGuideDeleted] = useState<boolean>(false);

    const canDelete = useMemo<boolean>(
        () => confirmDelete && !isLoading && !guideDeleted,
        [confirmDelete, guideDeleted, isLoading]
    );

    const handleDeleteGuide = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            const request = await fetch(`/api/guide/delete`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await request.json();
            if (request.ok) {
                toast.success('Guide supprimé');
                setGuideDeleted(true);
            } else {
                console.error(request, data);
                throw new Error('Une erreur est survenue lors de la suppression du guide');
            }
        } catch (error: any) {
            console.warn(error);
            toast.error(
                error?.message || 'Une erreur est survenue lors de la suppression du guide'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles['guide-delete']}>
            <Navbar />
            <main>
                <h1>Supprimer un guide</h1>
                <form onSubmit={handleDeleteGuide}>
                    <div className="form-field">
                        <label htmlFor="title">Titre</label>
                        <input
                            type="text"
                            placeholder="Titre"
                            name="title"
                            id="title"
                            value={title}
                            readOnly
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="slug">Slug</label>
                        <input
                            type="text"
                            placeholder="Slug"
                            name="slug"
                            id="slug"
                            value={slug}
                            readOnly
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="github-source">Miniature</label>
                        <input
                            type="text"
                            placeholder="Miniatiature"
                            name="thumbnail"
                            id="thumbnail"
                            value={thumbnail}
                            readOnly
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="github-source">Source Github</label>
                        <input
                            type="text"
                            placeholder="Source Github"
                            name="github-source"
                            id="github-source"
                            value={github.source}
                            readOnly
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="github-raw-source">Source Github Raw</label>
                        <input
                            type="text"
                            placeholder="Source Github Raw"
                            name="github-raw-source"
                            id="github-raw-source"
                            value={github.raw}
                            readOnly
                        />
                    </div>
                    <div className="form-field">
                        <p>
                            Est un brouillon :{' '}
                            <span style={{ color: 'blue' }}>{isDraft ? 'Oui' : 'Non'}</span>
                        </p>
                    </div>
                    <div className="form-radio-container">
                        <div className="form-radio-btn">
                            <input
                                type="checkbox"
                                name="confirm-delete"
                                id="confirm-delete"
                                checked={confirmDelete}
                                onChange={(event) => setConfirmDelete(event.target.checked)}
                                readOnly
                            />
                            <label htmlFor="confirm-delete" style={{ fontSize: '.85em' }}>
                                Confirmer la suppression de "{guide.title}"
                            </label>
                        </div>
                    </div>
                    <div className="form-field">
                        <button type="submit" disabled={!canDelete}>
                            Supprimer le guide
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
