import { StatusCodes } from "http-status-codes";
import { bookRepository } from "../repository";
import { ApiError } from "../utils/ApiError";

const getAllBooks = async () => {
  const allBooks = await bookRepository.findAllBooks();
  return allBooks;
};

const getSingleBook = async (id: number) => {
  const book = await bookRepository.findBookById(id);

  if (!book) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Book dose not exist");
  }

  return book;
};

const createBook = async (
  title: string,
  author: string,
  genre: string,
  price: string
) => {
  const book = await bookRepository.createBook(title, author, price, genre);
  return book;
};

const updateBook = async (
  id: number,
  title: string,
  author: string,
  genre: string,
  price: string
) => {
  const bookExisted = await bookRepository.findBookById(id);
  if (!bookExisted) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Book dose not existed");
  }

  const updatedBook = await bookRepository.updateBook(
    id,
    title,
    author,
    genre,
    price
  );

  return updatedBook;
};

const deleteBook = async (id: number) => {
  const bookExisted = await bookRepository.findBookById(id);
  if (!bookExisted) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Book dose not existed");
  }

  const book = await bookRepository.deleteBook(id);
  return book;
};

export default {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
};
