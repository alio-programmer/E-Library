import React from "react";
import BookCard from "./BookCard";
import { Book } from "@/Types/Index";

const BookList = ({ books }: { books: Book[] }) => {
  return (
    <div className=" grid grid-cols-1 gap-8 md:grid-cols-3 max-w-7xl mx-auto">
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
