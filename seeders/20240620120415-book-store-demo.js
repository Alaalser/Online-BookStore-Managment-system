"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("books", null, {});
    const booksId = await queryInterface.bulkInsert("books", [
      {
        title: "Book 1",
        author: "Author 1",
        genre: "Fantasy",
        price: 25.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Book 2",
        author: "Author 2",
        genre: "Science Fiction",
        price: 18.75,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Book 3",
        author: "Author 3",
        genre: "Romance",
        price: 30.50,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Book 4",
        author: "Author 4",
        genre: "Mystery",
        price: 12.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Book 5",
        author: "Author 5",
        genre: "Thriller",
        price: 22.00,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Book 6",
        author: "Author 6",
        genre: "Horror",
        price: 15.49,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Book 7",
        author: "Author 7",
        genre: "Non-fiction",
        price: 38.25,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Book 8",
        author: "Author 8",
        genre: "Fantasy",
        price: 19.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Book 9",
        author: "Author 9",
        genre: "Science Fiction",
        price: 28.50,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Book 10",
        author: "Author 10",
        genre: "Science Fiction",
        price: 28.50,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("books", null, {});
  },
};