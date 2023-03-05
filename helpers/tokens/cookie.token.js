import getJwtToken from "./jwt.token.js";
import { COOKIE_EXP } from "../constant/constants.js";

const cookieToken = async (user, res) => {
  const token = await getJwtToken(user.id);
  const options = {
    expires: COOKIE_EXP,
    httpOnly: true,
  };
  delete user["password"];
  await res.status(200).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

export default cookieToken;
