import { Request, Response, NextFunction, Router } from "express";
import {
  allNews,
  createNewsItem,
  deleteNewsItem,
  oneNewsItem,
  updateNewsItem,
} from "../db/database.js";

const router = Router();

const getAllNews = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const queryResult = await allNews();

    res.json(queryResult);
  } catch (error) {
    next(error);
  }
};

const getOneNewsItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const queryResult = await oneNewsItem(req.params.id);

    if (queryResult.length === 0) {
      res.status(404).json({
        success: false,
        message: "News item not found.",
      });

      return;
    }

    res.json(queryResult[0]);
  } catch (error) {
    next(error);
  }
};

const addNewsItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { title, slug, text } = req.body as {
      title?: string;
      slug?: string;
      text?: string;
    };

    title = title?.trim();
    slug = slug?.trim();
    text = text?.trim();

     if (!title || !slug || !text) {
      res.status(400).json({
        success: false,
        message: "Title, slug and text are required.",
      });

      return;
    }


    if (!title || !slug || !text) {
      res.status(400).json({
        success: false,
        message: "Title, slug and text are required.",
      });

      return;
    }

    const queryResult = await createNewsItem(title, slug, text);

    if (queryResult.affectedRows === 1) {
      res.status(201).json({
        success: true,
        message: "News item added.",
      });

      return;
    }

    res.status(500).json({
      success: false,
      message: "News item was not added.",
    });
  } catch (error) {
    next(error);
  }
};

const editNewsItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const title = req.body.title?.trim();
    const slug = req.body.slug?.trim();
    const text = req.body.text?.trim();

    if (!title || !slug || !text) {
      res.status(400).json({
        success: false,
        message: "Title, slug and text are required.",
      });

      return;
    }

    const queryResult = await updateNewsItem(
      req.params.id,
      title,
      slug,
      text
    );

    if (queryResult.affectedRows === 0) {
      res.status(404).json({
        success: false,
        message: "News item not found.",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "News item updated.",
    });
  } catch (error) {
    next(error);
  }
};

const removeNewsItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const queryResult = await deleteNewsItem(req.params.id);

    if (queryResult.affectedRows === 0) {
      res.status(404).json({
        success: false,
        message: "News item not found.",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "News item deleted.",
    });
  } catch (error) {
    next(error);
  }
};

router.get("/", getAllNews);
router.get("/:id", getOneNewsItem);
router.post("/", addNewsItem);
router.put("/:id", editNewsItem);
router.delete("/:id", removeNewsItem);


export default router;
