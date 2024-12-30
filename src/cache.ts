type ListNode<K, V> = {
  pre: ListNode<K, V> | null;
  next: ListNode<K, V> | null;
  val: V;
  key: K;
};

export class LRUCache<K, V> {
  private map: Map<K, ListNode<K, V>> = new Map();
  private tail: ListNode<K, V> | null = null;
  private head: ListNode<K, V> | null = null;
  private count = 0;

  constructor(readonly capacity: number) {}

  get(key: K): V | null {
    if (this.map.has(key)) {
      const node = this.map.get(key)!;
      this.remove(node);
      this.toTail(node);
      return node.val;
    }
    return null;
  }

  delete(key: K): void {
    if (this.map.has(key)) {
      const node = this.map.get(key)!;
      this.map.delete(node.key);
      this.remove(node);
      this.count -= 1;
    }
  }

  put(key: K, val: V): void {
    if (!this.map.has(key)) {
      const new_node = this.createNode(key, val);
      this.count += 1;
      this.toTail(new_node);
      this.map.set(key, new_node);
      if (this.count > this.capacity) {
        this.map.delete(this.head!.key);
        this.remove(this.head!);
        this.count -= 1;
      }
    } else {
      // update cache
      const node = this.map.get(key);
      node!.val = val;
      this.remove(node!);
      this.toTail(node!);
    }
  }

  private createNode(key: K, val: V) {
    return {
      pre: null,
      next: null,
      val,
      key,
    };
  }

  private remove(node: ListNode<K, V>) {
    if (node.pre) {
      node.pre.next = node.next;
      if (!node.next) {
        this.tail = node.pre;
      }
    } else {
      this.head = node.pre;
    }
    if (node.next) {
      node.next.pre = node.pre;
      if (!node.pre) {
        this.head = node.next;
      }
    } else {
      this.tail = node.pre;
    }
    node.pre = null;
    node.next = null;
  }

  private toTail(node: ListNode<K, V>) {
    if (this.tail) {
      node.next = null;
      node.pre = this.tail;
      this.tail.next = node;
      this.tail = node;
    } else {
      this.head = node;
      this.tail = node;
      this.tail.next = null;
    }
  }
}
