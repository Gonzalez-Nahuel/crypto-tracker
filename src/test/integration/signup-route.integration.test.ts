import { prisma } from "@/lib/db/prisma";
import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/auth/create-verification-token", () => ({
  createVericaficationToken: vi.fn(),
}));

describe("POST /api/auth/signup", () => {
  it("should create a user", async () => {
    const res = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        username: "test",
        email: "test@test.com",
        password: "Wdfeaaf12#",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data.ok).toBe(true);

    const user = await prisma.user.findUnique({
      where: {
        email: "test@test.com",
      },
    });

    expect(user).not.toBeNull();

    await prisma.user.delete({ where: { email: "test@test.com" } });
  });

  it("should return status 400, missing credentials", async () => {
    const res = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        username: "test",
        email: "test@test.com",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.message).toBe("Missing credentials");
  });

  it("should return status: 500, ok: false", async () => {
    const res = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        username: "test",
        email: "testtest.com",
        password: "Wlñlams154%",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    expect(res.status).toBe(422);
    expect(data.message).toBe("Correo electronico inválido");
  });
});
