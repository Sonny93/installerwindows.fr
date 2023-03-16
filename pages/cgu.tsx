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

const markdown = `# Conditions Générales d'Utilisation

Nous vous remercions de visiter notre site Web installerwindows.fr et nous vous prions de lire attentivement les conditions générales d'utilisation ci-dessous.

## Introduction
Le site installerwindows.fr est destiné à fournir des informations utiles aux utilisateurs souhaitant installer ou réinstaller le système d'exploitation Windows sur leur ordinateur. En utilisant notre site Web, vous acceptez les présentes conditions générales d'utilisation.

## Cookies
Notre site Web utilise des cookies pour améliorer votre expérience de navigation. Les cookies sont des fichiers texte stockés sur votre ordinateur ou votre appareil mobile lorsque vous accédez à un site Web. Les cookies nous aident à comprendre comment vous utilisez notre site Web et nous permettent d'améliorer votre expérience de navigation.

Nous utilisons également Hotjar, un outil d'analyse Web qui utilise des cookies pour collecter des informations sur la façon dont les utilisateurs naviguent sur notre site Web. Les cookies Hotjar collectent des informations telles que l'adresse IP de l'utilisateur, la taille de l'écran, le type d'appareil, le navigateur utilisé et les pages visitées. Ces informations sont utilisées pour améliorer l'expérience de l'utilisateur sur notre site Web.

En utilisant notre site Web, vous consentez à l'utilisation des cookies et à la collecte d'informations par Hotjar.

## Responsabilité
Nous nous efforçons de fournir des informations exactes et à jour sur notre site Web. Toutefois, nous ne pouvons garantir l'exactitude, l'exhaustivité ou la pertinence des informations fournies. Nous ne sommes pas responsables des dommages directs ou indirects résultant de l'utilisation de notre site Web ou de l'impossibilité d'utiliser notre site Web.

## Propriété intellectuelle
Le contenu de notre site Web est protégé par les lois sur la propriété intellectuelle. Vous ne pouvez pas copier, modifier, distribuer ou utiliser le contenu de notre site Web à des fins commerciales sans notre autorisation écrite préalable.

## Modification des présentes conditions générales
Nous nous réservons le droit de modifier les présentes conditions générales d'utilisation à tout moment. Il est de votre responsabilité de vérifier régulièrement les conditions générales pour vous assurer que vous êtes au courant de tout changement.

## Contactez-nous
Si vous avez des questions ou des préoccupations concernant les présentes conditions générales d'utilisation ou l'utilisation des cookies sur notre site Web, veuillez nous contacter à l'adresse suivante : [adresse email].

Cordialement,

L'équipe d'installerwindows.fr`;
