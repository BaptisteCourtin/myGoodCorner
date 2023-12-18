import { Request, Response, Router } from "express";

import { AdCreateInput } from "../types/ad";
import AdEntity from "../entities/Ad.entity";

import AdService from "../services/ads.service";

const router = Router();

router.get("/list", async function (req: Request, res: Response) {
  const { search } = req.query;
  const result: AdEntity[] = await new AdService().list(
    search as any as string | undefined
  );
  res.send(result);
});

router.get("/find/:id", async function (req: Request, res: Response) {
  const id = +req.params.id;
  try {
    const result = await new AdService().find(id);
    res.send(result);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

router.get("/findBySlug/:slug", async function (req: Request, res: Response) {
  const slug = req.params.slug;
  try {
    const result = await new AdService().findBySlug(slug);
    res.send(result);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

// ---

router.post("/create", async function (req: Request, res: Response) {
  const {
    description,
    location,
    owner,
    picture,
    price,
    title,
    category,
    tags,
  }: AdCreateInput = req.body;

  try {
    const result: AdEntity[] = await new AdService().create({
      description,
      location,
      owner,
      picture,
      price,
      title,
      category,
      tags,
    });
    res.send(result);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

// ---

router.patch("/patch/:id", async function (req: Request, res: Response) {
  const id: number = +req.params.id;
  const data: Partial<AdEntity> = req.body;

  try {
    const ad: AdEntity = await new AdService().patch(
      id,
      data as Partial<AdEntity> & { tags: string[] }
    );
    res.send(ad);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

// ---

router.delete("/delete/:id", async function (req: Request, res: Response) {
  const id: number = +req.params.id;

  try {
    const result: AdEntity[] = await new AdService().delete(id);
    res.send(result);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

export default router;
