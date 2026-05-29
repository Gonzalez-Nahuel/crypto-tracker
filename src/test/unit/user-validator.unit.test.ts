import bcrypt from "bcryptjs";
import { CredentialsValidator } from "../../lib/auth/credentials-validator";
import { it, expect, describe } from "vitest";
import { AuthError } from "../../lib/auth/auth-error";

const password = "lkasjld5ada654";

const hashedPassword = await bcrypt.hash(password, 10);

const user = {
  id: 4,
  email: "askdla.com",
  username: "laksdlakj",
  password: hashedPassword,
};

describe("CredentialsValidator", () => {
  it("should reject with AuthError", async () => {
    await expect(
      CredentialsValidator.validateUser(null, "lkawihduha"),
    ).rejects.toBeInstanceOf(AuthError);
  });

  it("should accept valid user", async () => {
    await expect(
      CredentialsValidator.validateUser(user, password),
    ).resolves.toBeUndefined();
  });

  it("should reject invalid password with AuthError", async () => {
    await expect(
      CredentialsValidator.validateUser(user, "adwwadveffasdaw"),
    ).rejects.toBeInstanceOf(AuthError);
  });
});
