import { describe, expect, it } from "vitest";
import { formatNumberAbbreviated } from "../format-number-abbreviated";

describe("formatNumberAbbreviated", () => {
  it("should format thousands correctly", () => {
    expect(formatNumberAbbreviated(1000)).toBe("$1.00K");
  });

  it("should format millions correctly", () => {
    expect(formatNumberAbbreviated(1500000)).toBe("$1.50M");
  });

  it("should format billions correctly", () => {
    expect(formatNumberAbbreviated(1500000000)).toBe("$1.50B");
  });

  it("should format trillions correctly", () => {
    expect(formatNumberAbbreviated(1000000000000)).toBe("$1.00T");
  });

  it("should return false for NaN", () => {
    expect(formatNumberAbbreviated(NaN)).toBe(false);
  });

  it("should return a non-abbrevaited number", () => {
    expect(formatNumberAbbreviated(999)).toBe("$999");
  });
});
