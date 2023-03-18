// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession, Session } from 'next-auth';

import { getGuides, _db } from '../../../lib/db';
import { isGithubUrl, isGithubUserContentUrl, isStringEmpty, trimify } from '../../../Utils';
import { authOptions } from '../auth/[...nextauth]';

type Data = {
    guide: Guide;
};

type DataError = {
    error: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | DataError>) {
    const session = await getServerSession(req, res, authOptions);
    try {
        if (!session) {
            throw new Error('Vous devez être connecté pour effectuer cette action');
        }

        const { title, slug, githubSource, githubRawSource, isDraft = false } = req.body;

        const titleTrimed = trimify(title);
        if (isStringEmpty(titleTrimed)) {
            throw new Error('Titre du guide manquant');
        }

        const slugTrimed = trimify(slug);
        if (isStringEmpty(slugTrimed)) {
            throw new Error('Slug du guide manquant');
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

        await _db.data.guides.push({
            title,
            slug,
            github: {
                source: githubSource,
                raw: githubRawSource,
            },
            isDraft,
        });
        await _db.write();

        const guide = (await getGuides()).find((guide) => guide.slug === slug);
        if (!guide) {
            throw new Error('Unable to find guide ' + slug);
        }

        res.status(200).json({ guide });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            error: error?.message || 'Une erreur est survenue lors de la création du guide',
        });
    }
}
