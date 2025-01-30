import admin from "../config/firebase.js";
import User from "../model/user.model.js";

export const signup = async (_, { data }, context) => {
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
  } catch (e) {
    console.log(e.message);
  }
};

export const login = async (parent, args, context) => {
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
  } catch (e) {
    console.log(e.message);
  }
};

export const getUser = async (_, __, context) => {
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
    const { uid, email } = decodedToken;

    const user = await User.findOne({ uid });
    if (!user) {
      return {
        success: false,
        message: "User doesn't exists",
      };
    }

    return {
      success: true,
      data: user,
    };
  } catch (e) {
    console.log(e.message);
  }
};
