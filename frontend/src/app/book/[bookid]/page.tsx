import React from "react";
import Image from "next/image";
import { Book } from "@/Types/Index";
import Download from "./component/Download";

const Singlebook = async ({ params }: { params: { bookid: string } }) => {
  let resbook: Book | null = null;
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/${params.bookid}`
    );
    if (!response.ok) {
      throw new Error("An error occurred while fetching the data");
    }
    resbook = await response.json();
    console.log("resbook:", resbook);
  } catch (error) {
    throw new Error("An error occurred while fetching the data");
  }
  if (!resbook) {
    throw new Error("book not found");
  }
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-3 gap-10 px-5 py-10">
      <div className="col-span-2 pr-16 text-primary-950">
        <h2 className="mb-5 text-5xl font-bold leading-[1.1]">
          {resbook.book.title}
        </h2>
        <span className="font-semibold">
          Publisher:-{resbook.book.Publisher}
        </span>
        <p className="mt-5 text-lg leading-8">{resbook.book.description}</p>
        <Download pdflink={resbook.book.file} />
      </div>
      <div className="flex justify-end">
        <Image
          src={resbook.book.coverImage}
          alt="book image"
          className="rounded-md border"
          height={0}
          width={0}
          sizes="100vw"
          style={{ width: "auto", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default Singlebook;
