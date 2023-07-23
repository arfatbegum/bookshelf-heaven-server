import { Model, ObjectId } from "mongoose";

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type IUser = {
  _id: ObjectId;
  password: string;
  email: string;
  wishlist: string[];
  readingList: string[];
  finishedReading: string[];
};

export type UserModel = Model<IUser> & {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, "_id" | "email" | "password"> | null>;
  isUserExistById(email: string): Promise<Pick<IUser, "_id" | "email"> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};
