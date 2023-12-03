import { Request, Response, Router } from "express";

import { TagCreateInput } from "../types/tag";
import TagEntity from "../entities/Tag.entity";

import TagService from "../services/tags.service";

const router = Router();

router.get("/list", async function (req: Request, res: Response) {
  const result: TagEntity[] = await new TagService().list();
  res.send(result);
});

router.get("/find/:id", async function (req: Request, res: Response) {
  const id = +req.params.id;
  try {
    const result = await new TagService().find(id);
    res.send(result);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

// ---

router.post("/create", async function (req: Request, res: Response) {
  try {
    const { name }: TagCreateInput = req.body;
    const result: TagCreateInput = await new TagService().create({
      name,
    });
    res.send(result);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

// ---

router.patch("/patch/:id", async function (req: Request, res: Response) {
  const id: number = +req.params.id;
  const data: Partial<TagEntity> = req.body;

  try {
    const result: TagEntity = await new TagService().patch(id, data);
    res.send(result);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

// ---

router.delete("/delete/:id", async function (req: Request, res: Response) {
  const id: number = +req.params.id;

  try {
    const result: TagEntity[] = await new TagService().delete(id);
    res.send(result);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

export default router;
