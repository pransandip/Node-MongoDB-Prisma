import jwt from "jsonwebtoken";
import { JWT } from "../configs/configs.js";
import { prisma } from "../prisma/prisma.client.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.send("you have to login first");
      throw new Error("You are not logged In");
    }

    const decoded = jwt.verify(token, JWT.jwtSec);

    req.user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });
    next();
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
};
