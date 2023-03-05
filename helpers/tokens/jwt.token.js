import jwt from "jsonwebtoken";
import { JWT } from "../../configs/configs.js";

const getJwtToken = async (userId) => {
  return jwt.sign({ userId: userId }, JWT.jwtSec, {
    expiresIn: JWT.jwtExp,
  });
};

export default getJwtToken;
