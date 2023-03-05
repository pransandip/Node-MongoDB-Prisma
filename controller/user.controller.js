import { prisma } from "../prisma/prisma.client.js";
import cookieToken from "../helpers/tokens/cookie.token.js";

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error("please provide all field");
    }

    const user = await prisma.user.create({
      data: { name, email, password },
    });

    // send user a token
    cookieToken(user, res);
  } catch (err) {
    throw new Error(err.message);
  }
};
