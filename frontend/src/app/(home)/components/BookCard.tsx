import { Book } from "@/Types/Index";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const BookCard = ({ book }: { book: Book }) => {
  return (
    <div className=" flex gap-5 border p-5 shadow-lg rounded-lg">
      <Image
        src={book.coverImage}
        alt={book.title}
        width={0}
        height={0}
        sizes="100%"
        style={{ width: "auto", height: "12rem" }}
      />
      <div>
        <h2 className=" line-clamp-2 text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 inline-block text-transparent bg-clip-text text-balance">
          {book.title}
        </h2>
        <p className=" font-bold text-primary-900 ">{book.Publisher}</p>
        <Link
          href={`/book/${book._id}`}
          className=" border-orange-500 border py-1 px-2 text-orange-500 hover:scale-105 rounded-md mt-4 inline-block hover:bg-primary-100 hover:border-primary-100 transition"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
