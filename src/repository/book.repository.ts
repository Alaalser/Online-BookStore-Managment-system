import { Op } from "sequelize";
import Book from "../models/book.model";

const findBookById = async (id: number): Promise<Book | null> => {
  const book = await Book.findByPk(id);
  return book;
};

const findAllBooks = async (): Promise<Book[] | null> => {
  const books = await Book.findAll();
  return books;
};

const createBook = async (
  title: string,
  author: string,
  price: string,
  genre: string
): Promise<Book | null> => {
  const book = await Book.create({ title, author, price, genre });
  return book;
};

const updateBook = async (
  id: number,
  title: string,
  author: string,
  genre: string,
  price: string
): Promise<Book | any> => {
  const book = await Book.update(
    { title, author, price, genre },
    { where: { id } }
  );

  return book;
};

const deleteBook = async (id: number): Promise<Book | any> => {
  const book = await Book.destroy({
    where: {
      id,
    },
  });
  return book;
};

const searchBooks = async (search: string) => {
  const searchQuery = `%${search}%`;

  return await Book.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: searchQuery } },
        { author: { [Op.like]: searchQuery } },
        { genre: { [Op.like]: searchQuery } },
      ],
    },
  });
};

interface FilterOptions {
  title?: string;
  author?: string;
  genre?: string;
  minPrice?: number;
  maxPrice?: number;
}

const filterBooks = async (options: FilterOptions) => {
  const { title, author, genre, minPrice, maxPrice } = options;
  const where: any = {};

  if (title) {
    where.title = { [Op.like]: `%${title}%` };
  }
  if (author) {
    where.author = { [Op.like]: `%${author}%` };
  }
  if (genre) {
    where.genre = { [Op.like]: `%${genre}%` };
  }
  if (minPrice) {
    where.price = { ...where.price, [Op.gte]: minPrice };
  }
  if (maxPrice) {
    where.price = { ...where.price, [Op.lte]: maxPrice };
  }

  return await Book.findAll({ where });
};

export default {
  findAllBooks,
  findBookById,
  createBook,
  deleteBook,
  updateBook,
  searchBooks,
  filterBooks,
};
