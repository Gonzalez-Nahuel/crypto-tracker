import { prisma } from "@/lib/db/prisma";

export async function GET() {
  const deleted = await prisma.user.delete({
    where: {
      email: "nahuelg976@gmail.com",
    },
  });

  console.log(deleted);
}
