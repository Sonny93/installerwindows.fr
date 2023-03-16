// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/db';

type Data = {
    guide: Guide;
};

type DataError = {
    error: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | DataError>) {
    const { title, slug, githubSource, githubRawSource, isDraft } = req.body;

    try {
        await db.data.guides.push({
            title,
            slug,
            github: {
                source: githubSource,
                raw: githubRawSource,
            },
            isDraft,
        });
        await db.write();

        const guide = await db.data.guides.find((guide) => guide.slug === slug);
        if (!guide) {
            throw new Error('Unable to find guide ' + slug);
        }

        res.status(200).json({ guide });
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ error: 'error' });
    }
}
