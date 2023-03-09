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
export const logIn = async (req, res, next) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("please provide email and password");
    }

    //* check user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    //* user not present
    if (!user) {
      throw new Error("User not found");
    }

    //! check password
    if (user.password !== password) {
      throw new Error("please provide correct password");
    }

    //* user present
    await cookieToken(user, res);
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
};

/*----- LogOut -----*/
export const LogOut = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
};
