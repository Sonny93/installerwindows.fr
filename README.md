# Installerwindows.fr

Installerwindows.fr est un site avec différents guides pour apprendre à (ré)installer Windows 10/11 au propre et faire des optimisations saines pour votre machine. Il s'agit d'un guide complet, que vous devriez pouvoir suivre quel que soit votre niveau en informatique.

## Technologies

Le site se base sur ces technologies pour fonctionner.

Next.JS (React), Typescript, SASS

## Installer les dépendances

Commande pour installer les dépendances

```shell
pnpm install
```

## Lancer localement le site (dev)

Commande pour lancer le site en local dans un environnement de dév

```shell
pnpm run dev
```

## Lancer localement le site (prod)

Commande pour lancer le site en local dans un environnement de prod

```shell
pnpm run build
pnpm start
```

## Publier une nouvelle release

```shell
make release
# ou
npx release-it
```

#### YouTube API key

> https://console.cloud.google.com/apis/dashboard
> Search bar -> YouTube Data v3
> https://console.cloud.google.com/apis/credentials
> Create credentials -> API Key
