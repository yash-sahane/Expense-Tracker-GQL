import { NextFunction } from "express";
import { Response } from "express";
import { Request } from "express";
import ErrorHandler from "../middlewares/error.js";
import admin from "../config/firebase.js";
import User from "../model/user.model.js";

export const createUser = async (
  parent: any,
  data: { email: String; fullName: String; avatar: String },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return next(new ErrorHandler(401, "Token not provided"));
    }

    const decodedToken = await admin
      .auth()
      .verifyIdToken(token.replace("Bearer", ""));

    const user = await User.findOne({ email: data.email });
    if (user) {
      return next(new ErrorHandler(404, "User already exists"));
    }

    const newUser = new User({
      uid: decodedToken.uid,
      email: data.email,
      fullName: data.fullName,
      avatar: data.avatar,
    });
    await newUser.save();

    return res.json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (e: any) {
    console.log(e.message);
  }
};
