import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import Footer from '../../../Components/Footer/Footer';
import GuideForm from '../../../Components/Form/GuideForm';
import Navbar from '../../../Components/Navbar/Navbar';

import { getGuides } from '../../../lib/db';
import { redirectWithoutClientCache } from '../../../utils/client';
import { putRequest } from '../../../utils/request';

import styles from './guide-edit.module.scss';

export default function GuideEdit({ guide }: { guide: Guide }) {
    const router = useRouter();

    const [isLoading, setLoading] = useState<boolean>(false);
    const [values, setValues] = useState<GuideFormValues>(guide);
    const [guideEdited, setEdited] = useState<boolean>(false);

    const isOneOrMoreFieldEdited = useMemo<boolean>(() => {
        const { title, slug, thumbnail, github, isDraft } = values;

        return (
            title !== guide.title ||
            slug !== guide.slug ||
            thumbnail !== guide.thumbnail ||
            github.source !== guide.github.source ||
            github.raw !== guide.github.raw ||
            isDraft !== guide.isDraft
        );
    }, [guide, values]);

    const handleValuesChange = (values: GuideFormValues) => setValues(values);
    const handleEditGuide = async (values: GuideFormValues) => {
        setLoading(true);

        try {
            await putRequest(`/api/guide/${guide.slug}`, values);
            setEdited(true);

            toast.success('Guide modifié avec succès');
            redirectWithoutClientCache(router, `/guide/${guide.slug}`);
        } catch (error: any) {
            console.warn(error);
            toast.error(
                error?.message || 'Une erreur est survenue lors de la modification du guide'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles['guide-edit']}>
            <Navbar />
            <main>
                <h1>Modifier un guide</h1>
                <GuideForm
                    defaultValues={guide}
                    onSubmit={handleEditGuide}
                    onValuesChange={handleValuesChange}
                    canSubmit={isOneOrMoreFieldEdited}
                    isLoading={isLoading}
                    isSubmitted={guideEdited}
                />
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
