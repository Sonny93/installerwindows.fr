import MarkdownPage from '../Components/GitHub/PageLayout';

export default function CGU({ markdown }: { markdown: string }) {
    return <MarkdownPage content={markdown} pageTitle={'CGU'} />;
}

export async function getServerSideProps() {
    return {
        props: {
            markdown,
        },
    };
}

const markdown = `# Bienvenue sur notre site web

En utilisant ce site, vous acceptez les présentes conditions d'utilisation. Veuillez les lire attentivement avant d'utiliser ce site.

Nous utilisons Hotjar pour améliorer la qualité de notre site web et comprendre comment les utilisateurs interagissent avec celui-ci. Hotjar est un service d'analyse de sites web qui utilise des cookies pour collecter des informations telles que les mouvements de souris, les clics et les actions des utilisateurs sur notre site. Ces informations sont utilisées pour améliorer la convivialité de notre site et l'expérience utilisateur. En utilisant notre site, vous acceptez que nous utilisions Hotjar à des fins statistiques.

## Cookies

Le site utilise des cookies pour collecter des informations sur l'utilisation du site par les utilisateurs. Voici une liste des cookies que nous utilisons et leurs fonctions :

-   Le cookie hj_truc est utilisé par Hotjar pour suivre les mouvements de souris et les clics des utilisateurs. Il nous permet de comprendre comment les utilisateurs naviguent sur notre site et d'identifier les problèmes éventuels.
-   Le cookie hj_blabla est utilisé par Hotjar pour enregistrer les sessions d'utilisateurs et les interactions avec le site. Cela nous permet de voir comment les utilisateurs interagissent avec notre site et d'identifier les domaines à améliorer.

En utilisant notre site, vous acceptez l'utilisation de ces cookies à des fins statistiques et pour améliorer votre expérience utilisateur. Si vous ne souhaitez pas que nous utilisions des cookies, vous pouvez les désactiver dans les paramètres de votre navigateur. Veuillez noter que cela peut affecter la fonctionnalité de notre site.`;
