import { promiseWrap } from "../src/promise";

describe("testing promise throttle function: ", () => {
  const createAsyncSelfIncrease = () => {
    let num = 0;
    return async () => num++;
  };

  test("expect promise run only once", async () => {
    const selfIncrease = createAsyncSelfIncrease();
    const wrapSelfIncrease = promiseWrap(createAsyncSelfIncrease());
    const simultaneous_excutions = new Array(10).fill(0).map(() => {
      return Promise.all([selfIncrease(), wrapSelfIncrease()]);
    });

    await Promise.all(simultaneous_excutions);
    expect(await selfIncrease()).toBe(10);
    expect(await wrapSelfIncrease()).toBe(1);
  });

  test("expect to run asynchronously", async () => {
    const wrapSelfIncrease = promiseWrap(createAsyncSelfIncrease());
    for (let i = 0; i < 10; i++) {
      await wrapSelfIncrease();
    }
    expect(await wrapSelfIncrease()).toBe(10);
  });

  test("expect wrapped return type are same", async () => {
    const func1 = async () => 1;
    const func2 = () => 'a';
    expect(typeof func2()).toEqual(typeof promiseWrap(func2)());
    expect(typeof (await func1())).toEqual(typeof (await promiseWrap(func1)()));
  });
});
