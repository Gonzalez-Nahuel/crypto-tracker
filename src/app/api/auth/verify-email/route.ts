import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const token = searchParams.get("token");

  if (!token) {
    console.error("Missing Token");
    redirect("/verified/error");
  }

  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!verificationToken) {
    console.error("Missing verificationToken");
    redirect("/verified/error");
  }

  if (verificationToken.expiredAt < new Date()) {
    console.error("Token expired");
    redirect("/verified/error");
  }

  await prisma.user.update({
    where: { id: verificationToken.userId },
    data: { emailVerifyed: true },
  });

  await prisma.verificationToken.delete({
    where: { id: verificationToken.id },
  });

  redirect("/verified/success");
}
