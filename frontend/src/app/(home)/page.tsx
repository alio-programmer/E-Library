import Banner from "./components/Banner";
import Image from "next/image";
import BookList from "./components/BookList";

export default async function Home() {
  const response = await fetch(`${process.env.BACKEND_URL}/api`);
  if (!response.ok) {
    throw new Error("An error occurred while fetching the data");
  }
  const resbooks = await response.json();
  return (
    <>
      <Banner />
      <BookList books={resbooks.books} />
    </>
  );
}
