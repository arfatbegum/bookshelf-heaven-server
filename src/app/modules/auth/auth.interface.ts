import { Model, ObjectId } from "mongoose";

export type IUser = {
  _id: ObjectId;
  password: string;
  email: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type IVerifiedLoginUser = {
  userId: string;
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
