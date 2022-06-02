import { NextSeo } from 'next-seo';
import Controls from '../Components/ErrorPage/Controls';
import styles from '../styles/error-page.module.scss';

export default function Offline() {
    return (<>
        <NextSeo
            description='-- Hors ligne --'
        />
        <div className={styles['App']}>
            <div className={styles['title']}>
                <h1>Oups</h1>
                <h2>Vous n'êtes pas connecté à internet.</h2>
            </div>
            <Controls />
        </div>
    </>)
}