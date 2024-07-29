export type Book = {
  _id: string;
  title: string;
  Author: Author;
  Publisher: string;
  description: string;
  coverImage: string;
  file: string;
  genre: string;
};

export type Author = {
  name: string;
};
