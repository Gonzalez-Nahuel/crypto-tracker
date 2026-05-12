import { prisma } from "../db/prisma";
import crypto from "crypto";
import { sendVerificationEmail } from "../mail/send-verification-email";

type Props = {
  id: number;
  email: string;
  token?: string;
};

export const createVericaficationToken = async ({
  id,
  email,
  token,
}: Props) => {
  if (token) {
    await prisma.verificationToken.delete({ where: { token } });
  }

  const verificationToken = crypto.randomBytes(32).toString("hex");

  await prisma.verificationToken.create({
    data: {
      token: verificationToken,
      userId: id,
      expiredAt: new Date(Date.now() + 1000),
    },
  });

  await sendVerificationEmail({
    email,
    token: verificationToken,
  });
};
