import * as dotenv from "dotenv";
dotenv.config();

export const JWT = {
  jwtSec: process.env.JWT_SECRET || "12345-55555-09876-54321",
  jwtExp: "1d",
};
