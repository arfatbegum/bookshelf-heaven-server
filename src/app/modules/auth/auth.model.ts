import mongoose, { Schema, model } from "mongoose";
import config from "../../../config";
import bcrypt from "bcrypt";
import { IUser, UserModel } from "./auth.interface";

const UserSchema = new Schema<IUser>(
  {
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.statics.isUserExist = async function (
  email: string
): Promise<IUser | null> {
  return await User.findOne({ email }, { email: 1, password: 1 });
};

UserSchema.statics.isUserExistById = async function (
  userId: string
): Promise<IUser | null> {
  return await User.findOne({ userId }, { email: 1, password: 1 });
};
UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

UserSchema.pre("save", async function (next) {
  // hashing user password
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const User = model<IUser, UserModel>("User", UserSchema);