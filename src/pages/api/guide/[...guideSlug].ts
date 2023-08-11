import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import nextConnect, { NextHandler } from "next-connect";

import { deleteGuide, updateGuide } from "lib/db";
import { verifyGuideForm } from "utils/api";
import { findGuideBySlugOrThrow } from "utils/db";
import { authOptions } from "../auth/[...nextauth]";

const apiRoute = nextConnect({
  onError: (error, req: NextApiRequest, res: NextApiResponse) =>
    res
      .status(501)
      .json({ error: `Une erreur est survenue! ${error.message}` }),
  onNoMatch: (req: NextApiRequest, res: NextApiResponse) =>
    res
      .status(405)
      .json({ error: `La méthode '${req.method}' n'est pas autorisée` }),
});

apiRoute.all(
  async (
    request: NextApiRequest,
    response: NextApiResponse,
    next: NextHandler
  ) => {
    const session = await getServerSession(request, response, authOptions);
    if (!session) {
      response.status(403).send({
        error: "Vous devez être connecté pour effectuer cette action",
      });
    } else {
      next();
    }
  }
);

apiRoute.put(async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const guideSlug = request.query?.guideSlug?.[0] as string;
    await findGuideBySlugOrThrow(guideSlug);

    const body = request.body;
    if (!body) {
      throw new Error("Missing body");
    }

    const guide = verifyGuideForm(body);
    updateGuide(guideSlug, guide);
    response.status(200).json({ guide });
  } catch (error: any) {
    console.error(error);
    response.status(500).json({
      error:
        error?.message ||
        "Une erreur est survenue lors de la modification du guide",
    });
  }
});

apiRoute.delete(async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const guideSlug = request.query?.guideSlug?.[0] as string;
    await findGuideBySlugOrThrow(guideSlug);

    await deleteGuide(guideSlug);
    response.status(200).json({ guideSlug });
  } catch (error: any) {
    console.error(error);
    response.status(500).json({
      error:
        error?.message ||
        "Une erreur est survenue lors de la suppression du guide",
    });
  }
});

apiRoute.put(async (request: NextApiRequest, response: NextApiResponse) => {});

export default apiRoute;
