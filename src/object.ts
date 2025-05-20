/**
 * 检查两个对象键值类型一致性
 * 支持嵌套对象、数组、日期等复杂类型判断
 *
 * 可以判断数据结构有无更新
 */
export function isTypeStructureEqual(objA: unknown, objB: unknown): boolean {
  if (objA === null || objB === null) return objA === objB;
  if (typeof objA !== typeof objB) return false;

  if (typeof objA !== "object" || typeof objB !== "object") {
    return typeof objA === typeof objB;
  }

  // 处理数组类型, 假定数组类型一致
  if (Array.isArray(objA) !== Array.isArray(objB)) return false;

  // 获取类型标记（处理特殊对象类型）
  const getTypeTag = (obj: object) => {
    if (obj instanceof Date) return "Date";
    if (obj instanceof RegExp) return "RegExp";
    return Object.prototype.toString.call(obj).slice(8, -1);
  };
  if (getTypeTag(objA) !== getTypeTag(objB)) return false;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  return keysA.every((key) => {
    if (!(key in (objB as object))) return false;
    return isTypeStructureEqual(
      (objA as Record<string, unknown>)[key],
      (objB as Record<string, unknown>)[key]
    );
  });
}
