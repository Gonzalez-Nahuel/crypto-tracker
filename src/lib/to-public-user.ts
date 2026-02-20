import { PrivateUser, PublicUser } from "@/interfaces";

export const toPublicUser = (user: PrivateUser): PublicUser => {
  return {
    email: user.email,
    username: user.username,
  };
};
