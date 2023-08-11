// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { pushGuide } from "lib/db";
import { verifyGuideForm } from "utils/api";
import { findGuideBySlug } from "utils/db";
import { authOptions } from "../auth/[...nextauth]";

type Data = {
  guide: Guide;
};

type DataError = {
  error: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | DataError>
) {
  const session = await getServerSession(req, res, authOptions);
  try {
    if (!session) {
      throw new Error("Vous devez être connecté pour effectuer cette action");
    }

    const guide = verifyGuideForm(req.body);

    const guideExist = await findGuideBySlug(guide.slug);
    if (guideExist) {
      throw new Error("Guide with slug " + guide.slug + " already exist");
    }

    pushGuide(guide);
    res.status(200).json({ guide });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error:
        error?.message ||
        "Une erreur est survenue lors de la création du guide",
    });
  }
}
