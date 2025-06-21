import express, { Request, Response } from "express";
import { Book } from "./bookModel";

export const booksRouter = express.Router();

booksRouter.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const book = await Book.create(body);
    res.status(200).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        success: false,
        error: error,
      });
    }
    return res.status(500).json({
      message: "Failed to create book",
      success: false,
      error: error.message || error,
    });
  }
});
booksRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { filter, sortBy, sort, limit } = req.query;
    const query: any = {};
    if (filter) {
      query.genre = filter;
    }
    const sortField = sortBy || "createdAt";
    const sortOrder = sort === "asc" ? 1 : -1;
    const resultLimit = parseInt(limit as string) || 10;

    const books = await Book.find(query)
      .sort({ [sortField as string]: sortOrder })
      .limit(resultLimit);

    res.status(200).json({
      success: true,
      message: "Books retreived successfully",
      data: books,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve books",
    });
  }
});
booksRouter.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const books = await Book.findById(bookId);
    res.status(200).json({
      success: true,
      message: "Book retreived successfully",
      data: books,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve book",
    });
  }
});
booksRouter.put("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const updateData = req.body;
    const books = await Book.findByIdAndUpdate(bookId, updateData, {
      new: true,
      runValidators: true
    });
    if (!books) {
      return res.status(400).json({
        success: false,
        message: "Book not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: books,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update book",
      error: error.message || error,
    });
  }
});
booksRouter.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const books = await Book.findByIdAndDelete(bookId);
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: books,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to deleted book",
    });
  }
});
