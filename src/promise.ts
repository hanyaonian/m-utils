/**
 * @description make sure a same promise wont run twice,
 * it would be useful in case like initializing with asynchronous task
 */
export function promiseWrap<T extends (...args: any) => ReturnType<T>>(
  func: T
) {
  let _promise_: null | ReturnType<T> = null;
  return (...args: Parameters<T>) => {
    if (!_promise_) {
      _promise_ = func(...args);
      // bluebird ?
      if (_promise_ instanceof Promise) {
        _promise_.finally(() => {
          _promise_ = null;
        });
      }
    }
    return _promise_;
  };
}
