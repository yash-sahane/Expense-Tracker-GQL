import { NextFunction } from "express";
import { Response } from "express";
import { Request } from "express";
import admin from "../config/firebase.js";
import User from "../model/user.model.js";

export const signup = async (
  parent: any,
  { data }: { data: { email: string; fullName: string } },
  context: { req: Request }
) => {
  try {
    const { req } = context;
    const token = req.headers.authorization;

    if (!token) {
      return {
        success: false,
        message: "Token not provided",
      };
    }

    const decodedToken = await admin
      .auth()
      .verifyIdToken(token.replace("Bearer ", ""));

    const user = await User.findOne({ email: data.email });
    if (user) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    const newUser = new User({
      uid: decodedToken.uid,
      email: data.email,
      fullName: data.fullName,
    });
    await newUser.save();

    return {
      success: true,
      message: "User created successfully",
      data: newUser,
    };
  } catch (e: any) {
    console.log(e.message);
  }
};

export const login = async (
  parent: any,
  args: { data: { email: String } },
  context: { req: Request }
) => {
  try {
    const { req } = context;
    const token = req.headers.authorization;

    if (!token) {
      return {
        success: false,
        message: "Token not provided",
      };
    }

    const decodedToken = await admin
      .auth()
      .verifyIdToken(token.replace("Bearer ", ""));

    const { uid } = decodedToken;

    const user = await User.findOne({ uid });

    if (!user) {
      return {
        success: false,
        message: "User does not exists",
      };
    }

    return {
      success: true,
      message: "User loggedin successfully",
      data: user,
    };
  } catch (e: any) {
    console.log(e.message);
  }
};
