import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const generateAccesToken = (payload: JwtPayload) => {
  return jwt.sign(payload, process.env.ACCESS_SECRET!, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES!,
  } as SignOptions);
};

export const generateRefreshToken = (payload: JwtPayload) => {
  return jwt.sign(payload, process.env.REFRESH_SECRET!, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES!,
  } as SignOptions);
};
