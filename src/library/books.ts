import { shelves } from "../data/library";

/** Volume numbers run across every book in the library. */
export const allBooks = shelves.flatMap((shelf) => shelf.books);
export const volumeOf = (bookId: string) => allBooks.findIndex((book) => book.id === bookId) + 1;
export const chapterOf = (bookId: string) =>
  shelves.find((shelf) => shelf.books.some((book) => book.id === bookId))?.title ?? "";
