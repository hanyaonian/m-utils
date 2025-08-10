import { DoublyLinkedList } from "./base/linked-list";

export class LRUCache<K, V> {
  private map: Map<K, V> = new Map();
  private list = new DoublyLinkedList<K>();

  constructor(readonly capacity: number) {}

  get(key: K): V | null {
    if (this.map.has(key)) {
      const node = this.map.get(key)!;
      this.list.remove(key);
      this.list.append(key);
      return node;
    }
    return null;
  }

  delete(key: K): void {
    if (this.map.has(key)) {
      this.map.delete(key);
      this.list.remove(key);
    }
  }

  put(key: K, val: V): void {
    if (!this.map.has(key)) {
      this.list.append(key);
      this.map.set(key, val);
      if (this.list.size > this.capacity) {
        const head = this.list.get(0);
        this.map.delete(head!);
        this.list.remove(head!);
      }
    } else {
      // update cache
      this.map.set(key, val);
      this.list.remove(key!);
      this.list.append(key!);
    }
  }
}
