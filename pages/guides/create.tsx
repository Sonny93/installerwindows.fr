import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';

import Footer from '../../Components/Footer/Footer';
import GuideForm from '../../Components/Form/GuideForm';
import Navbar from '../../Components/Navbar/Navbar';

import { redirectWithoutClientCache } from '../../utils/client';
import { postRequest } from '../../utils/request';
import { authOptions } from '../api/auth/[...nextauth]';

import styles from './guide-create.module.scss';

export default function PageCreateGuide() {
    const router = useRouter();

    const [guide, setGuide] = useState<Guide>(undefined);
    const [isLoading, setLoading] = useState<boolean>(false);

    const handleSubmitForm = async (values: GuideFormValues) => {
        setLoading(true);

        try {
            const data = await postRequest('/api/guide/create', values);
            const guide = data?.guide as Guide;
            setGuide(guide);

            toast.success('Guide créé avec succès');
            redirectWithoutClientCache(router, `/guide/${guide.slug}`);
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
            <main>
                <h1>Nouveau guide</h1>
                <GuideForm
                    onSubmit={handleSubmitForm}
                    canSubmit={!guide}
                    isLoading={isLoading}
                    isSubmitted={!!guide}
                />
            </main>
            <Footer />
        </div>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);
    if (!session) {
        return { redirect: { destination: '/guides' } };
    }

    return {
        props: {},
    };
}
