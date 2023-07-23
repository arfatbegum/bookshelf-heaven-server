import { Model, ObjectId } from "mongoose";
import { IUser } from "../auth/auth.interface";

export type IBook = {
  title: string;
  author: string;
  image: string;
  genre: string;
  publicationDate: string;
  authorEmail: string;
  reviews?: object[];
};

export type IReview = {
  review: string;
  reviewer: { name: string } | null;
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export const bookSearchableFields = ["title", "author", "genre", "description"];

export type IBookFilter = {
  searchTerm?: string;
  genre?: string;
  publicationDate?: number;
};
