import { Request, Response } from "express";
import { bookService } from "../services";
import { StatusCodes } from "http-status-codes";

const getAllBooks = async (_req: Request, res: Response) => {
  try {
    const allBooks = await bookService.getAllBooks();
    return res.status(StatusCodes.ACCEPTED).send(allBooks);
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message, status: error.statusCode });
  }
};

const getSingleBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await bookService.getSingleBook(parseInt(id));
    return res.status(StatusCodes.ACCEPTED).send(book);
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message, status: error.statusCode });
  }
};

const createBook = async (req: Request, res: Response) => {
  const { title, author, price, genre } = req.body;
  try {
    const book = await bookService.createBook(title, author, price, genre);
    return res.status(StatusCodes.CREATED).send(book);
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message, status: error.statusCode });
  }
};

const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, price, genre } = req.body;

  try {
    await bookService.updateBook(parseInt(id), title, author, genre, price);

    const book = await bookService.getSingleBook(parseInt(id));

    return res.status(StatusCodes.ACCEPTED).send(book);
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message, status: error.statusCode });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await bookService.getSingleBook(parseInt(id));

    await bookService.deleteBook(parseInt(id));
    return res.status(StatusCodes.ACCEPTED).send(book);
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message, status: error.statusCode });
  }
};

const searchBooks = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    if (!q || typeof q !== "string") {
      return res.status(400).json({ error: "Invalid search query" });
    }

    const books = await bookService.searchBooks(q);
    return res.status(StatusCodes.ACCEPTED).json({ books });
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message, status: error.statusCode });
  }
};

const filterBooks = async (req: Request, res: Response) => {
  try {
    const { title, author, genre, minPrice, maxPrice } = req.query;

    const options = {
      title: title as string,
      author: author as string,
      genre: genre as string,
      minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
    };

    const books = await bookService.filterBooks(options);
    return res.status(StatusCodes.ACCEPTED).json({ books });
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message, status: error.statusCode });
  }
};

export default {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
  searchBooks,
  filterBooks,
};
