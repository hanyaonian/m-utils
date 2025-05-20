import { isTypeStructureEqual } from "../src/object";

describe("testing isTypeStructureEqual: ", () => {
  test("basic", () => {
    expect(isTypeStructureEqual(1, 2)).toBe(true);

    expect(isTypeStructureEqual(1, "1")).toBe(false);

    expect(
      isTypeStructureEqual(
        {
          a: "b",
        },
        {
          a: "a",
        }
      )
    ).toBe(true);

    expect(
      isTypeStructureEqual(
        {
          arr: [1, 2, 3],
        },
        {
          arr: [1, 2, "3"],
        }
      )
    ).toBe(false);
  });
});
