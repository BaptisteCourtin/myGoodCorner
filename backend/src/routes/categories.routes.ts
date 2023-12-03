import { Request, Response, Router } from "express";

import { CategoryCreateInput } from "../types/category";
import CategoryEntity from "../entities/Category.entity";

import CategoriesService from "../services/categories.service";

const router = Router();

router.get("/list", async function (req: Request, res: Response) {
  const result: CategoryEntity[] = await new CategoriesService().list();
  res.send(result);
});

router.get("/find/:id", async function (req: Request, res: Response) {
  const id = +req.params.id;
  try {
    const result: CategoryEntity = await new CategoriesService().find(id);
    res.send(result);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

// ---

router.post("/create", async function (req: Request, res: Response) {
  try {
    const { name }: CategoryCreateInput = req.body;
    const result: CategoryEntity[] = await new CategoriesService().create({
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
  const data: Partial<CategoryEntity> = req.body;

  try {
    const result: CategoryEntity[] = await new CategoriesService().patch(
      id,
      data
    );
    res.send(result);
  } catch (err: any) {
    res.send({ message: err, success: false });
  }
});

// // ---

router.delete("/delete/:id", async function (req: Request, res: Response) {
  const id: number = +req.params.id;

  try {
    const result: CategoryEntity[] = await new CategoriesService().delete(id);
    res.send(result);
  } catch (err: any) {
    res.send({ message: err, success: false });
  }
});

export default router;
