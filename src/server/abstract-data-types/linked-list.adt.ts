
export interface Node<T> {
  data: T;
  next: Node<T> | null;
}

export class LinkedList<T> {
  public head: Node<T> | null = null;

  public get size(): number {
    let size = 0;
    let currentNode: Node<T> | null = this.head;

    while(currentNode !== null){
      currentNode = currentNode.next;
      size++;
    }

    return size;
  }

  public end(): Node<T> | null {
    let currentNode: Node<T> | null = this.head;

    if(currentNode === null){
      return null;
    }

    while(currentNode.next !== null){
      currentNode = currentNode.next;
    }

    return currentNode;
  }

  public append(data: T): void {
    const node: Node<T> = {
      next: null,
      data,
    };

    const finalNode = this.end();
    if(finalNode === null){
      this.head = node;
      return;
    }
    
    finalNode.next = node;
    return;
  }

  public prepend(data: T): void {
    const node: Node<T> = {
      next: null,
      data,
    }

    if(this.head === null){
      this.head = node;
      return;
    }

    node.next = this.head;
    this.head = node;
  }
}