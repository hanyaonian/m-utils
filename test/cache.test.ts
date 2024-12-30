import { LRUCache } from "../src/cache";

describe("testing LRU: ", () => {
  test("LRU basic", () => {
    const cache = new LRUCache<number, number>(2);
    cache.put(1, 1);
    cache.put(2, 2);
    expect(cache.get(1)).toBe(1); // [2, 1]

    cache.put(3, 3);
    expect(cache.get(2)).toBe(null); // [1, 3]
    expect(cache.get(3)).toBe(3);

    cache.delete(3);
    expect(cache.get(3)).toBe(null); // [1]
    expect(cache.get(1)).toBe(1); // [1]

    cache.put(4, 4);
    expect(cache.get(4)).toBe(4); // [1]
  });
});
