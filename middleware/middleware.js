import jwt from "jsonwebtoken";
import { prisma } from "../prisma/prisma.client";

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookie.token;

    if (!token) {
      res.send("you have to login first");
      throw new Error("You are not logged In");
    }
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
};
