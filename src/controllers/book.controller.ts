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

export default {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
};
