import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export class GenerateTokens {
  static generateAccesToken(payload: JwtPayload | string) {
    return jwt.sign(payload!, process.env.ACCESS_SECRET!, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES!,
    } as SignOptions);
  }
  static generateRefreshToken(payload: JwtPayload | string) {
    return jwt.sign(payload!, process.env.REFRESH_SECRET!, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES!,
    } as SignOptions);
  }
}
