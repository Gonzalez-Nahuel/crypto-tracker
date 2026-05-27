import { CredentialsValidator } from "../../lib/auth/credentials-validator";
import { expect, describe, it } from "vitest";

describe("CredentialsValidator", () => {
  it("should reject invalid username", () => {
    expect(() => CredentialsValidator.validateUsername("Ña")).toThrow();
  });

  it("should accept valid username", () => {
    expect(() =>
      CredentialsValidator.validateUsername("pepito94"),
    ).not.toThrow();
  });

  it("should reject invalid password", () => {
    expect(() => CredentialsValidator.validatePassword("Wplsd12")).toThrow();
  });

  it("should accept valid password", () => {
    expect(() =>
      CredentialsValidator.validatePassword("Wplkñsd12@"),
    ).not.toThrow();
  });
});
