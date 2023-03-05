import { prisma } from "../prisma/prisma.client.js";
import cookieToken from "../helpers/tokens/cookie.token.js";

/*----- SignUp -----*/
export const signUp = async (req, res, next) => {
  console.log(req.body);
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error("please provide all field");
    }

    const user = await prisma.user.create({
      data: { name, email, password },
    });

    //* send user a token
    cookieToken(user, res);
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
};

/*----- LogIn -----*/
const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("please provide email and password");
    }

    //* check user
    const user = prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    //! check password
    if (user.password !== password) {
      throw new Error("please provide correct password");
    }

    //* user present
    cookieToken(user, res);
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
};
