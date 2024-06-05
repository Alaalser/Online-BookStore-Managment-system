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

const deleteBook = async (id: string): Promise<Book | any> => {
  const book = await Book.destroy(id as any);
  return book;
};

export default {
  findAllBooks,
  findBookById,
  createBook,
  deleteBook,
  updateBook,
};
