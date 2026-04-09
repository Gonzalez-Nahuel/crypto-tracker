import { PrivateUser, PublicUser } from "@/interfaces";

export const toPublicUser = (user: PrivateUser): PublicUser => {
  return {
    sub: user.id,
    email: user.email,
    username: user.username,
  };
};
